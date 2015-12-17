var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/test";

// var routes = require("./routes/index");
// var users = require("./routes/users");
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', routes);
// app.use('/users', users);

app.use(express.static("client"));
app.use('/bower_components', express.static("bower_components"));

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log("Impossible to connect database");
        return;
    }

    db.collection("users", function(err, coll) {
        if (err) {
            console.log("Impossible to connect collection");
            return;
        }

        app.get('/user', function(req, res) {
            console.log(req.body);
            console.log(req.params);

            coll.findOne({ email: req.body.email, passwd: req.body.email },
                function(err, user) {
                    if (err) {
                        console.log("Impossible to access data");
                        return;
                    }

                    res.send(user);
                });
        });

        app.post('/user', function(req, res) {
            coll.findOne({ email: req.body.email }, function(err, user) {
                if (err) {
                    console.log("Impossible to access data");
                    return;
                }

                if (user)
                    res.send({exists: true})

                else {
                    coll.insert({
                        email: req.body.email,
                        passwd: req.body.passwd
                    });

                    res.send({exists: false})
                }
            })
        });
    });

});


// Server start.
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Well connected to %s, at port %s", host, port);
});
