var express = require("express");
var fs = require("fs");
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/users', users);


// Server start.
var server = app.listen(3000, function() {
    var host = server.address().adress;
    var port = server.address().port;

    console.log("Well connected to %s, at port %s", host, port);
});
