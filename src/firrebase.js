// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcqKwK8dqcCt8Ugr_dq1gQJCiNAkOBuKQ",
  authDomain: "vite-new-bf65f.firebaseapp.com",
  projectId: "vite-new-bf65f",
  storageBucket: "vite-new-bf65f.firebasestorage.app",
  messagingSenderId: "731625432171",
  appId: "1:731625432171:web:e49d3a57e308fcf93efd2e"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);