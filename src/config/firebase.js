// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWD8lEMLjws-9DPKfSsd9Lh7-Bz4qsKPE",
  authDomain: "ubetter-b120a.firebaseapp.com",
  databaseURL: "https://ubetter-b120a-default-rtdb.firebaseio.com",
  projectId: "ubetter-b120a",
  storageBucket: "ubetter-b120a.firebasestorage.app",
  messagingSenderId: "236249588686",
  appId: "1:236249588686:web:6de272bb0317ad837e019f",
  measurementId: "G-S13S7S7KSE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
