import {Producto} from '../models/productos.js'
import {Productos} from '../models/productosMongoose.js'



const productos = []
let isAdmin = true /*false*/



//disponible para usuarios y administradores
const listarProductos = async (req, res) => {
    try {
        const { id } = req.query
	    if (id) return res.status(200).json(productos.find((p) => p.id == id))
        console.log('Productos listados')
        let productosListados = await Productos.find()
        console.log('Lista de productos:')
        for (let pr of productosListados){
            console.log(`${pr}`)
        }
	    return res.status(200).json(productos)
    } catch (err){
        res.status(500).json({message: "Error listing new post", error: err})
        console.log('Error en listar productos')
    }
	
}

//disponible para administradores
const agregarProductos = async (req, res) => {
    if (isAdmin){
        try {
            const {id, nombre, timestamp, descripcion, codigo, url, precio, stock} = req.body;
            const producto = new Producto (id, nombre, timestamp, descripcion, codigo, url, precio, stock)
            producto.id = productos.length + 1
            productos.push(producto)
            await Productos.insertMany(producto)
            console.log('Productos guardados en base de datos')
            return res.status(201).json(producto)
    
        } catch (err) {
            res.status(500).json({message: "Error creating new post", error: err})
            console.log('Error en agregar productos')
        }
        
    }else {
        return res.json({error: -1, descripcion: "ruta: '/productos/' método: POST no autorizada" })
    }
}
//disponible para administradores
const actualizarProductos = async (req, res) => {
    if (isAdmin){
        try {const { id } = req.params;
        const { nombre, timestamp, descripcion, codigo, url, precio, stock} = req.body
        const producto = productos.find((p) => p.id == id)
        
        if (!producto){
            return res.status(404).json({ msg: "No existe ese producto" })
        }
        (producto.nombre = nombre),
        (producto.descripcion = descripcion),
        (producto.codigo = codigo),
        (producto.url = url),
        (producto.precio = precio),
        (producto.stock = stock)

        console.log('Producto actualizado')
        await Productos.updateMany({nombre: nombre, descripcion: descripcion, codigo: codigo, url: url, precio: precio, stock: stock})
        res.status(200).json(producto)
        
    
        }catch (err){
            console.log('Error en actualizar productos')
            res.status(500).json({message: "Error updating post", error: err})
        } 
        
    }else {
        return res.json({error: -1, descripcion: "ruta: '/productos/:id' método: PUT no autorizada" })
    }
}
//disponible para administradores
const borrarProductos = async (req, res) => {
    if (isAdmin){
        try{
            const { id } = req.params
            const producto = productos.find((p) => p.id == id)
            if (!productos){
            return res.status(404).json({ msg: "Producto no encontrado" })
    
           }
           const index = productos.findIndex((p) => p.id == id)
           productos.splice(index, 1)
           console.log('Productos borrados')
           await Productos.deleteMany({id: id})
       
           res.status(200).end()
            
        } catch(err){
            console.log('Error en borrar productos')
            res.status(500).json({message: "Error deleting post", error: err})
        }
        
    }else{
        return res.json({error: -1, descripcion: "ruta: '/productos/:id' método: DELETE no autorizada" })
    } 
}

export {listarProductos, agregarProductos, actualizarProductos, borrarProductos} 