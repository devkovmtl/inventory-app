const { Schema } = require('mongoose');
const Brand = require('../models/brand');

// Get all the brands
exports.brandList = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Brand Get list');
};

// Get brand detail for a specific brand
exports.brandDetail = async (req, res, next) => {
  const brandId = Schema.Types(req.params.id);
  res.send('NOT IMPLEMENTED: Brand Get details' + brandId);
};

// Get form to create a brand
exports.brandCreateGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Brand Create Get');
};

// Handle the post to create brand
exports.brandCreatePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: brand create Post');
};

// Get form to delete a brand
exports.brandDeleteGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Brand Delete Get Page');
};

// Handle the post to delete brand
exports.brandDeletePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: brand Delete Post Page');
};

//  Display brand update form GET
exports.brandDeleteGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Brand Update GET Page');
};

// Display brand update form POST
exports.brandDeletePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Brand Update POST Page');
};
