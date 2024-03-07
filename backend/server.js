const express = require("express");
const multer = require("multer");
const connectDB = require("./config/db_config");
const router = require("./routes/productRoutes");
require("dotenv").config();
const cors = require('cors')
const app = express();

const PORT = process.env.PORT;
// connect database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import ROUTES
app.use("/api/products", router);

app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome to product API");
});



// file upload////
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, "my-file" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("file uploaded");
});

app.listen(PORT, () => {
  console.log(`server is running at : ${PORT}`);
});
