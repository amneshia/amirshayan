const express = require('express');
const router = express.Router();

/* GET Home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Home'
  });
});

/* GET Services page. */
router.get('/services', (req, res, next) => {
  res.render('services', { 
    title: 'Services'
  });
});

/* GET Projects page. */
router.get('/projects', (req, res, next) => {
  res.render('projects', { 
    title: 'Projects'
  });
});

/* GET About Me page. */
router.get('/about', (req, res, next) => {
  res.render('about', { 
    title: 'About Me'
  });
});

/* GET Contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', { 
    title: 'Contact Me' 
  });
});

module.exports = router;
