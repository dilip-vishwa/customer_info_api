const multer = require('multer');
const app_api = require('./../app/index')

const storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function (req, file, cb) {
            let new_filename = req.body.name.replace(" ", "") + '-' + Date.now() + ".jpg"
            cb(null, new_filename);
        }
    }
);

const upload = multer({ storage: storage });

module.exports = function (app) {
    app.get('/', app_api.index);
    app.post('/save-info', upload.single('customer_pic'), app_api.save_info);
}