const mongoose = require("mongoose");
require('mongoose-type-email');

const Schema = mongoose.Schema;

const messagesCollection = 'mensajes';

const messageSchema = new Schema({
    email: { type: mongoose.SchemaTypes.Email, required: true },
    date: { type: Date, required: true },
    msg: { type: String, required: true, max: [400, "Max length is 400 characters"] },
});

module.exports = mongoose.model(messagesCollection, messageSchema);

