import express from 'express';
const productsRouter = express.Router();
import productsController from "../controllers/productsController.js";

productsRouter.get('/:id?', productsController.listProducts);
productsRouter.post('/add', productsController.addProduct);
productsRouter.put('/update/:id', productsController.updateProduct);
productsRouter.delete('/delete/:id', productsController.deleteProduct);

export default productsRouter;