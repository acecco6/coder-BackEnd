const express=require("express") 
const fs=require("fs") 

// Productos BD
const {ProductosBD} = require("./Config/ConnectDB")
const ProductoDBI=require("knex")(ProductosBD)
// Mensajes BD
const {MensajesBD}=require("./DB/ConnectMSG")
const MensajesBDI=require("knex")(MensajesBD)

const app=express()
const http=require("http").Server(app)
const io = require("socket.io")(http)



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
    ProductoDBI.select("id","nombre","precio","foto").from('item')
        .then(e=>{
            let productos=[]
            for (const product of e) {
                productos.push({Title:product["nombre"],Price:product["precio"],Thumbnail:product["foto"]})
            }
            socket.emit("items",productos)
        })
        .catch(()=>{
            ProductoDBI.destroy()
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
        
        ProductoDBI.insert({
            nombre:dato.Title,
            precio:dato.Price,
            foto:dato.Thumbnail}).into("item")
        .then(()=>{
            ProductoDBI.select("id","nombre","precio","foto").from('item')
            .then(e=>{
                let productos=[]
                for (const product of e) {
                    productos.push({Title:product["nombre"],Price:product["precio"],Thumbnail:product["foto"]})
                }
                io.sockets.emit("items",productos)
            })
        })
        .catch(()=>{
            ProductoDBI.destroy()
        })
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
    let productos=[]
    ProductoDBI.select("id","nombre","precio","foto").from('item')
        .then(e=>{
            // ProductoDBI.destroy()
            for (const product of e) {
                productos.push({Title:product["nombre"],Price:product["precio"],Thumbnail:product["foto"]})
            }
            if (productos.length>0) {
                res.send(productos)    
            }else{
                res.send({error:"no hay Productos"})
            }
            
        })
        .catch(()=>{
            ProductoDBI.destroy()
        })
})

api.get("/productos/:id",(req,res)=>{
    const {id}=req.params
    ProductoDBI('item').where('id',id)
    .then((e)=>{
        let productos=e
        if (productos.length!=0) {
            for (const product of e) {
            res.send({Title:product["nombre"],Price:product["precio"],Thumbnail:product["foto"]})
            } 
        }else{
            res.json({error:"Producto no Encontrado"})
        }
    })
})

api.post("/productos/guardar",(req,res)=>{
    let dato=req.body
    console.log(dato.Title)
    ProductoDBI.insert({nombre:dato.Title,precio:dato.Price,foto:dato.Thumbnail}).into("item")
        .then(()=>{
            console.log('Filas insertadas!');  
        })   
    res.redirect("/")
})

api.put("/productos/actualizar/:id",(req,res)=>{
    const {id}=req.params
    const {Title,Price,Thumbnail}=req.body
    ProductoDBI('item').where('id',id)
    .then((e)=>{
        let productos=e
        if (productos.length!=0) {
            ProductoDBI.from('item').where('id','=',id).update({nombre:Title,precio:Price,foto:Thumbnail})
            .then(() => {
                console.log('Filas actualizadas!')
            })
            .catch(e=>{
                console.log('Error en Update:', e);
                ProductoDBI.destroy();
            })
        res.json(req.body)
        
        }else{
            res.json({error:"Producto no Encontrado"})
        }
    })
    
})

api.delete("/productos/borrar/:id",(req,res)=>{
    let {id}=req.params
    ProductoDBI.from('item').where('id', '=', id).del()
    .then(() => {
        res.json({mensaje:"Borrado Exitoso"})
    })
    .catch(e=>{
        console.log('Error en Delete:', e);
        ProductoDBI.destroy();
    });
    
    
})


