import UserService from '../services/userService.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { generateToken } from '../utils/jwtUtils.js';

class UserController {
  static getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserService.getAllUsers();
    res.json(users);
  });

  static getUserById = asyncHandler(async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  });

  static createUser = asyncHandler(async (req, res) => {
    const newUser = await UserService.createUser(req.body);

    const token = generateToken(newUser.id, newUser.email, newUser.role);
    
    res.status(201).json({ 
        success: true,
        message: 'Registro exitoso',
        token,
        user: newUser 
    });
   });

  static updateUser = asyncHandler(async (req, res) => {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(updatedUser);
  });

  static deleteUser = asyncHandler(async (req, res) => {
    const deletedUser = await UserService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });

  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserService.validateCredentials(email, password);
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciales inválidas' 
      });
    }

    // Generar token JWT
    const token = generateToken(user.id, user.email, user.role);

    res.json({ 
      success: true,
      message: 'Login exitoso',
      token,
      user 
    });
  });
}

export default UserController;
