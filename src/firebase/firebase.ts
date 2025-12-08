import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQP962eaqxmlxt6J-QicegjPH08DHFE3c",
  authDomain: "skmovie-46af4.firebaseapp.com",
  projectId: "skmovie-46af4",
  storageBucket: "skmovie-46af4.firebasestorage.app",
  messagingSenderId: "167072317620",
  appId: "1:167072317620:web:643d60d5a501b3c74297e1",
  measurementId: "G-YESBQRSPDG",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
