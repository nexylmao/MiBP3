var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/profesorDB');
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
    .get('/:id/komentari', function(req, res, next) {
        Profesori.findOne({
                "_id": req.params.id
        },{"_id":0,"komentari":1}).exec(function(err, entry) {
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
    .put('/:id/komentar', function(req, res, next)
    {
        Profesori.update(req.params.id, {$push: {komentari: req.body}}, function (err, x) {
            if(err) next(err);
            res.send(x);
        });
    })
    .put('/:id/komentar/:idkomentar/like', function(req, res, next){
        var prof = {_id : req.params.id, komentari: {$elemMatch: {_id:req.params.idkomentar}}};
        Profesori.update(prof, {$inc: {"komentari.$.likes": +1}}, function (err, x){
            if(err) next(err);
            res.send(x);
        });
    })
    .put('/:id/komentar/:idkomentar/dislike', function(req, res, next){
        var prof = {_id : req.params.id, komentari: {$elemMatch: {_id:req.params.idkomentar}}};
        Profesori.update(prof, {$inc: {"komentari.$.dislikes": +1}}, function (err, x){
            if(err) next(err);
            res.send(x);
        });
    })
    .delete('/:id', function(req, res, next){
        Profesori.findOneAndRemove({
            "_id": req.params.id
        }, function(err, successIndicator) {
            if(err) next(err);
            res.json(successIndicator);
        });
    })
    .delete('/:id/komentar/:idkomentar', function (req, res, next) {
        var prof = {_id : req.params.id, komentari: {$elemMatch: {_id:req.params.idkomentar}}};
        Profesori.update(prof, {$pull: {komentari: {_id:req.params.idkomentar}}}, function(err, x){
            if(err) next(err);
            res.send(x);
        });
    });

app.use('/API/Profesori', ruter);

app.use(function(err, req, res, next){
    var msg = err.message;
    var error = err.error || err;
    var status = err.status || 500;

    res.status(status).json({
        message: msg,
        error: error
    });
});

app.listen(port);
console.log('Server radi na portu ' + port);
