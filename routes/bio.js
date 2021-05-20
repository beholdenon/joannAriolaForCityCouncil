if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');
	res.render('bio', { 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', title: 'Bio - ' + process.env.PAGE_TITLE });

});

module.exports = router;
