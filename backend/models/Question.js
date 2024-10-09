const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: "",
	},
	step: {
		type: Number,
		required: true,
	},
	lecture: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Question", questionSchema);