import UserService from '../services/userService.js';

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.validateCredentials(email, password);
      
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Por ahora devolvemos el usuario, más adelante implementaremos tokens (JWT)
      res.json({ message: 'Login exitoso', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default UserController;
