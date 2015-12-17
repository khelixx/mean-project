var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

var routes = require("./routes/index");
var users = require("./routes/users");
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', routes);
// app.use('/users', users);

app.use(express.static("client"));
app.use('/bower_components', express.static("bower_components"));

app.get('/users', function(req, res, next) {
    res.send([
        {id: 1, name: "Jorel", fname: "Raphael", desc: "Nothing"},
        {id: 2, name: "Laulan", fname: "Antoine", desc: "Euh..."},
        {id: 3, name: "Verdugo", fname: "Guillaume", desc: "Maybe gay"}]);
});


// Server start.
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Well connected to %s, at port %s", host, port);
});