const express=require("express") 
const fs=require("fs") 

// Productos var
const {ProductosBD} = require("./Config/ConnectDB")
const knex=require("knex")(ProductosBD)



const app=express()
const http=require("http").Server(app)
const io = require("socket.io")(http)

var mensaje=[]
const backup = fs.readFileSync('./archivo.txt','utf-8');
let backupDatos=JSON.parse(backup)
if (backupDatos.length >0) {
    for (const it of backupDatos) {
        mensaje.push(it)  
    }
}


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

// Activar Servers
// const server=app.listen(port,()=>{
//     console.log(`Servidor ${server.address().port}`)
// })
// server.on("error",error=>console.log("Error en el Servidor",error))


http.listen(3030,()=>{
    console.log("Puerto 3030 Active")
})
// SocketIo Conexion
io.on("connection",(socket)=>{
    console.log("Usuario Conectado")
    knex.select("id","nombre","precio","foto").from('item')
        .then(e=>{
            let productos=[]
            for (const product of e) {
                productos.push({Title:product["nombre"],Price:product["precio"],Thumbnail:product["foto"]})
            }
            socket.emit("items",productos)
        })
        .catch(()=>{
            knex.destroy()
        })
    
    socket.emit("returnMSG",mensaje)

    socket.on("item",(dato)=>{
        
        knex.insert({nombre:dato.Title,precio:dato.Price,foto:dato.Thumbnail}).into("item")
        .then(()=>{
            // knex.destroy();
            knex.select("id","nombre","precio","foto").from('item')
            .then(e=>{
                let productos=[]
                for (const product of e) {
                    productos.push({Title:product["nombre"],Price:product["precio"],Thumbnail:product["foto"]})
                }
                io.sockets.emit("items",productos)
            })
        })
        .catch(()=>{
            knex.destroy()
        })
    })
    
    socket.on("MSGDatos",(dato)=>{
        mensaje.push(dato)
        fs.writeFileSync("./archivo.txt",JSON.stringify(mensaje),'utf-8')
        io.sockets.emit("returnMSG",mensaje)
    })
})


// Declaracion Rutas
// app.get("/productos/vista",(req,res)=>{
//     if (productos.length==0) {
//         res.render('index.pug', { item: "No hay productos" ,active:false});
//     }else{
//         res.render('index.pug', { item: productos,active:true});
//     }
// })

api.get("/productos",(req,res)=>{
    let productos=[]
    knex.select("id","nombre","precio","foto").from('item')
        .then(e=>{
            // knex.destroy()
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
            knex.destroy()
        })
})

api.get("/productos/:id",(req,res)=>{
    const {id}=req.params
    knex('item').where('id',id)
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
    knex.insert({nombre:dato.Title,precio:dato.Price,foto:dato.Thumbnail}).into("item")
        .then(()=>{
            console.log('Filas insertadas!');  
        })   
    res.redirect("/")
})

api.put("/productos/actualizar/:id",(req,res)=>{
    const {id}=req.params
    const {Title,Price,Thumbnail}=req.body
    knex('item').where('id',id)
    .then((e)=>{
        let productos=e
        if (productos.length!=0) {
            knex.from('item').where('id','=',id).update({nombre:Title,precio:Price,foto:Thumbnail})
            .then(() => {
                console.log('Filas actualizadas!')
            })
            .catch(e=>{
                console.log('Error en Update:', e);
                knex.destroy();
            })
        res.json(req.body)
        
        }else{
            res.json({error:"Producto no Encontrado"})
        }
    })
    
})

api.delete("/productos/borrar/:id",(req,res)=>{
    let {id}=req.params
    knex.from('item').where('id', '=', id).del()
    .then(() => {
        res.json({mensaje:"Borrado Exitoso"})
    })
    .catch(e=>{
        console.log('Error en Delete:', e);
        knex.destroy();
    });
    
    
})


