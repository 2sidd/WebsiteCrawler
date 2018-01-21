var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var crawler = require('./controller/crawler');

var path = __dirname + '/views/';

app.use('/', router);
router.use('/crawler', crawler);

router.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});
app.get('/js/homeCtrl.js', function(req, res) {
    res.sendFile(__dirname + '/js/homeCtrl.js');
});
app.get('/css/site.css', function(req, res) {
    res.sendFile(__dirname + '/css/site.css');
});
app.listen(3300, function() {
    console.log('Listening on port 3300!');
});