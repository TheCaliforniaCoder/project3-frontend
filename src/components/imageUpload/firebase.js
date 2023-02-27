// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // import the storage SDK
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB21IHdu03DDw50ekCsxnh8I0p2rQvxdVY",
  authDomain: "socialmediaapp-11f9b.firebaseapp.com",
  projectId: "socialmediaapp-11f9b",
  storageBucket: "socialmediaapp-11f9b.appspot.com",
  messagingSenderId: "657988102012",
  appId: "1:657988102012:web:d6ae14bb89d8a6f26de6f9",
  measurementId: "G-D2L6FDTGXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // initialize storage using the app

export default app;

