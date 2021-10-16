const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
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
			default:
				"https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
		},
		bio: {
			type: String,
			default: "",
		},
		liked: {
			type: [String],
			default: [],
		},
		saved: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("User", UserSchema);
