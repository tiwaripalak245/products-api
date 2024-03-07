const product = require("../models/productsModel.js");

const createProducts = async (req, res) => {
  const { title, description, price, category, image } = req.body;
//   if (!title || !description || !price || !category) {
//     res.status(400);
//     throw new Error("please fill all details!");
//   }

  const newProduct = await product.create({
    title,
    description,
    price,
    category,
    image
  });
  if (newProduct) {
    res.status(200).json(newProduct);
  } else {
    res.status(401);
    throw new Error("Something Wrong");
  }
};

const getProducts = async (req, res) => {
  const allProducts = await product.find();
  res.json(allProducts);
};

const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  const products = await product.findById(id);
  res.json(products);
};

const replaceProduct = async (req, res) => {
  const id = req.params.id;
  const rProduct = await product.findOneAndReplace({ _id: id }, req.body, {
    new: true,
  });
  res.status(200).json(rProduct);
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const Product = await product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(200).json(Product);
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const Product = await product.findOneAndDelete({_id:id})
  res.status(200).json(Product);
};

module.exports = {
  createProducts,
  getProducts,
  getSingleProduct,
  replaceProduct,
  updateProduct,
  deleteProduct
};
