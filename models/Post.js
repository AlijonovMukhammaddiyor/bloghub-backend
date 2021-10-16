const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		subtitle: {
			type: String,
			required: true,
		},
		category: {
			type: [String],
			required: true,
		},
		length: {
			type: Number,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		Img: {
			type: String,
			required: true,
		},
		author: {
			name: {
				type: String,
				required: true,
			},
			id: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
			},
		},
		likes: {
			type: Number,
			default: 0,
		},
		view_count: {
			type: Number,
			default: 0,
		},
		// comments: {
		// 	count: {
		// 		type: Integer,
		// 		default: 0,
		// 	},
		// 	comment: {
		// 		person: {
		// 			type: String,
		// 			required: true,
		// 		},
		// 	},
		// },
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("Post", PostSchema);
