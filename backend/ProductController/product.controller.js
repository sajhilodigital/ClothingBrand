// controllers/productController.js
import {
  deleteFromCloudinary,
  uploadBufferToCloudinary,
} from "../utils/cloudinaryUpload.js";

import { ProductTable } from "./product.model.js";
import { productSchema, updateProductSchema } from "./product.validation.js";

//CREATE PRODUCT

export const generateSlug = async (name) => {
  let base = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");

  let slug = base;
  let counter = 1;

  while (await ProductTable.findOne({ slug })) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
};

// export const createProduct = async (req, res) => {
//     try {
//       const newProduct = req.body;

//       await ProductTable.create({ ...newProduct});

//       res.status(201).json({
//         message: "Product is added successfully.",
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         message: "Failed to create product",
//         error: error.message,
//       });
//     }
  
// };

export const createProduct = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Missing 'data' field" });

    // Parse JSON
    let productData = req.body;

    // Trim strings to avoid false mismatches
    const nameTrimmed = productData.name?.trim();
    const descriptionTrimmed = productData.description
      ? productData.description.trim()
      : "";

    // Auto-generate slug if not provided
    if (!productData.slug) {
      productData.slug = await generateSlug(nameTrimmed);
    }

    // 1️⃣ Check if a product already exists with same details
    const existingProduct = await ProductTable.findOne({
      name: nameTrimmed,
      category: productData.category,
      price: productData.price,
      description: descriptionTrimmed,
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message:
          "Product already exists with the same name, category, price, description",
      });
    }

    console.log(productData);

    // Auto slug
    productData.slug = await generateSlug(productData.name);

    // Validate data
    await productSchema.validate(productData, { abortEarly: false });

    const files = req.files || [];

    // Upload images
    const imageFiles = files.filter((f) => f.fieldname === "images");
    const thumbnailFile = files.find((f) => f.fieldname === "thumbnail");

    if (imageFiles.length) {
      const uploadedImages = await Promise.all(
        imageFiles.map((f) => uploadBufferToCloudinary(f.buffer, "products"))
      );
      productData.images = uploadedImages.map((i) => i.secure_url);
    }

    if (thumbnailFile) {
      const thumb = await uploadBufferToCloudinary(
        thumbnailFile.buffer,
        "products"
      );
      productData.thumbnail = thumb.secure_url;
    }

    // Save to DB
    const product = await ProductTable.create({
      ...productData,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
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

    await ProductTable.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted permanently" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug)
      return res.status(400).json({
        success: false,
        message: "Slug is required",
      });

    const product = await ProductTable.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// -------------------- LIST PRODUCTS BY BUYER --------------------

  export const getAllProductByPagination =  async (req, res) => {
  try {
    const { page, limit } = req.body;
    const skip = (page - 1) * limit;

    const products = await ProductTable.aggregate([
      { $match: { isDeleted: false, isActive: true } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          sku: 1,
          type: 1,
          vendor: 1,
          brand: 1,
          description: 1,
          shortDescription: 1,
          careInstructions: 1,
          specifications: 1,
          category: 1,
          collection: 1,
          tags: 1,
          images: 1,
          thumbnail: 1,
          price: 1,
          compareAtPrice: 1,
          discount: 1,
          isTaxIncluded: 1,
          totalStock: 1,
          reservedStock: 1,
          safetyStock: 1,
          variants: 1,
          shippingClass: 1,
          weight: 1,
          height: 1,
          width: 1,
          depth: 1,
          isShippable: 1,
          isActive: 1,
          isFeatured: 1,
          isNewArrival: 1,
          isBestSeller: 1,
          isLimitedStock: 1,
          isHidden: 1,
          metaKeywords: 1,
          searchKeywords: 1,
          totalSales: 1,
          totalViews: 1,
          wishlistedCount: 1,
          conversionRate: 1,
          gallery: 1,
          options: 1,
          createdAt: 1,
          updatedAt: 1,
          // version: 1,
        },
      },
    ]);

    const totalItems = await ProductTable.countDocuments({ isDeleted: false, isActive: true });
    const totalPage = Math.ceil(totalItems / limit);

    return res.status(200).json({ message: "success", productList: products, totalPage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



 export const liveSearchProducts = async (req, res) => {
  try {
    const { search } = req.body;

    if (!search || search.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Search query is required" });
    }

    // Create a regex that matches anywhere in the field, case-insensitive
    const regex = new RegExp(search.trim(), "i");

    const products = await ProductTable.aggregate([
      // Lookup brand details to allow searching by brand name
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brandDetails",
        },
      },
      {
        $unwind: { path: "$brandDetails", preserveNullAndEmptyArrays: true },
      },
      // Match any field with the search regex
      {
        $match: {
          isDeleted: false,
          isActive: true,
          $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
            { shortDescription: { $regex: regex } },
            { "brandDetails.name": { $regex: regex } },
            { "variants.title": { $regex: regex } }, // optional: search variant titles
          ],
        },
      },
      // Project only necessary fields for faster response
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          price: 1,
          thumbnail: 1,
          brand: "$brandDetails.name",
          variants: 1,
        },
      },
      { $limit: 20 }, // Optional: limit results for performance
    ]);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
  };
