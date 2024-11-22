import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define the type for CloudinaryStorage params
interface CloudinaryStorageParams {
  folder: string;
  allowed_formats: string[];
}

// Configure Multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: '4f-wears',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  } as CloudinaryStorageParams,
});

const upload = multer({ storage: storage });

export default upload;

