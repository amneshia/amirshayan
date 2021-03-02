const express = require('express');
const ProjectRepo = require('../repositories/projectrepo');
const router = express.Router();
const secured = require("../middleware/middlewares").secured;
const userController = require('../controllers/user');
const contactController = require('../controllers/contact');

router.get('/', (req, res, next) => {
  res.render('index', {});
});

router.get('/services', (req, res, next) => {
  res.render('services', {});
});

router.get('/projects', (req, res, next) => {
  const projects = new ProjectRepo().projects();
  res.render('projects', { projects: projects });
});

router.get('/about', (req, res, next) => {
  res.render('about', {});
});

router.get('/contact', (req, res, next) => {
  res.render('contact', {});
});

router.post('/contact', (req, res, next) => {
  console.log(JSON.stringify(req.body));
  res
  .status(201)
  .redirect(301, '/')
});

/* User CRUD routes */
router.get('/signup', (req, res, next) => {
  res.render("signup",{})
});

router.post('/signup', userController.create);

/* Authentication routes */
router.get('/login', (req, res, next) => {
  res.render('login', {redirectURL : req.query.redirectURL});
});

router.post('/login', userController.login);

router.post('/logout', userController.logout);

/*  "Contacts" CRUD routes */

router.get('/contacts',secured, contactController.index);

router.get('/contacts/new',secured, contactController.new);

router.post('/contacts',secured, contactController.create);

router.get('/contacts/:contactId', secured, contactController.edit);

router.put('/contacts/:contactId', secured, contactController.update);

router.delete('/contacts/:contactId', secured, contactController.delete);

module.exports = router;
