var mongoose = require('mongoose');
const mongoDB = "mongodb://127.0.0.1:27017/Cinema"

mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);

module.exports = mongoose;
