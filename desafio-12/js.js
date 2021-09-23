const express=require("express") 
 

const app=express()
const http=require("http").Server(app)
const io = require("socket.io")(http)
const port=8080

// Declaracion de ruta api
const api=express.Router()
app.use("/api",api)

// Declaracion de ruta Static
app.use(express.static("./public"))
// lectura JSON de api
api.use(express.json());
api.use(express.urlencoded({extended: true}));

// productos array
var productos=[]
var id_producto=0

app.set('views', './views');
app.set('view engine', 'pug');

const server=app.listen(port,()=>{
    console.log(`Servidor ${server.address().port}`)
})
server.on("error",error=>console.log("Error en el Servidor",error))


http.listen(3030,()=>{
    console.log("Puerto 3030 Active")
})

// Declaracion Rutas

io.on("connection",(socket)=>{
    console.log("Usuario Conectado")
    socket.emit("items",productos)
    socket.on("item",(dato)=>{
        productos.push(dato)
        io.sockets.emit("items",productos)
    })
    
})


app.get("/productos/vista",(req,res)=>{
    if (productos.length==0) {
        res.render('index.pug', { item: "No hay productos" ,active:false});
    }else{
        res.render('index.pug', { item: productos,active:true});
    }
})

api.get("/productos",(req,res)=>{
    if (productos.length > 0) {
        res.json(productos)
    }else{
        res.json({error:"No hay Productos cargados"})
    }
})

api.get("/productos/:id",(req,res)=>{
    let item=[]
    for (const producto of productos) {
        if (producto.id == req.params.id) {item.push(producto)}
    }
    if (item.length>0) {
        res.json(item)
    }else{
        res.json({error:"Producto no Encontrado"})
    }
    
})

api.post("/productos/guardar",(req,res)=>{
    let body=req.body
    body.id=id_producto+1
    id_producto++
    productos.push(body)
    res.redirect("/")
})

api.put("/productos/actualizar/:id",(req,res)=>{
    let id=req.params.id
    let item=req.body
    for (const producto of productos) {
        if(id==producto.id){
            producto.Title=item.Title
            producto.Price=item.Price
            producto.Thumbnail=item.Thumbnail
        }
    }
    res.json(item)
})

api.delete("/productos/borrar/:id",(req,res)=>{
    let id=req.params.id
    let item=productos.find(items=>items.id==id)
    let items=productos.filter(e=>e.id != id)
    productos=items
    res.json(item)
})


