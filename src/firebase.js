import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAKTfdLUVrkWApWbdEDCq8lj1HigMx898Y",
    authDomain: "mongol-code-academy.firebaseapp.com",
    projectId: "mongol-code-academy",
    storageBucket: "mongol-code-academy.firebasestorage.app",
    messagingSenderId: "214591077355",
    appId: "1:214591077355:web:ec6afd6793dfdf4fcd37ae",
    measurementId: "G-8ZY7XCEHBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);