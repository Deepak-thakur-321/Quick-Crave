const multer = require('multer');
const storage = multer.memoryStorage();
module.exports = multer({ storage }); // use as: upload.single('video')
