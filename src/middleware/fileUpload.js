import multer from "multer";
import slugify from "slugify";

// Define upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, slugify(new Date().toISOString() + file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Reject file if not image
  if (
    file.mimeType === "image/jpeg" ||
    file.mimeType === "image/png" ||
    file.mimeType === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export default fileUpload;
