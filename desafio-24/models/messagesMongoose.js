import mongoose from "mongoose"

const messageCollection = 'mensajes'

const MessageSchema = mongoose.Schema({
    mail: {type: String, require: true, max: 100},
    text: {type: String, require: true, max: 100}
})

  
export const Mensajes = mongoose.model(messageCollection, MessageSchema)


