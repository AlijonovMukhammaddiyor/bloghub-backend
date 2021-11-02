const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const catRoute = require("./routes/categories");
const postsRoute = require("./routes/posts");
const multer = require("multer");
const cors = require("cors");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const shortid = require("shortid");
const Post = require("./models/Post");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
app.use("/images", express.static(__dirname + "/images"));

mongoose
	.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(console.log("Connected"))
	.catch((err) => console.error(err));

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "images");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, req.body.name);
// 	},
// });

// const upload = multer({ storage: storage });

// for AWS
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
	accessKeyId,
	secretAccessKey,
});

const uploadS3 = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.BUCKET,
		acl: "public-read",
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, req.body.name);
		},
	}),
});
//upload the image
app.post("/:id/upload", uploadS3.single("file"), (req, res) => {
	const location = req.file.location;
	const id = req.params.id;
	Post.findByIdAndUpdate(id, { Img }, { new: true })
		.then((post) => res.status(200).json({ success: true, post: post }))
		.catch((err) => res.status(400).json({ success: false, error: err }));
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", catRoute);

app.listen(process.env.PORT || 4000, function (err) {
	if (err) console.error(err);
	else console.log("The server is running on port 4000");
});
