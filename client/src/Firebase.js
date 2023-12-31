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
  apiKey: "AIzaSyBMovCJbRyCJTxGIObJA2JkSF4_IqnZUrg",
  authDomain: "ideas2024.firebaseapp.com",
  projectId: "ideas2024",
  storageBucket: "ideas2024.appspot.com",
  messagingSenderId: "52540446276",
  appId: "1:52540446276:web:01bcb2b561591f85468e11",
  measurementId: "G-43DGC9BZ92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Export the services
export { db, auth, analytics, storage };