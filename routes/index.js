var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');
  res.render('index', { title: 'Joann Ariola for City Council', 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', });
});

module.exports = router;
