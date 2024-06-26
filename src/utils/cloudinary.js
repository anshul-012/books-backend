import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const deleteOnCloudinary = async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
};

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      max_bytes: 2 * 1024 * 1024,
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
