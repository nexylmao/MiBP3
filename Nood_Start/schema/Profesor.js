var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfesorSchema = new Schema({
        ime:
        {
            type: "String",
            required: true,
            unique: true
        }, 
        prezime: {
            type: "String",
            required: true,
            unique: true
        }, 
        predmeti: ["String"],
        ustanove: ["String"],
        srednjaOcena: "Number",
        komentari: [{
                username: "String",
                ocena:
                {
                    type: "Number",
                    pattern: '[1-5]{1}'
                },
                komentar:
                {
                    type: "String"
                },
                likes:"Number",
                dislikes:"Number"
            }
        ]
    } , { collection: 'listaProfesora' } 
);

ProfesorSchema.post('update', function(err, res, next){
    if(err) return next(err);
    var sumocena = 0;
    for(var i = 0; i < res.ocena.length; i++)
    {
        sumocena += res.ocena[i];
    }
    sumocena /= res.ocena.length;

    res.srednjaOcena = sumocena;
    
    next();
});

var profesori = mongoose.model('profesori', ProfesorSchema);
module.exports = profesori;