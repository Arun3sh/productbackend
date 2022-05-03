import { client } from './index.js';

async function addProducts(data) {
	return await client.db('products').collection('product_list').insertMany(data);
}

async function getAllProducts(filter) {
	return await client.db('products').collection('product_list').find(filter).toArray();
}

async function getAllProductsLimit(filter) {
	return await client.db('products').collection('product_list').find(filter).limit(4).toArray();
}

async function getAllProductNameMaterial(filter) {
	return await client.db('products').collection('product_list').find({}, filter).toArray();
}

async function deleteProductWithSamePrice(filter) {
	return await client.db('products').collection('product_list').deleteMany(filter);
}

export {
	addProducts,
	getAllProducts,
	getAllProductsLimit,
	getAllProductNameMaterial,
	deleteProductWithSamePrice,
};
