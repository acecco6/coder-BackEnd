import Cart from '../models/Cart.js';

const cart = new Cart();

const cartController = {
    cart: (req, res) => res.status(200).json(cart),
    listItems: (req, res) => res.json(cart.products),
    addItem: (req, res) => {
        cart.products.push(req.params);
        return res.json(cart);
    },
    deleteItem: (req, res) => {
        cart = cart.products.filter(prod => prod.prod_id !== req.params.id)
        res.json(cart);
    },
}

export default cartController;