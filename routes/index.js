if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var router = express.Router();
var news = require('../services/news.js');
var FB = require('fb');
FB.setAccessToken(process.env.FB_TOKEN);


router.use(function (req, res, next) {

	news.getNews().then(function (newsCollection) {
    req.news = newsCollection.items;
    console.log(req.news);

    FB.api(
      "/Ariola2021/published_posts?limit=6&date_format=U",
      { fields: ['full_picture', 'message', 'permalink_url', 'created_time'] },
      function (response) {
        console.log(response);
        if (response && !response.error) {
          req.facebook = response.data;
          console.log(req.facebook);
        }
        next();
      }
    );

  }).
  catch(function (err) {
    console.log('news.js - getNews (line 23) error:', JSON.stringify(err,null,2))
    next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');
  res.render('index', { 'news':req.news, 'facebook': req.facebook, title: 'Joann Ariola for City Council', 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', });
});

module.exports = router;
