const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//CREATE

router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (err) {
		res.status(500).json(err);
	}
});

//UPDATE
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				const updatedPost = await Post.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updatedPost);
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json("You are not authorized to edit!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				await post.delete();
				res.status(200).json("Post has been deleted...");
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json("You are not authorized to delete this post!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL POSTS
router.get("/", async (req, res) => {
	// console.log("here");
	const username = req.query.user;
	const catName = req.query.cat;
	console.log(username);
	try {
		let posts;
		if (username) {
			console.log("username");
			posts = await Post.find({
				"author.name": username,
			});
		} else if (catName) {
			posts = await Post.find({
				category: {
					$in: [catName],
				},
			});
		} else {
			console.log("here");
			posts = await Post.find();
		}
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
