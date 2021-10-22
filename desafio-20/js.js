const express=require("express") 

const app=express()
const http=require("http").Server(app)
const io = require("socket.io")(http)

const {getProductos,insertProductos,deleteProductos,setProductos} = require("./Productos/ModelProducto")
// Mensajes BD
const {MensajesBD}=require("./DB/ConnectMSG")
const MensajesBDI=require("knex")(MensajesBD)


const port=process.env.PORT || 3030
// Declaracion de ruta api
const api=express.Router()
app.use("/api",api)

// Declaracion de ruta Static
app.use(express.static("./public"))

// lectura JSON de api
api.use(express.json());
api.use(express.urlencoded({extended: true}));


// Setear Views
app.set('views', './views');
app.set('view engine', 'pug');

http.listen(3030,()=>{
    console.log("Puerto 3030 Active")
})

// SocketIo Conexion
io.on("connection",(socket)=>{
    console.log("Usuario Conectado")
    getProductos().then(e=>{
        let productos=[]
            for (const product of e) {
                productos.push({Title:product["nombre"],Price:product["precio"],Thumbnail:product["foto"]})
            }
        socket.emit("items",productos)
    })
    MensajesBDI.from('mensaje').select("*")
    .then(e=>{
        let mensaje=[]
            for (const msg of e) {
                mensaje.push({idUsuario:msg["idUsuario"],nombre:msg["nombre"],mail:msg["mail"],text:msg["text"],date:msg["date"],hora:msg["hora"]})
            }
        socket.emit("returnMSG",mensaje)
    })
    .catch(e=>{
        console.log(e)
    })
    socket.on("item",(dato)=>{
        insertProductos(dato.Title,dato.Price,dato.Thumbnail).then( io.sockets.emit("items",productos))
    })
    
    socket.on("MSGDatos",(dato)=>{
        MensajesBDI.insert({
            idUsuario:dato.idUsuario,
            nombre:dato.nombre,
            mail:dato.mail,
            text:dato.text,
            date:dato.date,
            hora:dato.hora}).into("mensaje")
        .then(()=>{
            MensajesBDI.from('mensaje').select("*")
            .then(e=>{
                let mensaje=[]
                    for (const msg of e) {
                        mensaje.push({idUsuario:msg["idUsuario"],nombre:msg["nombre"],mail:msg["mail"],text:msg["text"],date:msg["date"],hora:msg["hora"]})
                    }
                io.sockets.emit("returnMSG",mensaje)
            })
            .catch(e=>{
                console.log(e)
            })
        })
        .catch(e=>console.log(e))
    })
})


api.get("/productos",(req,res)=>{
    getProductos().then(e=>{
        res.send(e)
    })
})

api.get("/productos/:id",(req,res)=>{
    const {id}=req.params
    getProductos(id).then(e=>{
        res.send(e)
    })
})

api.post("/productos/guardar",(req,res)=>{
    let dato=req.body
    // dato.Title,dato.Price,dato.Thumbnail
    insertProductos(dato.Title,dato.Price,dato.Thumbnail)
    res.send({mensaje:"Insertado"})
    
})

api.put("/productos/actualizar/:id",(req,res)=>{
    const {id}=req.params
    let dato=req.body
    setProductos(id,dato.Title,dato.Price,dato.Thumbnail).then(
        res.send({mensaje:"producto Aacutalizado"})
    )
})

api.delete("/productos/borrar/:id",(req,res)=>{
    let {id}=req.params
    deleteProductos(id)
    res.json({mensaje:"Borrado Exitoso"})
})





