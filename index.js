const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const catRoute = require("./routes/categories");
const postsRoute = require("./routes/posts");
const multer = require("multer");
const cors = require("cors");

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

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", catRoute);

app.listen(process.env.PORT || 4000, function (err) {
	if (err) console.error(err);
	else console.log("The server is running on port 4000");
});
