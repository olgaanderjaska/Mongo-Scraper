// Our scraping tools
var express = require('express');
var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();

router.get('/', function (req, res) {
    request("https://www.nytimes.com", function (error, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);
        var result = [];

        // Now, we grab every h2 within an article tag, and do the following:
        $(".first-column-region .collection article").each(function (i, element) {

            // Save an empty result object
            var art = {};

            // Add the text and href of every link, and save them as properties of the result object
            art.title = $(this).children("h2").text();
            art.post = $(this).children(".summary").text();

            console.log("ENTRY NEW :", art);

            if (art.post !== "") {
                result.push(art);
            }

        });
        res.render('index', {
            "save": false,
            "articles": result
        });
    });
})

module.exports = router;