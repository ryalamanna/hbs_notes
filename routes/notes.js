var express = require('express');
const { getNotes, addNotes, deleteNote, editNote } = require('../controller/notes.controllers');
const asyncHandler = require('../utils/asyncHandler');
var router = express.Router();

router.get('/', asyncHandler(
    async (req, res , next) => {
        res.send(await getNotes());
    }
));

router.post('/', addNotes);

router.delete('/', deleteNote);

router.put('/', editNote);

module.exports = router;
