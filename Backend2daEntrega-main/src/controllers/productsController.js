import Product from '../models/Product.js';
import config from '../config/config.js';
import db from '../../server.js';

const productsController = {
    listProducts: (req, res, next) => {
        if (req.params.id != undefined) {
            db.findById('products', req.params.id)
                .then(prod => {
                    res.json(prod)
                })
                .catch(e => {
                    res.status(404)
                        .send(e, 'Producto no encontrado', 404);
                });
        } else {
            // console.log('THIS: ', db.find('products'))
            db.find('products')
                .then(prods => {
                    res.json(prods);
                    console.log(prods);
                })
        };
    },
    addProduct: (req, res, next) => {
        if (!config.isAdmin) {
            next({ code: 403, route: `${config.hostname}product/add`, method: "POST" });
        } else {
            let newProd = new Product();
            newProd = { ...newProd, ...req.body };
            console.log(newProd);
            db.create('products', newProd);
            res.status(200).json(newProd);
        }
    },
    updateProduct: (req, res, next) => {
        if (!config.isAdmin) {
            next({ code: 403, route: `${config.hostname}product/update/:id`, method: "PUT" });
        } else {
            const properties = [
                'id',
                'timestamp',
                'name',
                'description',
                'code',
                'image',
                'price',
                'stock',
            ];
            let items = {};
            for (const key in req.body) {
                if (properties.includes(key)) {
                    items[key] = req.body[key];
                }
            }
            try {
                db.update('products', req.params.id, items);
                res.status(200).json({ updated: req.params.id, ...items });
            }
            catch {
                res
                    .status(404)
                    .send('Producto no encontrado');
            }
        }
    },

    deleteProduct: (req, res, next) => {
        if (!config.isAdmin) {
            next({ code: 403, route: `${config.hostname}product/delete/:id`, method: "DELETE" });
        } else {
            db.remove('products', req.params.id);
            res.sendStatus(200).send(1);
        }
    },
}

export default productsController;