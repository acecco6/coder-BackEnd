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
import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
import MongoStore from 'connect-mongo'
import bodyParser from 'body-parser'
import bCrypt from 'bcrypt'
import routes from './controllers/passportcontroller.js'
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

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
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Burdiaktri:1234@cluster0.twfys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneMinute }
}))

app.use(passport.initialize());
app.use(passport.session());


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

passport.use('login', new LocalStrategy({
  passReqToCallback: true
},
 function(req, username, password, done) {
  User.findOne({'username': username}),
  function(err,user){
    if(err)
    return done(err)
    if (!user){
      console.log('User not found with username '+username)
      return done(null, false,
        console.log('message', 'User not found'))
        if(!isValidPassword(user, password)){
          console.log('Invalid password')
          return done(null, false,
            console.log('message', 'Invalid Password'))
        }
        return done(null, user)
    }
  }
}
))

const isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password)
}

passport.use('signup', new LocalStrategy({
  passReqToCallback : true
},
function(req, username, password, done){
  findOrCreateUser = function(){
    User.finOne({'username': username}, function(err,user){
      if(err){
        console.log('Error en SignUp: '+err)
        return done(err)
      }
      if (user){
        console.log('User already exists')
        return done(null, false,
          console.log('message', 'User already exists'))
      }else{
        const newUser = new User()
        newUser.username = username
        newUser.password = createHash(password)
        newUser.email = req.body.email
        newUser.firstName = req.body.firstName
        newUser.lastName = req.body.lastName

        newUser.save(function(err){
          if(err){
            console.log('Error in saving user: '+err)
            throw err
          }
          console.log('User Registration succesful')
          return done(null, newUser)
        })
      }
    })
  }
  process.nextTick(findOrCreateUser)
}))

const createHash = function (password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser((id, done)=>{
  let usuario = obtenerUsuarioId(usuarios, id)
  done(null, usuario)
})

app.get('/', routes.getRoot)

app.get('/login', routes.getLogin)
app.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), routes.postLogin)
app.get('/faillogin', routes.getFaillogin)

app.get('/signup', routes.getSignup)
app.post('/signup', passport.authenticate('signup', {failureRedirect: '/failsignup'}), routes.postSignup)
app.get('/failsignup', routes.getFailsignup)

app.get('/logout', routes.getLogout)

app.get('*', routes.failRoute)
