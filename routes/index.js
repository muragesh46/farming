var express = require('express');
var router = express.Router();

// Language selection page
router.get('/', function(req, res, next) {
    res.render('index');
});

// Dashboard page
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard');
});

module.exports = router;