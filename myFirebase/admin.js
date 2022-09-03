const admin = require('firebase-admin');

// el archivo de firebase-keys NO DEBE SER PUBLICO
// para conseguirlo hay que ir a la conf del proyecto en firebase
// Luego a cuentas de servicio y luego a generar key
const serviceAccount = require('./firebase-keys.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nextjs-1-devter.firebaseio.com',
  });
} catch (e) {}

export const firestore = admin.firestore();
