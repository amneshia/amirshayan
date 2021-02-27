const express = require('express');
const ProjectRepo = require('../repositories/projectrepo');

const router = express.Router();

const userController = require('../controllers/user.controller');
const contactController = require('../controllers/contact.controller');

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

router.get('/user/{userId}', contactController.index);

/* User login route */
router.get('/login', (req, res, next) => {
  res.render('login', {});
});

router.post('/login', (req, res, next) => userController.login);

//
//  "Contacts" CRUD routes
//

router.get('/contacts/{contactId}', (req, res, next) => {
  
});

router.put('/contacts/{contactId}', (req, res, next) => {
  
});

router.delete('/contacts/{contactId}', (req, res, next) => {
  
});

module.exports = router;
