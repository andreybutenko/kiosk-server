var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var accounts = require('./Controllers/accounts.js');
var data = require('./Controllers/data.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('kiosk'));

app.post('/api/login', function (req, res) {
    accounts.verifyAccount(req.body.user, req.body.pass, function(err, verified) {
        res.send({
            "err": err,
            "verified": verified
        })
    });
});

app.get('/api/get', function (req, res) {
    data.getData(function(err, data) {
        res.send({
            "err": err,
            "data": data
        })
    });
});

app.post('/api/update', function (req, res) {
    data.updateData(req.body.user, req.body.pass, req.body.data, function(err, saved) {
        res.send({
            "err": err,
            "saved": saved
        })
    })
});

app.listen(8080);
