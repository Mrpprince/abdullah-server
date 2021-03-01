const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');
require('dotenv').config()

//  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dz1oc.mongodb.net/TexSourceGlobalBD?retryWrites=true&w=majority`

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('creative-agency'));
app.use(fileUpload());

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {

//     const mensCollection = client.db("TexSourceGlobalBD").collection("MenCloth");
//     const woMmensCollection = client.db("TexSourceGlobalBD").collection("WomenCloth");
//     const KidsCollection = client.db("TexSourceGlobalBD").collection("KidsCloth");


//     app.get('/mensCloth', (req, res) => {
//       mensCollection.find()
//           .toArray((err, documents) => {
//               res.send(documents);
//           })
//   });
//   app.post('/findMensCloth', (req, res) => {
//     const code = req.body.code;
    
//     mensCollection.find({code: code})
//     .toArray((err, documents) => {
//       res.send(documents);
//   })
// })
//   app.get('/womensCloth', (req, res) => {
//     woMmensCollection.find()
//         .toArray((err, documents) => {
//             res.send(documents);
//         })
// });
// app.get('/kidsCloth', (req, res) => {
//   KidsCollection.find()
//       .toArray((err, documents) => {
//           res.send(documents);
//       })
// });

// app.post('/findKidsCloth', (req, res) => {
//   const code = req.body.code;
  
//   mensCollection.find({code: code})
//   .toArray((err, documents) => {
//     res.send(documents);
// })
// })
    
//   app.post('/addMensCloth',(req,res)=>{
  
//         const file = req.files.file;
//         const code = req.body.code;
//         const fabric = req.body.fabric;
//         const material = req.body.material;
//         const size = req.body.size;
//         const color = req.body.color;
//         const MOQ = req.body.moq;
//         const description = req.body.description;
//         const newImg = file.data;
//         const encImg = newImg.toString('base64');

//         var image = {
//             contentType: file.mimetype,
//             size: file.size,
//             img: Buffer.from(encImg, 'base64')
//         };
//         console.log(req.body)
//         mensCollection.insertOne({ code, fabric, material, size, color,MOQ, image, description })
//             .then(result => {
//                 res.send(result.insertedCount > 0);
//             })
    
//   })

//   app.post('/addWomensCloth',(req,res)=>{
  
//     const file = req.files.file;
//     const code = req.body.code;
//     const fabric = req.body.fabric;
//     const material = req.body.material;
//     const size = req.body.size;
//     const color = req.body.color;
//     const MOQ = req.body.moq;
//     const description = req.body.description;
//     const newImg = file.data;
//     const encImg = newImg.toString('base64');

//     var image = {
//         contentType: file.mimetype,
//         size: file.size,
//         img: Buffer.from(encImg, 'base64')
//     };
//     console.log(req.body)
//     woMmensCollection.insertOne({ code, fabric, material, size, color,MOQ, image, description })
//         .then(result => {
//             res.send(result.insertedCount > 0);
//         })

// })
// app.post('/addKidsCloth',(req,res)=>{
  
//   const file = req.files.file;
//   const code = req.body.code;
//   const fabric = req.body.fabric;
//   const material = req.body.material;
//   const size = req.body.size;
//   const color = req.body.color;
//   const MOQ = req.body.moq;
//   const description = req.body.description;
//   const newImg = file.data;
//   const encImg = newImg.toString('base64');

//   var image = {
//       contentType: file.mimetype,
//       size: file.size,
//       img: Buffer.from(encImg, 'base64')
//   };
//   console.log(req.body)
//   KidsCollection.insertOne({ code, fabric, material, size, color,MOQ, image, description })
//       .then(result => {
//           res.send(result.insertedCount > 0);
//       })

// })

// });
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
    to:'abdullah.br2311@gmail.com',
    subject: `${data.subject}`,
   html:`${data.email} send you <b>${data.message}</b>`
    


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
    to:'princemrp13@gmail.com',
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