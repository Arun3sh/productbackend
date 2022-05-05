import express, { request, response } from 'express';
import {
	addProducts,
	getAllProducts,
	getAllProductsLimit,
	getAllProductNameMaterial,
	deleteProductWithSamePrice,
} from '../productHelper.js';

const router = express.Router();

// To add products
router.post('/add-product', async (request, response) => {
	const data = request.body;
	const result = await addProducts(data);
	response.send(result);
});

// To Find all the information about each products
router.get('/', async (request, response) => {
	const filter = request.query;
	// To Find the product price which are between x to y
	if (filter.from && filter.to) {
		const query = { product_price: { $gte: +filter.from, $lte: +filter.to } };
		const result = await getAllProducts(query);
		response.send(result);
		return;
	}

	// To Find the product price which are not between x to y
	if (filter.not_from && filter.not_to) {
		const query = { product_price: { $not: { $gte: +filter.not_from, $lte: +filter.not_to } } };
		const result = await getAllProducts(query);
		response.send(result);
		return;
	}

	// To List the four product which are grater than x in price
	if (filter.greaterthan) {
		const query = { product_price: { $gt: +filter.greaterthan } };
		const result = await getAllProductsLimit(query);
		response.send(result);
		return;
	}

	// To Find the product name and product material of each products
	if (filter.name && filter.material) {
		const query = { projection: { product_name: 1, product_material: 1, _id: 0 } };
		const result = await getAllProductNameMaterial(query);
		response.send(result);
		return;
	}

	// To Find the product with a row id of x
	if (filter.id) {
		const query = { id: filter.id };
		const result = await getAllProducts(query);
		response.send(result);
		return;
	}

	// To Find all products which contain the value of "string" in product material
	if (filter.search_material) {
		const query = {
			product_material: { $regex: filter.search_material, $options: 'i' },
		};
		const result = await getAllProducts(query);
		response.send(result);
		return;
	}

	// To Find products which contain product color "string"  and product price x
	if (filter.color && filter.price) {
		const query = { product_color: filter.color, product_price: +filter.price };
		const result = await getAllProducts(query);
		response.send(result);
		return;
	}

	// To get all products
	const result = await getAllProducts(filter);
	response.send(result);
});

// To delete product where product price is same
router.delete('/delete-product', async (request, response) => {
	const filter = request.query;
	const query = { product_price: +filter.price };
	const result = await deleteProductWithSamePrice(query);
	result.deletedCount
		? response.send({ result: `Deleted products with the price ₹ ${filter.price}` })
		: response.send({ result: `No item at  ₹ ${filter.price}` });
});

export const ProductRouter = router;
