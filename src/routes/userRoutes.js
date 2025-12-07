import express from 'express';
import UserController from '../controllers/userController.js';
import { validateCreateUser, validateUpdateUser } from '../middlewares/validateUser.js';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', validateCreateUser, UserController.createUser);
router.put('/:id', validateUpdateUser, UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/login', UserController.login);

export default router;
