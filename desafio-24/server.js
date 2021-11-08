import express from 'express'
import carritoRouter from './routes/carritoroutes.js'
import productoRouter from './routes/productoroutes.js'
import mongoose from 'mongoose'
import { createServer } from 'http';
import { Server } from 'socket.io'
import {Mensajes} from './models/messagesMongoose.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import path from "path"
const app = express(); 
const httpServer = createServer(app);
const io = new Server(httpServer)


const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(cookieParser())



const oneMinute = 6000
app.use(session({
    secret: "secret",
    saveUninitialized:true,
    cookie: { maxAge: oneMinute },
    resave: false 
}))

app.get("/", (req, res) => {
    let sessions = req.session.username
    if(sessions){
        res.write(`Bienvenido ${sessions}`)
    }else{
        res.sendFile(path.join(__dirname + '/index.html'))
    }
        
    
})


app.post('/login',(req,res) => {
    let sessions = req.session 
    sessions.username = req.body.username  
    if(!sessions.username ){
        res.send(`Bienvenido`);
    }
    else{
        res.send(`<h1>Bienvenido ${sessions.username}<h1><br> <a href=\'/logout'>click to logout</a>`);
    }
})



app.get('/logout',(req,res) => {
    let sessions = req.session.username
    req.session.destroy((err)=>{
        if(!err){
                res.send(`bye bye ${sessions}`)
          
        }
    })
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
io.on('connection', (socket) => {
  console.log('Alguien se está conectando a Websocket')
  socket.emit('messages', messages)
  

  socket.on('nuevo',async (data)=>{
    messages.push(data)
    io.sockets.emit('messages',messages)
    console.log('Mensajes enviados a la base de datos')
    await Mensajes.insertMany(messages)
    let mensajes = await Mensajes.find()
    console.log('Mensajes:')
    for (let m of mensajes ){
      console.log(`${m}`)
    }
})
})

const server = httpServer.listen(PORT, () =>{
    console.log(`Servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))