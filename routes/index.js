const express = require('express');
const ProjectRepo = require('../repositories/projectrepo');

const router = express.Router();

/* GET Home page. */
router.get('/', (req, res, next) => {
  res.render('index', {});
});

/* GET Services page. */
router.get('/services', (req, res, next) => {
  res.render('services', {});
});

/* GET Projects page. */
router.get('/projects', (req, res, next) => {
  const projects = new ProjectRepo().projects();
  res.render('projects', { projects: projects });
});

/* GET About Me page. */
router.get('/about', (req, res, next) => {
  res.render('about', {});
});

/* GET Contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', {});
});

module.exports = router;
