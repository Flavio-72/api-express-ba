import UserService from '../services/userService.js';

const VALID_ROLES = ['public', 'user', 'moderator', 'admin', 'superadmin'];

const validateRole = (role) => {
    return VALID_ROLES.includes(role) ? role : 'user';
};

const validateCreateUser = async (req, res, next) => {
    const { username, email, role } = req.body;

    if (!username || !email || !req.body.password) {
        return res.status(400).json({ message: 'Faltan campos obligatorios: username, email, password' });
    }

    if (!role) {
        req.body.role = 'user';
    } else {
        req.body.role = validateRole(role);
    }

    const existingUsername = await UserService.getUserByUsername(username);
    if (existingUsername) {
        return res.status(400).json({ message: 'El nombre de usuario ya existe' });
    }

    const existingEmail = await UserService.getUserByEmail(email);
    if (existingEmail) {
        return res.status(400).json({ message: 'El email ya existe' });
    }

    next();
};

const validateUpdateUser = async (req, res, next) => {
    const { role } = req.body;

    if (role !== undefined) {
        req.body.role = validateRole(role);
    }

    next();
};

export { validateCreateUser, validateUpdateUser };
