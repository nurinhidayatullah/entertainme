const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const movieSchema = new Schema({
	'title' : String,
	'overview' : String,
	'poster_path' : String,
	'popularity' : Number,
	'tags' : Array
}, {collection: 'movies'});

module.exports = mongoose.model('movie', movieSchema);
