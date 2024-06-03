const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
        lowercase: true, // Converts email to lowercase before saving
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
