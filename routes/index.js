const express = require('express');
const router = express.Router();

/* GET Home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* GET About Me page. */
router.get('/about', (req, res, next) => {
  res.render('index', { title: 'About Me' });
});

/* GET Projects page. */
router.get('/projects', (req, res, next) => {
  res.render('index', { title: 'Projects' });
});

/* GET Services page. */
router.get('/services', (req, res, next) => {
  res.render('index', { title: 'Services' });
});

/* GET Contact page. */
router.get('/contact', (req, res, next) => {
  res.render('index', { title: 'Contact Me' });
});

module.exports = router;
