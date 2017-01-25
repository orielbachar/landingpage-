var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost/exploit');

//routes
var routes = require('./routes/index');

//middlewares
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // set the view engine to ejs
// app.set('view engine', 'ejs');

app.use('/', routes);



var port = process.env.PORT || '8000';

app.listen(port);
