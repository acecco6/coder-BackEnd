import express from 'express'

import carritoRouter from './routes/carritoroutes.js'
import productoRouter from './routes/productoroutes.js'
import mongoose from 'mongoose'

import { createServer } from 'http';
import { Server } from 'socket.io'
import util from 'util'
import {Mensajes} from './models/messagesMongoose.js'
import {normalize, schema} from 'normalizr'

const app = express(); 
const httpServer = createServer(app);
const io = new Server(httpServer)


const PORT = 8080

app.use(express.json())
app.use(express.static('./public'))


app.get("/", (req, res) => {
     res.sendFile('index.html')
})

app.use("/productos", productoRouter)
app.use("/carrito", carritoRouter)

mongoose.connect(
    'mongodb://localhost:27017/ecommerce',
    {useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
      if (err) {
        throw err
      } else {
        console.log("Conectado a la base de datos");
      }
    }
  )
  


let messages = []
let mensajes = {
    id: 'mensajes',
    author: {
        id: '1',
        nombre: 'nombre',
        apellido: 'apellido',
        edad: 'edad',
        alias: 'alias'
    },
    text: 'mensaje'
}


io.on('connection', (socket) => {
  console.log('Alguien se está conectando a Websocket')
  socket.emit('messages', messages)
  

  socket.on('nuevo',async (data)=>{
    messages.push( data)
    io.sockets.emit('messages',messages)
    console.log('Mensajes enviados a la base de datos')
    await Mensajes.insertMany(messages)
    const authorSchema = new schema.Entity('author')
    const messageSchema = new schema.Entity('mensajes', { author: [authorSchema]},)

    const normalizedHolding = normalize(messages, messageSchema)
    print(normalizedHolding)
    const longAntes = JSON.stringify(messages).length
    const longDespues = JSON.stringify(normalizedHolding).length
    console.log('Longitud antes de normalizar:', longAntes)
    console.log('Longitud después de normalizar:', longDespues)

    let mensajes = await Mensajes.find()
    console.log('Mensajes:')
    for (let m of mensajes ){
      console.log(`${m}`)
    }
})
})


function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}



const server = httpServer.listen(PORT, () =>{
    console.log(`Servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))