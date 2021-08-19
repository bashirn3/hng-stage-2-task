const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const alert = require('alert');
const nodemailer = require('nodemailer');
require('dotenv').config();



const app = express();
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
            port: 465,
            service:'yahoo',
            secure: false,
            auth: {
               user: process.env.EMAIL,
               pass: process.env.PASSWORD
            },
            debug: false,
            logger: true 
  });



app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'./public/resume.html')); 
})

app.post('/process', (req, res)=>{

   let mailOptions = {
    from: req.body.EMAIL, // TODO: email sender
    to: process.env.EMAIL, // TODO: email receiver
    subject: 'Contact Form',
    text: req.body.message
};

transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        console.log(err);
    }
    else{
        console.log('Email sent!!!');
    }
  
});

// transporter.verify().then(console.log).catch(console.error);
})

app.listen(process.env.PORT || 3009, ()=>{
    console.log(`app working on port ${process.env.PORT}`)
});