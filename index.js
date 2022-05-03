import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import { ProductRouter } from './routes/Product.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
	const client = new MongoClient(MONGO_URL);
	await client.connect();
	console.log('Mongo connected');
	return client;
}

export const client = await createConnection();

app.get('/', (request, response) => {
	response.send('Welcome to product api');
});

app.use('/product', ProductRouter);

app.listen(PORT, () => console.log('Server started', PORT));
