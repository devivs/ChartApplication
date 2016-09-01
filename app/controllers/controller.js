// CRUD Operations
// Whole-script strict mode syntax
"use strict";

var LinechartDb = require('../models/model');
var request = require("request");

// Fetch data and store it to database on everyday
var fetchData = setInterval(function () {

    LinechartDb.remove({}, function (err) {
        var url = "https://api2.blockchain.info/charts/market-price?cors=true&timespan=all&format=json&lang=en";

        request({
            url: url,
            json: true
        }, function (error, response, body) {

            var data = {
                status: body.status,
                name: body.name,
                unit: body.unit,
                period: body.period,
                values: body.values
            };

            var chartData = new LinechartDb(data);
            // chartData.status = body.status;
            // chartData.name = body.name;
            // chartData.unit = body.unit;
            // chartData.period = body.period;
            // chartData.values = body.values;


            chartData.save(function (err, data) {
                if (err) {
                    throw err;
                } else {
                    console.log('saved!');
                }
            });

        });
    });
},  28800000 );


var linechart = {
    // Get all data in the collection
    findAll: function (req, res) {
        LinechartDb.find(function (err, linechart) {
            if (err)
                res.send(err);
            // else send the data
            res.json(linechart[0]);
        });
    }
};

// Export the object
module.exports = linechart;
