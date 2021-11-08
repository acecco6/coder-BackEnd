import { Router } from "express"
import { listarProductos, agregarProductos, actualizarProductos, borrarProductos, getProductos} from "../controllers/productocontroller.js"
const productoRouter = Router()

productoRouter
	.get("/", listarProductos)
	.get("/vista-test", getProductos)
	.post("/", agregarProductos)
	.put("/:id", actualizarProductos)
	.delete("/:id", borrarProductos)


export default productoRouter