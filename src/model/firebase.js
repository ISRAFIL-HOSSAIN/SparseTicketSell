import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsBpwnlPqFOfZ9ZNDVaDcxiHw0AmHGF58",
  authDomain: "ticketsystem-cacc6.firebaseapp.com",
  projectId: "ticketsystem-cacc6",
  storageBucket: "ticketsystem-cacc6.appspot.com",
  messagingSenderId: "842302628101",
  appId: "1:842302628101:web:1a17f2dc18a3233dff176c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth(); 