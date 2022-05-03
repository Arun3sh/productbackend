import express, { response } from 'express';
import { addProducts, getAllProducts } from '../productHelper.js';

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
	if (filter.from & filter.to) {
		const query = { product_price: { $gte: +filter.from, $lte: +filter.to } };
		const result = await getAllProducts(query);
		response.send(result);
		return;
	}
	const result = await getAllProducts(filter);
	response.send(result);
});

//
// router.get('/')

export const ProductRouter = router;
