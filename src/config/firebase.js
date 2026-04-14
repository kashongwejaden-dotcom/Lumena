import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL6uV4pHUCJV4ov17vSIQSoVJpVUBVGUs",
  authDomain: "lumenaa.firebaseapp.com",
  projectId: "lumenaa",
  storageBucket: "lumenaa.firebasestorage.app",
  messagingSenderId: "746683381861",
  appId: "1:746683381861:web:f49b69daa900b839c32e8c",
  measurementId: "G-DH08ZEWE6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
