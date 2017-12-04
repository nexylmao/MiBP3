var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfesorSchema = new Schema({
        ime:
        {
            type: "String",
            required: true
        }, 
        prezime: {
            type: "String",
            required: true
        }, 
        predmeti: ["String"],
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
            }
        ]
    } , { collection: 'listaProfesora' } 
);

var profesori = mongoose.model('profesori', ProfesorSchema);
module.exports = profesori;