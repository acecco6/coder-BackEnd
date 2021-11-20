import { Router } from "express"
import { listarProductos, agregarProductos, actualizarProductos, borrarProductos} from "../controllers/productocontroller.js"
const productoRouter = Router()

productoRouter
	.get("/", listarProductos)
	.post("/", agregarProductos)
	.put("/:id", actualizarProductos)
	.delete("/:id", borrarProductos)


export default productoRouter