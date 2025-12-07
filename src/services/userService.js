import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import users from '../data/usersData.js';

class UserService {
    static async createUser(data) {
        const { username, email, password, role } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = users.length + 1;
        const newUser = new User({ id, username, email, password: hashedPassword, role });
        users.push(newUser);
        return newUser.toJSON();
    }

    static async getAllUsers() {
        return users.map(user => user.toJSON());
    }

    static async getUserById(id) {
        const user = users.find(user => user.id == id);
        return user ? user.toJSON() : null;
    }

    static async getUserByUsername(username) {
        const user = users.find(user => user.username === username);
        return user ? user.toJSON() : null;
    }

    static async getUserByEmail(email) {
        const user = users.find(user => user.email === email);
        return user ? user.toJSON() : null;
    }

    static async validateCredentials(email, password) {
        const user = users.find(user => user.email === email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user.toJSON() : null;
    }

    static async updateUser(id, data) {
        const userIndex = users.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) return null;

        const { username, email, password, role } = data;
        const currentUser = users[userIndex];

        if (username !== undefined) currentUser.username = username;
        if (email !== undefined) currentUser.email = email;
        if (role !== undefined) currentUser.role = role;
        if (password !== undefined) {
            currentUser.password = await bcrypt.hash(password, 10);
        }

        users[userIndex] = currentUser;
        return currentUser.toJSON();
    }

    static async deleteUser(id) {
        const userIndex = users.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) return null;

        const deletedUser = users[userIndex];
        users.splice(userIndex, 1);
        return deletedUser.toJSON();
    }
}

export default UserService;