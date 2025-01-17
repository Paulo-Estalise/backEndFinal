const mongoose = require('mongoose');

const messagesCollection = "messages";

const messageSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    message: String
});

const messageModel = mongoose.model(messagesCollection, messageSchema);

module.exports = messageModel;
