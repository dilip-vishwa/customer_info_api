const express = require('express');
const bodyParser = require('body-parser');
const __db = require('./utils/db');
const __logger = require('./utils/logger');
const __validator = require('./utils/validator');
const im = require('./utils/image_manipulator');
const routes = require('./routes');

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/static'));

routes(app);

app.listen(port, () => {
  __logger.info(`App listening at http://localhost:${port}`)
})

__db.get_db().then(function (db) {
  __db.db = db
  console.log("DB initialized")
})
