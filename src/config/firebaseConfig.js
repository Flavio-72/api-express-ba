import dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

let credential;

// Método 1: Usar archivo JSON (RECOMENDADO - MÁS FÁCIL)
if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
  try {
    const serviceAccountPath = join(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    credential = admin.credential.cert(serviceAccount);
    console.log('✅ Firebase: Credenciales cargadas desde archivo JSON');
  } catch (error) {
    console.error('❌ Error al cargar el archivo de credenciales:', error.message);
    console.error('💡 Verifica que el archivo existe en:', process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    process.exit(1);
  }
} 
// Método 2: Usar variables de entorno individuales
else if (process.env.FIREBASE_PROJECT_ID) {
  const serviceAccountConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
  };

  const requiredFields = ['projectId', 'privateKey', 'clientEmail'];
  const missingFields = requiredFields.filter(field => !serviceAccountConfig[field]);
  
  if (missingFields.length > 0) {
    console.error('❌ Error: Faltan variables de entorno de Firebase:', missingFields.join(', '));
    console.error('💡 Configura tu .env con: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL');
    process.exit(1);
  }

  credential = admin.credential.cert(serviceAccountConfig);
  console.log('✅ Firebase: Credenciales cargadas desde variables de entorno');
} 
else {
  console.error('❌ No se encontraron credenciales de Firebase');
  console.error('');
  console.error('📋 Opciones:');
  console.error('  1. Archivo JSON (recomendado): Define FIREBASE_SERVICE_ACCOUNT_PATH en .env');
  console.error('  2. Variables individuales: Define FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, etc.');
  process.exit(1);
}

// Inicializar Firebase Admin SDK
admin.initializeApp({ credential });

// Exportar la referencia a Firestore
const db = admin.firestore();

export { db, admin };
export default db;
