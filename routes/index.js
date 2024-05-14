var express = require('express');
const { getNotes, getNotesById } = require('../controller/notes.controllers');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index' , {data : await getNotes() });
});

router.get('/add', function(req, res, next) {
  res.render('action' , {heading : 'Add Note'});
});

router.get('/edit/:id', async function(req, res, next) {
  res.render('action' , {data : await getNotesById(req.params.id) , edit : true , heading : 'Edit Note'});
});

router.get('/view/:id', async function(req, res, next) {
  res.render('action' , {data : await getNotesById(req.params.id) , view : true , heading : 'View Note'} );
});

module.exports = router;
