import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for handling file uploads
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  upload.single("image"),
  async (req, res): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "Backend",
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      console.error("Error uploading to Cloudinary", error);
      res.status(500).json({ error: "Error uploading image" });
    }
  }
);

export default router;
