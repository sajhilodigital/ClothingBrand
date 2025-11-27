// utils/cloudinaryUpload.js
import cloudinary from "../Config/Cloudinary.js";

export const uploadBufferToCloudinary = (
  buffer,
  folder = "clothingbrand/products"
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto", // auto detect image/video
        transformation: [
          { quality: "auto:best" },
          { fetch_format: "auto" },
          { width: 1200, crop: "limit" },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Failed:", error.message);
    throw new Error("Failed to delete from Cloudinary");
  }
};
