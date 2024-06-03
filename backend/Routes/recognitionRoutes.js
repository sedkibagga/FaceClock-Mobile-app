const express = require('express');
const router = express.Router();
const recognitionController = require('../Controllers/recognitionController');

// POST route to save recognized name
router.post('/recognized_names', recognitionController.saveRecognizedName);

// GET route to retrieve all recognized names
router.get('/recognized_names', recognitionController.getAllRecognizedNames);

// DELETE route to delete recognized name by recognized_name
router.delete('/recognized_names/:name', recognitionController.deleteRecognizedName);

// GET route to retrieve a recognized name by recognized_name
router.get('/recognized_names/:name', recognitionController.getRecognizedNameByName);

module.exports = router;
