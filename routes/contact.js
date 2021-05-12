if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
  var absoluteRoot = req.protocol + '://' + req.get('host');

  res.render('contact', { 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', 'title': 'Contact - Joann Ariola for City Council - District 32' });
});


router.post('/', 
  body('first_name').isLength({ min: 2 }),
  body('last_name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('comments').isLength({ min: 2 }),

  function(req, res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const comments = req.body.comments;

    var transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    });

  var mailOptions = {
    from: 'Brian Holden<bholden@battery-digital.com>',
    to: 'bholden@battery-digital.com',
    subject: 'Joann Ariola Contact Us Form Submission',
    html: 'First Name: ' + first_name + '<br />Last Name: ' + last_name + '<br />Email Address: ' + email + '<br />Phone Number: ' + phone + '<br />Comments: ' + comments
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  var obj = {};
  console.log('body: ' + JSON.stringify(req.body));
  res.send("{'success': 1 }");
});

module.exports = router;
