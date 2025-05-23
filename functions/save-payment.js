const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

exports.handler = async function(event, context) {
    try {
        const paymentData = JSON.parse(event.body);
        await addDoc(collection(db, 'payments'), {
            ...paymentData,
            timestamp: new Date()
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Dados salvos com sucesso!' })
        };
    } catch (error) {
        console.error('Erro ao salvar no Firestore:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao salvar dados: ' + error.message })
        };
    }
};
