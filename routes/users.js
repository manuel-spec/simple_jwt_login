const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator')


/* GET users listing. */
router.get('/login', userController.login);
router.get('/signup', userController.signup);

router.post('/login',
  body('email').isEmail().withMessage('valid email is required !'),
  body('password').notEmpty().withMessage('password is required !'),
  userController.loginPost);

router.post('/signup',
  body('email').isEmail().withMessage('valid email is required !'),
  body('password').notEmpty().withMessage('password is required !'),
  userController.signupPost);

module.exports = router;
