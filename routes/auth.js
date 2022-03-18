const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// /* REGISTER page */
// router.get('/register', authController.registerGet);
// router.post('/register', authController.registerPost);

/* LOGIN page. */
router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);

/* LOGOUT page */
router.get('/logout', authController.logout);

module.exports = router;
