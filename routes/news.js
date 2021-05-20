if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var router = express.Router();
var news = require('../services/news.js')


router.use(function (req, res, next) {
  news.getNews().then(function (newsCollection) {
    req.news = newsCollection.items;
    console.log(JSON.stringify(req.news));
    next();
  }).catch(function (err) {
    console.log('news.js - getNews (line 23) error:', JSON.stringify(err,null,2))
    next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');
	res.render('news', { 'news': req.news, 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', 'title': 'News - ' + process.env.PAGE_TITLE });
});

module.exports = router;
