var express = require('express');
var morgan = require('morgan');
var body_parser = require('body-parser');
var fs = require('fs')
var path = require('path')

var app = express();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger

app.use(morgan('combined', {stream: accessLogStream}))
app.use("/",express.static("./"));

app.use("/",body_parser.urlencoded({extended : false}));
app.set('view engine', 'pug');
app.set('views', __dirname);


app.post('/', function (req, res) {

    console.log(req.body);
    var start=Date.parse(req.body.DOB);
    var end=new Date();
    end=Date.parse(end.toISOString().substring(0, 10));
    var timeDiff = end - start;
    var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));


    res.render('template', { title: 'Assignment1 Q1', message: 'Hey '+ req.body.name +"you have lived on this planet for "+ daysDiff+" days" })
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})