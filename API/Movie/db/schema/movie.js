const mongoose = require('../mongoose.js');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: {type: String, required: true},
  genre: {type: String, required: true},
  year: {type: Number, required: true},
  director: {type: String, required: true},
  duration: {type: Number, required: true},
  age: {type: Number},
  image: {type: String},
  actors: {type: [String]}
}, {collection: "Movies"});

module.exports = mongoose.model("Movie", movieSchema)
