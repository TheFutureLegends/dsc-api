import multer from "multer";
import slugify from "slugify";
import moment from "moment-timezone";
import fs from "fs";

// Define storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = "./public/upload/";

    fs.mkdirSync(path, { recursive: true });

    return cb(null, path);
  },
  filename: function (req, file, cb) {
    const nDate = moment().tz("Asia/Ho_Chi_Minh").format("MM-DD-YYYY-HH-mm-ss");

    cb(null, nDate + "-" + slugify(file.originalname));
  },
});

// Filter file mime
const fileFilter = (req, file, cb) => {
  // reject a file if not image
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export default imageUpload;
