const path = require('path');
const __db = require('./../utils/db');
const __logger = require('./../utils/logger');
const __validator = require('./../utils/validator');
const im = require('./../utils/image_manipulator');

const api = {}

api.index = (req, res) => {
    res.sendFile(path.join(__dirname+ '../../static/index.html'));
}

/**
 * Save information received from form. 
 * Also check for the given code is already used or not.
 */
api.save_info = async (req, res) => {
    let response = {}

    try {
        let data = req.body;
        data.customer_pic = req.file;

        let fields = { 'name': "str", 'email': "email", 'mobile_number': "mobile", 'unique_code': "str", 'address': "str", 'customer_pic': "file" };
        response = __validator.validate_all_fields(fields, data)
        if (response["issue"]) {
            throw new Error("Validation problem in given field value");
        }

        let unique_code_from_db = await __db.find('unique_codes', {codes: data.unique_code});
        if(unique_code_from_db.length == 0) {
          response["issue"] = "Code did not match"
        } else {
          if(unique_code_from_db[0].used_by) {
            response["issue"] = "Code is already used"
          }
        }

        if (!("issue" in response)) {
            let new_resized_filename = `uploads/${req.body.name.replace(" ", "")}-${Date.now()}_resized.jpg`;
            im.resize_image(req, new_resized_filename);
            data.resized_image_path = new_resized_filename;
            data.original_image_path = req.file.path;
            await __db.insert('customer_info', data);
            await __db.update('unique_codes', { codes: data.unique_code }, { "used_by": data.mobile_number });
            response['result'] = 'Your Information is saved Successfully';
        }
        __logger.info("Successfully processed request")
        res.json(response)
    } catch (e) {
        __logger.error(e)
        res.json(response)
    }
};

module.exports = api;
