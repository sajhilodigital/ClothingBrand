// controllers/productController.js
import { Collection } from "../CollectionController/collection.model.js";
import {
  deleteFromCloudinary,
  uploadBufferToCloudinary,
} from "../utils/cloudinaryUpload.js";

import { ProductTable } from "./product.model.js";
import { updateProductSchema } from "./product.validation.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
      const sellerId = req.loggedInUserId;
      const newProduct = req.body;

      await ProductTable.create({ ...newProduct, createdBy: sellerId });

      res.status(201).json({
        message: "Product is added successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to create product",
        error: error.message,
      });
    }
  
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await ProductTable.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    let updateData = {};
    if (req.body.data) {
      updateData = JSON.parse(req.body.data);
      await updateProductSchema.validate(updateData, { abortEarly: false });
    }

    let images = product.images;

    // Upload new images
    if (req.files?.length) {
      const uploaded = await Promise.all(
        req.files.map((f) => uploadBufferToCloudinary(f.buffer))
      );
      images = [
        ...images,
        ...uploaded.map((f) => ({
          url: f.secure_url,
          public_id: f.public_id,
          isVideo: f.resource_type === "video",
        })),
      ];
    }

    // Remove images
    if (updateData.removeImageIds?.length) {
      await Promise.all(
        updateData.removeImageIds.map((id) => deleteFromCloudinary(id))
      );
      images = images.filter(
        (img) => !updateData.removeImageIds.includes(img.public_id)
      );
    }

    // Reorder images
    if (updateData.imageOrder?.length) {
      const map = new Map(images.map((img) => [img.public_id, img]));
      images = updateData.imageOrder.map((id) => map.get(id)).filter(Boolean);
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...updateData,
        images,
        thumbnail: images[0]?.url || product.thumbnail,
        slug: updateData.name
          ? updateData.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")
          : product.slug,
        totalStock: updateData.variants
          ? updateData.variants.reduce((s, v) => s + (v.stock || 0), 0)
          : product.totalStock,
      },
      { new: true, runValidators: true }
    )
      .populate("category", "name slug")
      .populate("collection", "name");

    res.json({ success: true, message: "Updated successfully", data: updated });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.inner.map((e) => ({ field: e.path, message: e.message })),
      });
    }
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// DELETE PRODUCT + CLOUDINARY CLEANUP
export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductTable.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Not found" });

    if (product.images.length) {
      await Promise.all(
        product.images.map((img) => deleteFromCloudinary(img.public_id))
      );
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted permanently" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

// GET ALL + SEARCH + FILTER + PAGINATION + FACETS
export const getProducts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 12);
    const skip = (page - 1) * limit;

    const {
      search,
      category,
      collection,
      minPrice,
      maxPrice,
      size,
      color,
      tag,
      sort = "newest",
    } = req.query;

    const filter = { isActive: true };

    if (search?.trim()) {
      const r = { $regex: search.trim(), $options: "i" };
      filter.$or = [{ name: r }, { shortDescription: r }, { tags: r }];
    }
    if (category && category !== "all") filter.category = category;
    if (collection && collection !== "all") filter.collection = collection;
    if (tag && tag !== "all") filter.tags = tag.toUpperCase();
    if (minPrice || maxPrice) {
      filter.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    }
    if (size || color) {
      filter.variants = { $elemMatch: {} };
      if (size) filter.variants.$elemMatch.size = size.toUpperCase();
      if (color)
        filter.variants.$elemMatch.color = { $regex: color, $options: "i" };
    }

    let sortBy = { createdAt: -1 };
    if (sort === "price_low") sortBy = { price: 1 };
    if (sort === "price_high") sortBy = { price: -1 };
    if (sort === "name") sortBy = { name: 1 };

    const [products, total, facets] = await Promise.all([
      Product.find(filter)
        .populate("category", "name slug")
        .populate("collection", "name")
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .lean(),
      ProductTable.countDocuments(filter),
      ProductTable.aggregate([
        { $match: filter },
        {
          $facet: {
            sizes: [
              { $unwind: "$variants" },
              { $group: { _id: "$variants.size", count: { $sum: 1 } } },
            ],
            colors: [
              { $unwind: "$variants" },
              { $group: { _id: "$variants.color", count: { $sum: 1 } } },
            ],
            priceRange: [
              {
                $group: {
                  _id: null,
                  min: { $min: "$price" },
                  max: { $max: "$price" },
                },
              },
            ],
          },
        },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
        },
        filters: {
          sizes: facets[0].sizes.map((s) => s._id).filter(Boolean),
          colors: facets[0].colors.map((c) => c._id).filter(Boolean),
          priceRange: facets[0].priceRange[0] || { min: 0, max: 100000 },
        },
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to load products" });
  }
};

// GET SINGLE PRODUCT
export const getProductBySlug = async (req, res) => {
  try {
    const product = await ProductTable.findOne({
      slug: req.params.slug,
      isActive: true,
    })
      .populate("category", "name slug")
      .populate("collection", "name banner");

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// SPECIAL SECTIONS
export const getSpecialProducts = async (req, res) => {
  const { type } = req.params;
  const limit = parseInt(req.query.limit) || 12;

  const tagMap = { featured: "FEATURED", new: "NEW", bestseller: "BESTSELLER" };
  const tag = tagMap[type];

  if (!tag)
    return res.status(400).json({ success: false, message: "Invalid type" });

  const products = await ProductTable.find({ isActive: true, tags: tag })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  res.json({ success: true, data: products });
};

// COLLECTION PAGE
export const getProductsByCollection = async (req, res) => {
  try {
    const coll = await Collection.findOne({ slug: req.params.slug });
    if (!coll)
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });

    const products = await ProductTable.find({
      collection: coll._id,
      isActive: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: { collection: coll, products } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed" });
  }
};
