import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "./upload");
    },
    filename: function (req, file, cb) {
    const uniqe = Date.now();
    cb(null,file.fieldname + '-' + uniqe)
    },
});

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG files are allowed'), false);
    }
  }

const upload = multer({storage:storage, fileFilter:fileFilter}).single('photo')

export default {
    upload
}