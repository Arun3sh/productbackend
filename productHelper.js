import { client } from './index.js';

async function addProducts(data) {
	return await client.db('products').collection('product_list').insertMany(data);
}

async function getAllProducts(filter) {
	console.log(filter);
	return await client.db('products').collection('product_list').find(filter).toArray();
}

export { addProducts, getAllProducts };
