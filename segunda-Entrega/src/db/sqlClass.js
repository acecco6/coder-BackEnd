import knex from 'knex';
import validator from 'validator';

export default function Sql(options) {
	this.connection = knex(options);

	this.initialize = async () => {
		try {
			await this.connection.schema.dropTableIfExists('products');
			await this.connection.schema.createTable('products', (table) => {
				table.string('id'),
					table.timestamp('timestamp'),
					table.string('name'),
					table.string('description'),
					table.string('code'),
					table.string('image'),
					table.decimal('price', 8, 2),
					table.integer('stock');
			});
			await this.connection.schema.dropTableIfExists('cart');
			await this.connection.schema.createTable('cart', (table) => {
				table.string('id'), table.json('productos');
			});
			return `Tablas inicializadas en ${this.connection.client.config.client}`;
		} catch (error) {
			await this.connection.destroy();
			throw new Error(error.message);
		}
	};
	this.create = async (tableName, items) => {
		try {
			await this.connection(tableName).insert(items);
			return await this.findById(tableName, items.id);
		} catch (error) {
			throw new Error(error.message);
		}
	};
	this.find = (tableName) => this.connection.from(tableName).select('*');
	this.findById = async (tableName, id) => {
		try {
			let found = await this.connection
				.from(tableName, id)
				.select('*')
				.where('id', '=', id);
			return found.length ? found : false;
		} catch (error) {
			throw new Error(error.message);
		}
	};
	this.update = async (tableName, id, items) => {
		try {
			let updated = await this.connection
				.from(tableName, id)
				.select('*')
				.where('id', '=', id)
				.update(items);
			if (updated) return await this.findById(tableName, id);
			return false;
		} catch (error) {
			throw new Error(error.message);
		}
	};

	this.remove = async (tableName, id) => {
		try {
			let removed = await this.connection
				.from(tableName, id)
				.select('*')
				.where('id', '=', id)
				.del();
			return removed || false;
		} catch (error) {
			throw new Error(error.message);
		}
	};
	this.validateId = (id) => validator.isUUID(id); // optional
	this.validateDataType = () => {}; // optional
}
