// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO:  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRuOPAlUI9cITYW1p11kP_-NYstf6l6A8",
  authDomain: "credismart-juandiegocalle.firebaseapp.com",
  projectId: "credismart-juandiegocalle",
  storageBucket: "credismart-juandiegocalle.firebasestorage.app",
  messagingSenderId: "554279263922",
  appId: "1:554279263922:web:f4d0c741db12cdf99573ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);