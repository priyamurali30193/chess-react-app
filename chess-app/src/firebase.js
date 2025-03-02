import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADITIz3LnJZbUNHpeRWSSJMt--OhQGx7M",
  authDomain: "dchess-68a2c.firebaseapp.com",
  projectId: "dchess-68a2c",
  storageBucket: "dchess-68a2c.firebasestorage.app",
  messagingSenderId: "805730948653",
  appId: "1:805730948653:web:ee0e38b4622aa7dd108aa4",
  measurementId: "G-8G7BX8DFQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Initialize auth

  



export { auth, app, signInWithEmailAndPassword, createUserWithEmailAndPassword };
