const router = require("express").Router();
const User = require("../models/User");
const Author = require("../models/Author");
const bcrypt = require("bcrypt");
const { modelNames } = require("mongoose");

//bcrypt functions
const SALT_ROUNDS = 10;
async function hash(password) {
	const salt = await bcrypt.genSalt(SALT_ROUNDS);
	const hashed = await bcrypt.hash(password, salt);
	return hashed;
}

async function compare(password, hashed) {
	const match = await bcrypt.compare(password, hashed);
	return match;
}
// User register
router.post("/user/register", async (req, res) => {
	try {
		const hashed_password = await hash(req.body.password);

		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashed_password,
			profilePic: req.body.profilePic,
			bio: req.body.bio,
		});
		const user_demo = await user.save();
		res.status(200).json(user_demo);
	} catch (err) {
		res.status(500).send(err);
	}
});

//User login
router.post("/user/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			res.status(400).send("Wrong username or password.");
		} else {
			const valid = await compare(req.body.password, user.password);
			if (!valid) res.status(400).send("Wrong username or password.");
			else {
				const { password, ...others } = user._doc;
				res.status(200).json(others);
			}
		}
	} catch (error) {
		res.status(400).send(err);
	}
});

module.exports = router;
