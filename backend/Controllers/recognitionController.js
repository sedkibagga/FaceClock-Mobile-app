const Recognition = require('../Models/recognitionModel');

// Function to save recognized names to MongoDB
exports.saveRecognizedName = async (req, res) => {
  const { name } = req.body;
  
  try {
    const newRecognition = new Recognition({
      recognized_name: name
    });

    const savedRecognition = await newRecognition.save();
    res.status(201).json(savedRecognition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to retrieve all recognized names from MongoDB
exports.getAllRecognizedNames = async (req, res) => {
  try {
    const recognitions = await Recognition.find();
    res.status(200).json(recognitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a recognized name by recognized_name
exports.deleteRecognizedName = async (req, res) => {
  const { name } = req.params;

  try {
    const deletedRecognition = await Recognition.deleteOne({ recognized_name: name });
    if (deletedRecognition.deletedCount === 0) {
      return res.status(404).json({ message: 'Recognition not found' });
    }
    res.status(200).json({ message: 'Recognition deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Function to get a recognized name by recognized_name
exports.getRecognizedNameByName = async (req, res) => {
  const { name } = req.params;

  try {
    const recognition = await Recognition.findOne({ recognized_name: name });

    if (!recognition) {
      return res.status(404).json({ message: 'Recognition not found' });
    }

    res.status(200).json(recognition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
