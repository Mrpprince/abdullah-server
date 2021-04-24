const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');
require('dotenv').config()


const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('creative-agency'));
app.use(fileUpload());


app.post('/sendEmail', (req, res) => {
  const data = req.body;

  console.log(data);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'princemrp30@gmail.com',
      pass: 'mrpprince13#'
    }
  });

  var mailOptions = {
    from:'princemrp30@gmail.com',
    to:'abduljalil1484@gmail.com',
    subject: `${data.subject}`,
   html:`
   First Name :${data.FirstName} <br>
   Last Name:${data.LastName} <br>
   ${data.email} send you <br>${data.message}</br>`
    


  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send(info);
    }
  });

})

app.post('/sendMessage', (req, res) => {
  const data = req.body;

  console.log(data);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'princemrp30@gmail.com',
      pass: 'mrpprince13#'
    }
  });

  var mailOptions = {
    from:'princemrp30@gmail.com',
    to:'abduljalil1484@gmail.com',
    subject: `${data.subject}`,
    html:` <b>${data.email}</b> from ${data.country} Have Interested On The Cloth which is Code is <b>${data.code}</b> This is his/her message <br/><h1>${data.message}</h1> 
     This is His/Her Number ${data.mobile}` ,
    
    
   



  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send(info);
    }
  });

})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})