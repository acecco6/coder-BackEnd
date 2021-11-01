import mongoose from "mongoose";
import Product from '../models/schemas/products.js';
import Cart from '../models/schemas/cart.js';

export default function MongoDB(url, options) {
    this.connection = mongoose;
    this.initialize = async () => await mongoose.connect(url, options);

    this.find = (collection) => {
        let Collection = collection === 'products' ? Product : Cart;
        return Collection.find();
    }

    this.findById = (collection, id) => {
        let Collection = collection === 'products' ? Product : Cart;
        return Collection.findById({ id });
    }

    this.create = (collection, items) => {
        let name = items.name;
        let Collection = collection === 'products' ? Product : Cart;
        if (collection === 'products') {
            Collection.exists({ name })
                .then(exists => {
                    console.log('Exists: ', exists)
                    if (exists) {
                        console.log('El producto ya existe. ', e)
                    } else {
                        return new Collection(items).save();
                    }
                })
                .catch(e => console.log(e));
        }
    }

    this.update = (collection, id, items) => {
        let Collection = collection === 'products' ? Product : Cart;

        if (mongoose.Types.ObjectId.isValid(id)) {
            Collection.findByIdAndUpdate(id, items).then(updated => {
                if (updated) return this.findById(collection, id);
                return false;
            }).catch(e => console.log(e));
        } else {
            return 'No se pudo encontrar ID.'
        }
    };

    this.remove = (collection, id) => {
        let Collection = collection === 'products' ? Product : Cart;

        if (mongoose.Types.ObjectId.isValid(id)) {
            Collection.findByIdAndDelete(id).then(deleted => {
                if (deleted) return 1;
                return false;
            }).catch(e => console.log(e));
        } else {
            return 'No valid ID.'
        }
    };
};

