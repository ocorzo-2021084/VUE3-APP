import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyBEGXN0XkVuiqsd2Z-ofaPOl6Kmjxr3l-g",
    authDomain: "vue-3-98e29.firebaseapp.com",
    projectId: "vue-3-98e29",
    storageBucket: "vue-3-98e29.appspot.com",
    messagingSenderId: "377272855539",
    appId: "1:377272855539:web:8a6fe1a564d85222adc086"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
