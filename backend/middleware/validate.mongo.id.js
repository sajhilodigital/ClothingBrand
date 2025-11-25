// backend/middlewares/validateMongoId.js
import mongoose from "mongoose";

export const validateMongoIdFromReqParams = (req, res, next) => {
  const id = req.params.id;

  // Check if id is a valid MongoDB ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID." });
  }

  next();
};
