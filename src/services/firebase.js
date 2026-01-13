import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDQCGv57MQGtR_w1g7JQPIM9iIVgQZ8QnQ",
    authDomain: "saran-new-4d2bf.firebaseapp.com",
    projectId: "saran-new-4d2bf",
    storageBucket: "saran-new-4d2bf.firebasestorage.app",
    messagingSenderId: "204079455997",
    appId: "1:204079455997:web:2bb40b0b3d766f87c76894"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
