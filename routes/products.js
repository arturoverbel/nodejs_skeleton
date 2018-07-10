var express = require('express');
var router = express.Router();

var product = require('../controllers/ProductController.js');

router.get('/', product.list);
router.get('/show/:id', product.show);
router.get('/create', product.create);
router.post('/save', product.save);
router.get('/edit/:id', product.edit);
router.post('/update/:id', product.update);
router.post('/delete/:id', product.delete);

module.exports = router;