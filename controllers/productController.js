const { Schema } = require('mongoose');
const Product = require('../models/product');

exports.index = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Get all the products
exports.productList = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product List Page');
};

// Get product detail for a specific product
exports.productDetail = async (req, res, next) => {
  const productId = Schema.Types(req.params.id);
  res.send('NOT IMPLEMENTED: Product Details Page ' + productId);
};

// Get form to create a product
exports.productCreateGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Create Get');
};

// Handle the post to create product
exports.productCreatePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product create Post');
};

// Get form to delete a product
exports.productDeleteGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Delete Get Page');
};

// Handle the post to delete product
exports.productDeletePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Delete Post Page');
};

//  Display product update form GET
exports.productDeleteGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Update GET Page');
};

// Display product update form POST
exports.productDeletePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Update POST Page');
};
