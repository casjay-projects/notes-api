const path = require('path');
const multer = require('multer');

// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  // By default, multer removes file extensions so let's add them back
  // cb is call back here
  filename: function (req, file, cb) {
    // as callbacks first paramter is error so we assigned it with null
    // and 2nd parameter is the filename after the file is uploaded --here we adding timestamp value(Date.now())
    cb(null, `myImage-${Date.now()}${path.extname(file.originalname)}`);
    // it returns the original extension of files
  },
});

// initializing upload variable and also giving some restrictions
const limit = {
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    checkFIleType(file, cb);
  },
};

const upload = multer(limit).single('myImage');
const uploadMultiple = multer(limit).any('myImage');

// checking the typesof files and restict them - only images can be uploaded
function checkFIleType(file, cb) {
  // allowing extension
  const filetypes = /jpeg|jpg|png|gif/;
  // checking extension
  const ext = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && ext) {
    return cb(null, true);
  }
  return cb('Error : Images only');
}

module.exports.upload = upload;
module.exports.uploadMultiple = uploadMultiple;
