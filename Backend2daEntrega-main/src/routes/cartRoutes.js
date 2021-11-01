import express from 'express';
const cartRouter = express.Router();
import cartController from '../controllers/cartController.js';

cartRouter.get('/', cartController.cart);
cartRouter.get('/:id', cartController.listItems);
cartRouter.post('/add/:prod_id', cartController.addItem);
cartRouter.delete('/delete/:id', cartController.deleteItem);

export default cartRouter;