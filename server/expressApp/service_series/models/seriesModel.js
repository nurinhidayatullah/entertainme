const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const seriesSchema = new Schema({
	'title' : String,
	'overview' : String,
	'poster_path' : String,
	'popularity' : Number,
	'tags' : Array
}, {collection: 'series'});

module.exports = mongoose.model('series', seriesSchema);
