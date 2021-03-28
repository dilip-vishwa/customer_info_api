const __config = require('../config')

const validator = {};

validator.validate_all_fields = function (fields_info, field_data) {
    let response = {};
    try {
        for (let fi in fields_info) {
            if (!(fi in field_data)) {
                response["issue"] = `Field ${fi} is not given`;
                throw new Error("Field not found")
            }
            else if (fields_info[fi] == 'str') {
                if (field_data[fi] == "") {
                    response["issue"] = `Field ${fi} is empty`;
                    throw new Error("Field problem")
                }
            }
            else if (fields_info[fi] == 'email') {
                if (field_data[fi] == "") {
                    response["issue"] = `Field ${fi} is empty`;
                    throw new Error("Field problem")
                }

                if (!__config.email_regexp.test(field_data[fi])) {
                    response["issue"] = `Email Id is not valid`;
                    throw new Error("Field problem")
                }
            }
            else if (fields_info[fi] == 'mobile') {
                if (field_data[fi] == "") {
                    response["issue"] = `Field ${fi} is empty`;
                    throw new Error("Field problem")
                }

                if (!__config.mobile_number.test(field_data[fi])) {
                    response["issue"] = `Mobile Number is not valid`;
                    throw new Error("Field problem")
                }
            }
            else if (fields_info[fi] == 'file') {
                if (!field_data[fi] || !field_data[fi].size) {
                    response["issue"] = `Field ${fi} is empty`;
                    throw new Error("Field problem")
                }
            }
        }
        return response;
    } catch (e) {
        return response;
    }
}



module.exports = validator;