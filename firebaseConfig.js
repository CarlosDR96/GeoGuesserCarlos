// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDci45w9D4r85JmxIJMKoFAHyrjtNOv3JY",
  authDomain: "geocarlos-6d8dd.firebaseapp.com",
  projectId: "geocarlos-6d8dd",
  storageBucket: "geocarlos-6d8dd.appspot.com",
  messagingSenderId: "488440304851",
  appId: "1:488440304851:web:7d41426d54b0af29f1b026",
  measurementId: "G-VDKP12T2KN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Analytics if supported
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
  }
});

export { db };