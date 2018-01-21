var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

router.get('/', function(req, res, next) {
    const REQUESTED_URL = req.query.requestedURL;
    const CRAWL_PAGE_LIMIT = req.query.depth;
    let pagesVisited = {};
    let numPagesVisited = 0;
    let pagesToVisit = [];

    let url = new URL(REQUESTED_URL);
    let baseUrl = url.protocol + "//" + url.hostname;

    let responseObject = new Object();
    responseObject.brokenLinks = [];
    responseObject.allLinks = [];
    responseObject.visitedLinks = [];

    pagesToVisit.push(REQUESTED_URL);
    startCrawling();

    function startCrawling() {
        if (numPagesVisited >= CRAWL_PAGE_LIMIT || pagesToVisit.length == 0) {
            responseObject.allLinks = pagesToVisit;
            res.json(responseObject);
            return;
        }
        var nextPage = pagesToVisit.pop();
        if (nextPage in pagesVisited) {
            startCrawling();
        } else {
            goToPage(nextPage, startCrawling);
        }
    }

    function goToPage(url, callParent) {
        pagesVisited[url] = true;
        numPagesVisited++;
        request(url, function(error, response, body) {
            if (response.statusCode !== 200) {
                responseObject.brokenLinks.push[url];
                callParent();
                return;
            }
            var $ = cheerio.load(body);
            responseObject.visitedLinks.push(url);
            getInternalLinks($);
            callParent();
        });
    }

    function getInternalLinks($) {
        let links = $("a[href^='/']");
        links.each(function() {
            pagesToVisit.push(baseUrl + $(this).attr('href'));
        });
    }
});

module.exports = router;