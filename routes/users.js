const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator')
const { verifyCookie, auth } = require('../controllers/middlewares/auth')


/* GET users listing. */
router.get('/login', userController.login);
router.get('/signup', userController.signup);
router.get('*', auth)

router.post('/login',
  body('email').isEmail().withMessage('valid email is required !'),
  body('password').notEmpty().withMessage('password is required !'),
  userController.loginPost);

router.post('/signup',
  body('email').isEmail().withMessage('valid email is required !'),
  body('password').notEmpty().withMessage('password is required !'),
  userController.signupPost);

router.get('/logout', userController.logout)

module.exports = router;
