const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
		followers: {
			names: [String],
			count: {
				type: Number,
				default: 0,
			},
		},
		bio: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("Author", AuthorSchema);
