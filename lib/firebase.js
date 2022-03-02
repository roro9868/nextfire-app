// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAlIP2VStKX5MQa9NQ5UZ-EAo7Bq0Gqe3M",
    authDomain: "nextfire-136be.firebaseapp.com",
    projectId: "nextfire-136be",
    storageBucket: "nextfire-136be.appspot.com",
    messagingSenderId: "1030345634831",
    appId: "1:1030345634831:web:776834b5126ddaede61f7a",
    measurementId: "G-Q9L14EN6XL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth && firestore with the 'firebaseApp' property
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export default app;