// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHECGugSqgVfDTlJSbE_4n0J11QIzdPrs",
  authDomain: "myinuclub.firebaseapp.com",
  projectId: "myinuclub",
  storageBucket: "myinuclub.appspot.com",
  messagingSenderId: "397220036763",
  appId: "1:397220036763:web:e31bbe28aedace2448c63e",
  measurementId: "G-KHM28BFQGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Export the services
export { db, auth, analytics, storage };