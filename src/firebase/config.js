// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_FIREBASE_SDK_CONFIG_API_KEY,
  authDomain: import.meta.env.VITE_REACT_FIREBASE_SDK_CONFIG_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_FIREBASE_SDK_CONFIG_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_FIREBASE_SDK_CONFIG_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .VITE_REACT_FIREBASE_SDK_CONFIG_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_FIREBASE_SDK_CONFIG_APP_ID,
  measurementId: import.meta.env.VITE_REACT_FIREBASE_SDK_CONFIG_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

// create new user
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// create new user
export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout user
export const logout = () => {
  return signOut(auth);
};

// getUserDetails
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unsubscribe;
  }, []);

  return currentUser;
};
