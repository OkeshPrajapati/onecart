// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBAE_APIKEY ,
  authDomain: "loginrcstore.firebaseapp.com",
  projectId: "loginrcstore",
  storageBucket: "loginrcstore.firebasestorage.app",
  messagingSenderId: "28925417361",
  appId: "1:28925417361:web:0721dfb1425d3aaac7ac30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}