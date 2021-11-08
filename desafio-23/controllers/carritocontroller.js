import {Carrito} from '../models/carrito.js'
import fs from 'fs'

const carrito = new Carrito()

const listarCarrito = (req, res) => {
    try{
        return res.status(200).json(carrito)
    } catch (err){
        console.log( err, 'Error en listar carrito')
    }
	
}

const listarProductosCarrito = (req, res) => {
    try{
        return res.json(carrito.productos)
    }catch (err){
        console.log(err, 'Error en listar productos de carrito')
    }
	
}

const agregarProducto = (req, res) => {
    try{
        const { body } = req;
        carrito.productos.push(body)
        fs.appendFileSync('./txt/carrito.txt', JSON.stringify(body), 'utf-8')
        return res.status(201).json(body)
    }catch (err){
        console.log(err, 'Error en agregar productos al carrito')
    }
	
}

const borrarProducto = (req, res) => {
    try{
        const { id } = req.params;
        const index = carrito.productos.findIndex((p) => p.id == id)
        const deleted = carrito.productos.splice(index, 1)
    
        return res.status(200).json(deleted)
    }catch(err){
        console.log(err, 'Error en borrar productos del carrito')
    }
}

export {listarCarrito, listarProductosCarrito, agregarProducto, borrarProducto}