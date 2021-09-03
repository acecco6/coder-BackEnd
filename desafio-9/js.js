import express from "express"

// express datos
const app=express()
const port=8080



// Declaracion de ruta api
const api=express.Router()
app.use("/api",api)

// Declaracion de ruta Static
app.use(express.static("./public"))

// productos array
var productos=[]
var id_producto=0


const server =app.listen(port,()=>{
    console.log(`Servidor ${server.address().port}`)
})
server.on("error",error=>console.log("Error en el Servidor",error))

// lectura JSON de api
api.use(express.json());
api.use(express.urlencoded({extended: true}));

// Declaracion Rutas
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
    res.json(body)
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