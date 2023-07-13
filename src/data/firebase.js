// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJtjTBOCuqNz1CliZH-OpIAvSIVruLDxA",
  authDomain: "flaviomuscu.firebaseapp.com",
  projectId: "flaviomuscu",
  storageBucket: "flaviomuscu.appspot.com",
  messagingSenderId: "146246469219",
  appId: "1:146246469219:web:43aa1e5fc7169b660a9a56",
  measurementId: "G-1QHL3FK6PE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db } 