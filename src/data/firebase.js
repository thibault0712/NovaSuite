// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDZFtnvpl_-4LLeIqjnkQ3tLtc5c9CeNo",
  authDomain: "novasuite.firebaseapp.com",
  projectId: "novasuite",
  storageBucket: "novasuite.appspot.com",
  messagingSenderId: "1655999460",
  appId: "1:1655999460:web:9d261fac5a60de3f5fd5f1",
  measurementId: "G-9N9JRTY0RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db } 