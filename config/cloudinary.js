const cloudinary = require("cloudinary").v2; // Don't forget the .v2 !
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "social-cooking-mern", // the name of the folder in cloudinary
  allowedFormats: ["jpg", "png"],
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;