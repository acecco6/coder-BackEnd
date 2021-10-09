
const express=require("express") 
const app=express()
// Puerto
const port=process.env.PORT || 8080

//var
let Carrito=[]
let Productos=[]
let idCarrito=0
let idProducto=0 

function GetDate() {
    let date=new Date()
    let fecha=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+"//"+date.getHours()+":"+(date.getMinutes()<10?'0':'') + date.getMinutes() +":"+date.getSeconds()
    return fecha
}


// Login
let Administrador=true


// Declaracion de rutas agrupadas
const routerProducto=express.Router()
const routerCarrito=express.Router()

app.use("/productos",routerProducto)
app.use("/carrito",routerCarrito)


// lectura JSON
routerProducto.use(express.json());
routerProducto.use(express.urlencoded({extended: true}))
routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({extended: true}))

const server=app.listen(port,()=>{
    console.log(`Servidor ${server.address().port}`)
})
server.on("error",error=>console.log("Error en el Servidor",error))


// Rutas Productos

routerProducto.get("/",(req,res)=>{
    res.json(Productos)
})

// Listar Productos
routerProducto.get("/listar/:id",(req,res)=>{
    let producto=Productos.find(e=>e.id==req.params.id)
    res.send(producto)
})

// Agregar Productos
routerProducto.post("/agregar",(req,res)=>{
    if (Administrador) {
        idProducto++
        let id=idProducto
        let producto=req.body
        producto.timestamp=GetDate()
        producto.id=id
        Productos.push(producto)
        res.send(producto)  
        
    }else{
        res.send({error:-1,descripcion:"ruta '/productos/agregar' metodo 'access' error  "})
    }
})

// Actualizar Productos
routerProducto.put("/actualizar/:id",(req,res)=>{
    if (Administrador) {
        for (const producto of Productos) {
            if (producto.id==req.params.id) {
                producto.timestamp=GetDate()
                producto.nombre=req.body.nombre
                producto.descripcion=req.body.descripcion
                producto.codigo=req.body.codigo
                producto.foto=req.body.foto
                producto.precio=req.body.precio
                producto.stock=req.body.stock
                res.send(producto)
            }
        }
    }else{
        res.send({error:-1,descripcion:"ruta '/actualizar/:id' metodo 'access' error  "})
    }
})

// Borrar Productos
routerProducto.delete("/borrar/:id",(req,res)=>{
    if (Administrador) {
        Productos=Productos.filter(e=>e.id != req.params.id)    
        res.send(Productos)
    }else{
        res.send({error:-1,descripcion:"ruta '/borrar/:id' metodo 'access' error"})
    }

})



// Rutas Carritos
// Listar Productos Carrito
routerCarrito.get("/listar/:id",(req,res)=>{
    if (Carrito.length>0) {
        let producto=Carrito.filter(e=>e.id==req.params.id)
        res.send(producto)   
    }else{
        res.send("No hay Producto en el Carrito")
    }
})

// Agregar Productos Carrito
routerCarrito.post("/agregar/:id_producto",(req,res)=>{
    idCarrito++
    for (const producto of Productos) {
        if (producto.id==req.params.id_producto) {
            let item={id:idCarrito,timestamp:GetDate(),producto:producto}
            Carrito.push(item)
            res.send(Carrito)
        }
    }
})


// Borrar Productos Carrito
routerCarrito.delete("/borrar/:id",(req,res)=>{
    Carrito=Carrito.filter(e=>e.id !=req.params.id)
    res.send(Carrito)
})
