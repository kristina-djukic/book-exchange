const multer = require("multer");
const path = require("path");

function getMulterUpload() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const picName = `${Date.now()}-${file.originalname}`;
      cb(null, picName);
    },
  });

  return multer({ storage });
}

module.exports = getMulterUpload;
