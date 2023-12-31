var express = require('express');
var router = express.Router();
const { verifyCookie } = require('../controllers/middlewares/auth')

/* GET home page. */
router.get('/', verifyCookie, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
