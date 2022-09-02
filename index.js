const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");

const PORT = 8000;
const app = express();

const url = 'https://www.theguardian.com/international'

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];
        $('.fc-item__title ', html).each(function(){
            const title = $(this).text()
            const articleURL = $(this).find('a').attr('href')
            articles.push({
                title,
                articleURL,
            })
        })
        console.log(articles);
    }).catch(err => console.log("Error!"))
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
