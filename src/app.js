import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});
app.use('/api/users', userRoutes);

// Middleware de manejo de errores (siempre al final)
app.use(errorHandler);

export default app;
