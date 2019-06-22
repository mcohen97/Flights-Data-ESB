const express = require('express');
const DataProcessor = require('./data-process');

const router = express.Router();
dataProcessor = new DataProcessor();

router.post('/publish', (req,res) => dataProcessor.publish(req,res));

module.exports = {router};