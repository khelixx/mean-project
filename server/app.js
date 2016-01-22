var express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var url = "mongodb://localhost/rjorel_mean-project";


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/../client"));
app.use('/bower_components', express.static(__dirname + "/../bower_components"));


// Server start.
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Well connected to %s, at port %s", host, port);
});


// Database connection.
var db = mongoose.connect(url);

// Schemas (entities).
var Schema = mongoose.Schema;

// User definition (just a email and a password for the moment).
var UserSchema = new Schema({
    email: String,
    passwd: String,
    groups: Array,
    settings: {
        name: {type: String, default: ""},
        firstname: {type: String, default: ""},
        phone: {type: String, default: ""}
    }
});

// Models
UserModel = mongoose.model('UserModel', UserSchema);


app.get('/user/:email/:passwd', function(req, res) {
    UserModel.findOne(req.params, function(err, user, next) {
        if (err) return next(err);

        res.send(user);
    })
});

app.post('/user', function(req, res) {
    UserModel.findOne({ email: req.body.email }, function(err, data, next) {
        if (err) return next(err);

        if (data)           // No more than one user by address.
            res.send({});

        else {
            var user = UserModel(req.body);
            user.save(function (err, results) {
                if (err) return next(err);

                res.send(results);
            });
        }
    })
});

app.put('/user', function(req, res) {
    UserModel.findOne({ email: req.body.email }, function (err, user){
        user.groups = req.body.groups;
        user.settings = req.body.settings;
        user.save();
    });
});

app.get('/remove', function(req, res) {
    UserModel.find(function(err,data){ 
        res.send(data);
    });
});


