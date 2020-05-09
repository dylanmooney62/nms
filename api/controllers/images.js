const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const FileType = require('file-type');
const StatusHandler = require('../utils/statusHandler');

const getImage = asyncHandler(async (req, res, next) => {
  const filePath = path.join(process.env.FILE_UPLOAD_PATH, req.params.id);

  const fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    return next(
      new StatusHandler(404, `Image with id '${req.params.id}' not found`),
    );
  }

  const { mime } = await FileType.fromFile(filePath);

  res.setHeader('Content-Type', mime);

  fs.createReadStream(filePath).pipe(res);
});

module.exports = {
  getImage,
};
