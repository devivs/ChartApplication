// Database
// Whole-script strict mode syntax

"use strict";

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var databaseName = "chart"; // Name of the Database

var collectionName = 'linechartsecond'; // Name of the collection

// Define Schema for mongodb
var linechartSchema = mongoose.Schema({

    status: String,
    name: String,
    unit: String,
    period: String,
    values: [
        {
            x: Number,
            y: Number
        }]
});

// Establish connection to mongodb
mongoose.connect('mongodb://localhost/' + databaseName, function (err) {
    if (err)
        throw err;
    else
        console.log('Database Connected');
});

// Export the module

module.exports = mongoose.model('Linechart', linechartSchema, collectionName);

