const { Router } = require('express');
const productController = require('../controllers/productController');

const router = Router();

// GET all the products
router.get('/', productController.index);

module.exports = router;
