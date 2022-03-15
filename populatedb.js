#! /usr/bin/env node

console.log(
  'This script populates some test products, categories, and brand to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
var async = require('async');
var Product = require('./models/product');
var Category = require('./models/category');
var Brand = require('./models/brand');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const products = [];
const categories = [];
const brands = [];

function brandCreate(name, imageUrl, cb) {
  branddetail = { name: name };
  if (imageUrl != false) branddetail.imageUrl = imageUrl;

  const brand = new Brand(branddetail);

  brand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Brand: ' + brand);
    brands.push(brand);
    cb(null, brand);
  });
}

function categoryCreate(name, imageUrl, cb) {
  categorydetail = { name };

  if (imageUrl != false) categorydetail.imageUrl = imageUrl;

  const category = new Category(categorydetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function productCreate(
  name,
  description,
  category,
  brand,
  price,
  numberInStock,
  imageUrl,
  cb
) {
  productdetail = {
    name: name,
    description: description,
    price: price,
    numberInStock: numberInStock,
  };

  if (category != false) productdetail.category = category;
  if (brand != false) productdetail.brand = brand;
  if (imageUrl != false) productdetail.imageUrl = imageUrl;

  const product = new Product(productdetail);
  product.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Product: ' + product);
    products.push(product);
    cb(null, product);
  });
}

function createBrand(cb) {
  async.series(
    [
      function (callback) {
        brandCreate('Nuvo', null, callback);
      },
      function (callback) {
        brandCreate('Saputo', null, callback);
      },
      function (callback) {
        brandCreate('President', null, callback);
      },
    ],
    // optional callback
    cb
  );
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          'Fresh Fruits',
          'images/categories/fresh_fruits.jpg',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Vegetables',
          'images/categories/vegetables.jpg',
          callback
        );
      },
      function (callback) {
        categoryCreate('Cheese', 'images/categories/cheese.jpg', callback);
      },
    ],
    // optional callback
    cb
  );
}

function createProducts(cb) {
  async.parallel(
    [
      function (callback) {
        productCreate(
          'Banana',
          'Five units is approximately 800 grams.',
          categories[0],
          brands[0],
          1.48,
          450,
          'images/products/banana.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Lemon',
          '1 unit',
          categories[0],
          brands[0],
          0.75,
          600,
          'images/products/lemon.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Avocado',
          '1 unit',
          categories[0],
          brands[0],
          1.29,
          200,
          'images/products/avocado.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Strawberry',
          '1 unit is approximately 500 grams',
          categories[0],
          brands[0],
          2.0,
          100,
          'images/products/strawberry.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Cucumber',
          '1 unit ',
          categories[1],
          brands[0],
          0.99,
          1000,
          'images/products/cucumber.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Red Pepper',
          '1 unit ',
          categories[1],
          brands[0],
          1.76,
          1000,
          'images/products/red_pepper.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Carrots',
          'Bags of 2lbs',
          categories[1],
          brands[0],
          1.99,
          500,
          'images/products/carrots.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'White Potatoes, 10Lbs',
          'Bags of 10lbs',
          categories[1],
          brands[0],
          3.99,
          750,
          'images/products/white_potatoes.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Bocconcini Cocktail, 200 G',
          '200 G approximately 19 units',
          categories[2],
          brands[1],
          4.99,
          199,
          'images/products/bocconcini_cocktail.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Mozzarellissima',
          'Cheese pizza mozzarella block 20%MG, 500G',
          categories[2],
          brands[1],
          9.99,
          99,
          'images/products/mozzarellissima.jpg',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Camembert President',
          'President, Camembert Cheese, 230 G',
          categories[2],
          brands[2],
          6.99,
          75,
          'president_camembert_cheese.jpg',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createBrand, createCategories, createProducts],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
