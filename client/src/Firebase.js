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
  apiKey: "AIzaSyCjAetVOgYMAOTCXyE_WB6iU4o-9hUYF3A",
  authDomain: "tree-hops.firebaseapp.com",
  projectId: "tree-hops",
  storageBucket: "tree-hops.appspot.com",
  messagingSenderId: "112062256175",
  appId: "1:112062256175:web:eda59514f5903d8814e2da",
  measurementId: "G-1T27W9B3QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Export the services
export { db, auth, analytics, storage };