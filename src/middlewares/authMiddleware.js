import { verifyToken } from '../utils/jwtUtils.js';

/**
 * Middleware para verificar token JWT en las peticiones
 * Extrae el token del header Authorization y verifica su validez
 */
const authMiddleware = (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No se proporcionó token de autenticación'
      });
    }

    // El formato esperado es: "Bearer <token>"
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        message: 'Formato de token inválido. Use: Bearer <token>'
      });
    }

    const token = parts[1];

    // Verificar y decodificar el token
    const decoded = verifyToken(token);

    // Agregar información del usuario al request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Token inválido o expirado'
    });
  }
};

export default authMiddleware;
