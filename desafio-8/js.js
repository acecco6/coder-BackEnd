import express from "express"

const app=express()
const port=8080
var productos=[]
const server =app.listen(port,()=>{
    console.log(`Servidor ${server.address().port}`)
})
server.on("error",error=>console.log("Error en el Servidor",error))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/productos",(req,res)=>{
    if (productos.length > 0) {
        res.json(productos)
    }else{
        res.json({error:"No hay Productos cargados"})
    }
})

app.get("/api/productos/:id",(req,res)=>{
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

app.post("/api/productos/guardar",(req,res)=>{
    let body=req.body
    body.id=productos.length + 1
    productos.push(body)
    res.json(body)
})
