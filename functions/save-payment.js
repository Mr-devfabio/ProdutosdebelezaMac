const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAFSGtCNYaEccqUwX8VTEKOgmfBGqqW3pA",
    authDomain: "free-fire-3c219.firebaseapp.com",
    projectId: "free-fire-3c219",
    storageBucket: "free-fire-3c219.appspot.com",
    messagingSenderId: "1063922703234",
    appId: "1:1063922703234:web:s1qh928gafeudrfhi3d8j8lacdrgr4pn"
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
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao salvar dados' })
        };
    }
};
