const multer = require('multer');
require('dotenv').config();
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, UPLOAD_DIR);
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now().toString()}_${file.originalname}`);
	},
});

const upload = multer({
	storage: storage,
	limits: { fieldSize: 2000000 },
	fileFilter: (req, file, cb) => {
		if (file.mimetype.includes('image')) {
			return cb(null, true);
		}

		// You can always pass an error if something goes wrong:
		cb(new Error(400, 'Wrong format file!'));
	},
});

module.exports = upload;
