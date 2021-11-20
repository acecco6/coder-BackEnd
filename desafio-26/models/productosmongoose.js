import mongoose from "mongoose"
const productCollection = 'productos'

const ProductSchema = mongoose.Schema({
    nombre: {type: String, require: true, max: 100}, 
    timestamp: {type: Number}, 
    descripcion: {type: String, require: true, max: 100}, 
    codigo: {type: Number},
    url: {type: String, require: true, max: 100}, 
    precio: {type: Number,require: true, max: 100},
    stock: {type: Number, require: true, max: 100}
})

export const Productos = mongoose.model(productCollection, ProductSchema)