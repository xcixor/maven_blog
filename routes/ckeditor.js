const express = require('express');
const multipart = require('connect-multiparty');

const uploadPath = `${__dirname}/../public/uploads/`;
const MultipartMiddleWare = multipart({ uploadDir: uploadPath });

const router = express.Router();

router.post('/upload', MultipartMiddleWare, (req, res) => {
  const tempFile = req.files.upload;
  const { path } = tempFile;
  const actualFilePath = path.replace(`${__dirname.toString().replace('/routes', '')}/public`, '');

  res.status(200).json({
    uploaded: true,
    url: `${actualFilePath}`
  });
});

module.exports = router;
