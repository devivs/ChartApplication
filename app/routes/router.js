var express = require('express');

// controller for products
var Linechart = require('../controllers/controller');

// Routes for API
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Time: ', Date.now());
    console.log('Something is happening.');
    next(); //go to next function
});

router.get('/', function(req, res) {
    res.json({
        message: ' Welcome to api'
    });
});

// Routes for our API
router.route('/linechart')

    // get all Products
    .get(Linechart.findAll);


module.exports = router;
