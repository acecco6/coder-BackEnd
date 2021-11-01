import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
	},
	description: String,
	code: String,
	image: String,
	price: String,
	stock: String,
	timestamp: Date,
});

export default mongoose.model('products', ProductSchema);
