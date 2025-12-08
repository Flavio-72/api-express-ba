import express from 'express';
import UserController from '../controllers/userController.js';
import { validateCreateUser, validateUpdateUser } from '../middlewares/validateUser.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas públicas (no requieren autenticación)
router.post('/', validateCreateUser, UserController.createUser); // Registro
router.post('/login', UserController.login); // Login

// Rutas protegidas (requieren token JWT)
router.get('/', authMiddleware, UserController.getAllUsers);
router.get('/:id', authMiddleware, UserController.getUserById);
router.put('/:id', authMiddleware, validateUpdateUser, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);

export default router;
