const __config = require('../config/index');
const MongoClient = require('mongodb').MongoClient;

const mongo_conf = __config.mongo_db;
let url = ""
if(mongo_conf.password) {
    url = `mongodb://${mongo_conf.username}:${mongo_conf.password}@${mongo_conf.hostname}:${mongo_conf.port}/${mongo_conf.db}`;
} else {
    url = `mongodb://${mongo_conf.hostname}:${mongo_conf.port}/${mongo_conf.db}`;
}

const db = {};

db.get_connection = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                __logger.error(err);
                reject(err);
            } else {
                __logger.info("Connected to database");
                resolve(db);
            }
        });
    })
};

db.find = function (collection, find_param) {
    return new Promise((resolve, reject) => {
        db.db.db('brandx').collection(collection).find(find_param).toArray(function (err, result) {
            if (err) {
                __logger.error(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

db.insert = function (collection, insert_data) {
    return new Promise((resolve, reject) => {
        db.db.db('brandx').collection(collection).insertOne(insert_data, function (err, result) {
            if (err) {
                __logger.error(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

db.update = function (collection, find_param, update_data) {
    return new Promise((resolve, reject) => {
        db.db.db('brandx').collection(collection).update(find_param, { "$set": update_data }, function (err, result) {
            if (err) {
                __logger.error(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

db.get_db = async function () {
    let db_connection = await db.get_connection()
    return db_connection;
}

module.exports = db;
