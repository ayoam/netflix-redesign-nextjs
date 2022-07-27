import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCiMIEc3aa3V04xhgBIZBcID3gE2GPKJXU",
  authDomain: "nextflix-clone-2f325.firebaseapp.com",
  projectId: "nextflix-clone-2f325",
  storageBucket: "nextflix-clone-2f325.appspot.com",
  messagingSenderId: "128388763024",
  appId: "1:128388763024:web:348ff73b446df56a08b715"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
export const auth = getAuth(app);
export { app,db };