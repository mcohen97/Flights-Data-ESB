const express = require('express');
const DataProcessor = require('./flight-data-receiver');

const router = express.Router();
dataProcessor = new DataProcessor();

router.post('/publish', (req,res) => dataProcessor.publish(req,res));

module.exports = {router};