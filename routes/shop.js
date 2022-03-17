const { Router } = require('express');
const brandController = require('../controllers/brandController');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

const router = Router();

/// PRODUCT ROUTES ///

// GET all the products
router.get('/', productController.index);

// CREACT a product
// get to display the form
router.get('/product/create', productController.productCreateGet);
// post the form
router.post('/product/create', productController.productCreatePost);

// DELETE a product
// Get display the form
router.get('/product/:id/delete', productController.productDeleteGet);
// Post the form
router.post('/product/:id/delete', productController.productDeletePost);

// UPDATE a product
// Get display the form
router.get('/product/:id/update', productController.productUpdateGet);
// Post the form
router.post('/product/:id/update', productController.productUpdatePost);

// GET detail of one book
router.get('/product/:id', productController.productDetail);

// Get list of all products
router.get('/products', productController.productList);

/// BRANDS ROUTES ///

// CREACT a brand
// get to display the form
router.get('/brand/create', brandController.brandCreateGet);
// post the form
router.post('/brand/create', brandController.brandCreatePost);

// DELETE a Brand
router.get('/brand/:id/delete', brandController.brandDeleteGet);
router.post('/brand/:id/delete', brandController.brandDeletePost);

// Update a Brand
router.get('/brand/:id/update', brandController.brandUpdateGet);
router.post('/brand/:id/update', brandController.brandUpdatePost);

// Get specific brand
router.get('/brand/:id', brandController.brandDetail);

// Get list of all the brands
router.get('/brands', brandController.brandList);

/// CATEGORIES ROUTES ///

// CREATE a category
// Get display show form
router.get('/category/create', categoryController.categoryCreateGet);
router.post('/category/create', categoryController.categoryCreatePost);

// Delete a category
router.get('/category/:id/delete', categoryController.categoryDeleteGet);
router.post('/category/:id/delete', categoryController.categoryDeletePost);

// Update a category
router.get('/category/:id/update', categoryController.categoryUpdateGet);
router.post('/category/:id/update', categoryController.categoryUpdatePost);

router.get('/category/:id', categoryController.categoryDetail);
router.get('/categories', categoryController.categoryList);

module.exports = router;
