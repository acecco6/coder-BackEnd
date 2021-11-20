import { Router } from "express"
import {listarCarrito, listarProductosCarrito, agregarProducto, borrarProducto} from '../controllers/carritocontroller.js'

const carritoRouter = Router()

carritoRouter
	.get("/", listarCarrito)
	.get("/productos", listarProductosCarrito)
	.post("/productos", agregarProducto)
	.delete("/productos/:id", borrarProducto)


export default carritoRouter