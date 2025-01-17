const mongoose = require('mongoose');

const userCollection = "users";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: "user"
    }
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;
