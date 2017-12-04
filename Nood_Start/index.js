var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
const port = 3000;
var Profesori = require('./schema/Profesor');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

var ruter = express.Router();
ruter
    .get('/:id', function(req, res, next) {
    Profesori.findOne({
            "_id": req.params.id
    }).exec(function(err, entry) {
        if(err) next(err);
        res.json(entry);
    });
    })
    .get('/', function(req, res) {
        Profesori.find({}, function(err, data, next){
            res.json(data);
        });
    })
    .post('/', function(req, res, next){
        Profesori.create(req.body, function(err, entry) {
            if (err) next(err);
            res.json(entry);
        });
    })
    .put('/:id', function(req, res, next) {
        Profesori.findOneAndUpdate({
            "_id": req.params.id
        }, new Profesori(req.body), function(err, Profesori){
            if(err) next(err);
            res.json(Profesori);
        });
    })
    .delete('/:id', function(req, res, next){
        Profesori.findOneAndRemove({
            "_id": req.params.id
        }, function(err, movie, successIndicator) {
            if(err) next(err);
            res.json(successIndicator);
        });
    });

app.use('/API/Profesori', ruter);

app.use(function(err, req, res, next){
    var msg = err.message;
    var error = err.error || err;r
    var status = err.status || 500;

    res.status(status).json({
        message: msg,
        error: error
    });
});

app.listen(port);
console.log('Server radi na portu ' + port);
