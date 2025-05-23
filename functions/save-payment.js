import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    databaseURL: "https://free-fire-3c219.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const handler = async (event, context) => {
    try {
        const paymentData = JSON.parse(event.body);
        await push(ref(db, 'payments'), {
            ...paymentData,
            timestamp: new Date()
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Dados salvos com sucesso!' })
        };
    } catch (error) {
        console.error('Erro ao salvar no Realtime Database:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Erro ao salvar dados: ${error.message}` })
        };
    }
};
