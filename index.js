const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const PORT = 8000;
const app = express();

const url = "https://www.theguardian.com/international";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    var articles = [];
    $(".fc-item__title ", html).each(function () {
      const title = $(this).text();
      const articleURL = $(this).find("a").attr("href");
      articles.push({
        title,
        articleURL,
      });
    });
    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
        }
      });
      
      const mailOptions = {
        from: process.env.EMAIL,
        to: 'savraj.c@gmail.com',
        subject: 'Todays news',
        text: JSON.stringify(articles,null , "\n")
      };
      //let stringMessage = JSON.stringify(mailOptions)
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    console.log(articles);
  })
  .catch((err) => console.log("Error!"));


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
