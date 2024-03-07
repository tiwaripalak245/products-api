const express = require("express");
const {
  createProducts,
  getProducts,
  getSingleProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  registerUser,
  loginUser,
  changePassword,
  loggedUser,
} = require("../controllers/authController");
const verifyToken = require("../middileware/authMiddileware");

//////////// product routes//////////////
const router = express.Router();
router.post("/", createProducts);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", replaceProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

///////////Auth routes/////////////////

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/changepassword", verifyToken, changePassword);
router.get("/dashboard", verifyToken, loggedUser);

module.exports = router;
