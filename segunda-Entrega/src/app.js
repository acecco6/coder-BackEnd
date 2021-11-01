import express from 'express';
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import productsRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlerMiddleware);

//  Route System
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

//Default
app.get('/', (req, res) => res.json({ message: "Default" }))

export default app;