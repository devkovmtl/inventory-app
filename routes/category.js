const { Router } = require('express');
const router = Router();
const categoryController = require('../controllers/categoryController');

// READ
// GET All Category
router.get('/', categoryController.category_list);

module.exports = router;
