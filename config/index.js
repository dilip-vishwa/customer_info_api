const config = {};

config.PORT = process.env.PORT;
config.environment = process.env.NODE_ENV;
config.mongo_db = {
    "hostname": "localhost",
    "port": "27017",
    "username": "",
    "password": "",
    "db": "brandx"
}
config.email_regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
config.mobile_number = /\d{10,12}/

let custom_config = require(`./${config.environment}`);

const final_config = {...config, ...custom_config}

module.exports = final_config;
