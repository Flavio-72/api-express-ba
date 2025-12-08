import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use(errorHandler);

export default app;
