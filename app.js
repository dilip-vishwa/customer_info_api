const express = require('express')
const fs = require('fs')
var bodyParser = require('body-parser')
var multer = require('multer');
const sharp = require('sharp');
var __db = require('./utils/db')
var __logger = require('./utils/logger')

const app = express()
const port = 3000
var storage = multer.diskStorage(
  {
      destination: './uploads/',
      filename: function ( req, file, cb ) {
          let new_filename = req.body.name.replace(" ", "") + '-' + Date.now()+".jpg"
          // let new_resized_filename = req.body.name.replace(" ", "") + '-' + Date.now()+"_resized.jpg"
          // sharp(file)
          //   .resize(300, 300)
          //   .toFile(new_resized_filename, (err, info) => { 
          //     console.log("successfully resized image ")
          //   });
          cb( null, new_filename);
      }
  }
);

var upload = multer( { storage: storage } );

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/save-info', async (req, res) => {
  // __db.getCollection('unique_codes').find({}).toArray(function() {
  //   res.send('Hello World!');
  // })
  // get infrmation from form and validate it.
  // Also get image from form and resize it to 300x300
  // store information in db

});

app.post('/save-info', upload.single('customer_pic'), async (req, res) => {
  
  // get infrmation from form and validate it.
  // Also get image from form and resize it to 300x300
  // store information in db
  let response = {}

  try {
    let data = req.body;
    
    // let fields = {'name': "str", 'email': "email", 'mobile_number': "str", 'unique_code': "str", 'address': "str", 'customer_pic': "object"};
    // for(let f in fields) {
    //   if(!(f in data)) {
    //     response["issue"] = `Field ${f} is not given`;
    //     throw new Error("Field not found")
    //   }
    //   if(fields[f] == 'str') {
    //     if(data[f] == "") {
    //       response["issue"] = `Field ${f} is empty`;
    //       throw new Error("Field problem")
    //     }
    //   }
    //   if(fields[f] == 'email') {
    //     if(data[f] == "") {
    //       response["issue"] = `Field ${f} is empty`;
    //       throw new Error("Field problem")
    //     }
    //     const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //     console.log(emailRegexp.test(data[f]));
    //     if(!emailRegexp.test(data[f])) {
    //       response["issue"] = `Email Id is not valid`;
    //       throw new Error("Field problem")
    //     }
    //   }
      
    // }

    let new_resized_filename = `uploads/${req.body.name.replace(" ", "")}-${Date.now()}_resized.jpg`
    fs.readFile(req.file.path, (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(data)
      sharp(data)
      .resize(300, 300)
      .toFile(new_resized_filename, (err, info) => { 
        console.log("successfully resized image ")
      });
    })
    
    // let unique_code_from_db = await __db.find('unique_codes', {codes: data.unique_code});
    // if(unique_code_from_db.length == 0) {
    //   response["issue"] = "Code did not match"
    // } else {
    //   if(unique_code_from_db[0].used_by) {
    //     response["issue"] = "Code is already used"
    //   }
    // }

    // if(!("issue" in response)) {
    //   await __db.insert('customer_info', data);
    //   await __db.update('unique_codes', {codes: data.unique_code}, {"used_by": data.mobile_number});
    //   response['result'] = 'success';
    // }

    res.json(response)
  } catch(e) {
    res.json(response)
  }
})

app.listen(port, () => {
  __logger.info(`App listening at http://localhost:${port}`)
})

__db.get_db().then(function(db) {
  __db.db = db
  console.log("DB initialized")
})
