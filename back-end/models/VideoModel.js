var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var VideoSchema = new Schema({
	title : { type: String, required: true },
	description : { type: String},
	url: { type: String, required: true },
	thumbnail :  { type: String},
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
