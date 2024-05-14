const { default: mongoose } = require("mongoose");

const noteSchema = mongoose.Schema(
    {
        title : {
            type : String
        },
        content : {
            type : String
        },
        youtubeLinks : [{
            type: String
        }],
        references : [{
            type: String
        }],
        image : {
            type : String
        }
    },
    {
        timestamps : true
    }
);

const Note = mongoose.model('Note' , noteSchema);






module.exports = Note;