var express = require('express');
const { getNotes, getNotesById } = require('../controller/notes.controllers');
var router = express.Router();

// Auth middleware
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/auth/signin');
  }
  next();
}

// Public landing page
router.get('/', function(req, res) {
  res.render('landing', { title: 'Welcome' });
});

router.get('/list', requireLogin, async function(req, res, next) {
  res.render('index', { data: await getNotes(req.session.userId) });
});

router.get('/add', requireLogin, function(req, res, next) {
  res.render('action' , {heading : 'Add Note'});
});

router.get('/edit/:id', requireLogin, async function(req, res, next) {
  res.render('action', { data: await getNotesById(req.params.id, req.session.userId), edit: true, heading: 'Edit Note' });
});

router.get('/view/:id', requireLogin, async function(req, res, next) {
  res.render('action', { data: await getNotesById(req.params.id, req.session.userId), view: true, heading: 'View Note' });
});

module.exports = router;
