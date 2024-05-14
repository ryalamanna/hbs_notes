const Note = require("../models/notes.models");
const asyncHandler = require("../utils/asyncHandler");

const getNotes = async () => {
    return await Note.find();
}

const getNotesById = async (id) => {
    return await Note.findById(id);
}

const addNotes = asyncHandler (
    async (req , res , next) => {
        let newNote = await Note.create({
            title : req.body.title,
            content : req.body.content,
            youtubeLinks : req.body.youtubeLinks,
            references : req.body.references,
            image : req.body.image
        })
        await newNote.save();
        res.send({
            message : 'successfully added'
        })
    }
)

const deleteNote = asyncHandler (
    async (req , res , next) => {
        let id = req.query.id;

        await Note.findByIdAndDelete(id);
        res.send({
            message : 'Deleted Successfully!'
        })
    }
)

const editNote = asyncHandler (
    async (req , res , next) => {
        console.log(req.body);
        let {id , title , content , youtubeLinks , references , image} = req.body;
        console.log(content);
        await Note.findByIdAndUpdate(id , {title , content , youtubeLinks , references , image });
        res.send({
            message : 'Update Successful'
        })
    }
)


module.exports = {getNotes , getNotesById , addNotes , deleteNote , editNote};