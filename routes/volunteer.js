require('dotenv').config();

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  var absoluteRoot = req.protocol + '://' + req.get('host');
  res.render('volunteer', { 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', 'title': 'Volunteer - ' + process.env.PAGE_TITLE });
});


router.post('/', function(req, res){
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const party = req.body.party;
  const help = req.body.help;
  console.log(party);

  var transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO_VOLUNTEER,
    subject: process.env.SITE_NAME + ' Volunteer Form Submission',
    html: 'First Name: ' + first_name + '<br />Last Name: ' + last_name + '<br />Email Address: ' + email + '<br />Phone Number: ' + phone + '<br />Party: ' + party + '<br />How Would you Like to Help: ' + help
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
