import mongoose from "mongoose"

const messageCollection = 'mensajes'

const MessageSchema = mongoose.Schema({
    id: {type: String, require: true, max: 100},
    mail: {type: String, require: true},
    nombre: {type: String, require: true, max: 100},
    edad: {type: Number, require: true},
    alias: {type: String, require: true, max: 100},
    text: {type: String, require: true, max: 100},
})

  
export const Mensajes = mongoose.model(messageCollection, MessageSchema)

