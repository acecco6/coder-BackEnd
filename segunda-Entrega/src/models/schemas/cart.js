import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    timestamp: Date,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
        },
    ],
});

export default mongoose.model('cart', cartSchema);
