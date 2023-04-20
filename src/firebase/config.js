// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLvDUqDTx9Xc02D3RTIKi9tw0i543yC_U",
  authDomain: "attools-3073f.firebaseapp.com",
  projectId: "attools-3073f",
  storageBucket: "attools-3073f.appspot.com",
  messagingSenderId: "694150189331",
  appId: "1:694150189331:web:1d9840d14df40f47644ae6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export {db};
