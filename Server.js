var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/hrg', function (req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html')
});

app.listen(3000);
// console.log("Running at Port 3000");