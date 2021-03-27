var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/sugar_cosmetics";

var db = {};

db.get_connection = function() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                reject(err)
            } else {
                console.log("Database created!");
                // db.db = db
                resolve(db)
            }
          //   db.close();
          });
    })
};

db.find = function(collection, find_param) {
    return new Promise((resolve, reject) => {
        db.db.db('sugar_cosmetics').collection(collection).find(find_param).toArray(function(err, result) {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

db.insert = function(collection, insert_data) {
    return new Promise((resolve, reject) => {
        db.db.db('sugar_cosmetics').collection(collection).insert(insert_data, function(err, result) {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

db.update = function(collection, find_param, update_data) {
    return new Promise((resolve, reject) => {
        db.db.db('sugar_cosmetics').collection(collection).update(find_param, {"$set": update_data}, function(err, result) {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

db.get_db = async function() {
    let db_connection = await db.get_connection()
    return db_connection;
}

module.exports = db;
