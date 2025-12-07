import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import db from '../config/firebaseConfig.js';

const usersCollection = db.collection('users');

class UserService {
    static async createUser(data) {
        const { username, email, password, role } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUserData = {
            username,
            email,
            password: hashedPassword,
            role: role || 'user',
            createdAt: new Date().toISOString()
        };
        
        const docRef = await usersCollection.add(newUserData);
        const newUser = new User({ id: docRef.id, ...newUserData });
        return newUser.toJSON();
    }

    static async getAllUsers() {
        const snapshot = await usersCollection.get();
        const users = [];
        snapshot.forEach(doc => {
            const user = new User({ id: doc.id, ...doc.data() });
            users.push(user.toJSON());
        });
        return users;
    }

    static async getUserById(id) {
        const doc = await usersCollection.doc(id).get();
        if (!doc.exists) return null;
        
        const user = new User({ id: doc.id, ...doc.data() });
        return user.toJSON();
    }

    static async getUserByUsername(username) {
        const snapshot = await usersCollection.where('username', '==', username).get();
        if (snapshot.empty) return null;
        
        const doc = snapshot.docs[0];
        const user = new User({ id: doc.id, ...doc.data() });
        return user.toJSON();
    }

    static async getUserByEmail(email) {
        const snapshot = await usersCollection.where('email', '==', email).get();
        if (snapshot.empty) return null;
        
        const doc = snapshot.docs[0];
        const user = new User({ id: doc.id, ...doc.data() });
        return user.toJSON();
    }

    static async validateCredentials(email, password) {
        const snapshot = await usersCollection.where('email', '==', email).get();
        if (snapshot.empty) return null;
        
        const doc = snapshot.docs[0];
        const userData = doc.data();
        
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) return null;
        
        const user = new User({ id: doc.id, ...userData });
        return user.toJSON();
    }

    static async updateUser(id, data) {
        const docRef = usersCollection.doc(id);
        const doc = await docRef.get();
        
        if (!doc.exists) return null;

        const updateData = {};
        const { username, email, password, role } = data;

        if (username !== undefined) updateData.username = username;
        if (email !== undefined) updateData.email = email;
        if (role !== undefined) updateData.role = role;
        if (password !== undefined) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        updateData.updatedAt = new Date().toISOString();

        await docRef.update(updateData);
        
        const updatedDoc = await docRef.get();
        const user = new User({ id: updatedDoc.id, ...updatedDoc.data() });
        return user.toJSON();
    }

    static async deleteUser(id) {
        const docRef = usersCollection.doc(id);
        const doc = await docRef.get();
        
        if (!doc.exists) return null;

        const user = new User({ id: doc.id, ...doc.data() });
        await docRef.delete();
        
        return user.toJSON();
    }
}

export default UserService;