const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const StatusHandler = require('../utils/statusHandler');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FILE_UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

const limits = {
  fileSize: parseInt(process.env.MAX_FILE_UPLOAD, 10),
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new StatusHandler(400, `File type '${file.mimetype}' is not supported`),
      false,
    );
  }

  cb(null, true);
};

module.exports = multer({
  storage,
  limits,
  fileFilter,
});
