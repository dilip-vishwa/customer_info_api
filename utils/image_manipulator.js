const fs = require('fs');
const sharp = require('sharp');
__logger = require('./logger');

const image_mani = {}

image_mani.resize_image = function (req, file_name) {
    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            __logger.error(err);
        } else {
            sharp(data)
                .resize(300, 300, {
                    fit: 'inside'
                })
                .toFile(file_name, (err, info) => {
                    if (err) {
                        __logger.error(err)
                    } else {
                        __logger.info("successfully resized image and saved")
                    }
                });
        }
    })
}

module.exports = image_mani;
