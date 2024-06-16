// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlVF5sqQamvAke6M2CcTFzrLXEc0yCl5I",
  authDomain: "contactlinks-77cc6.firebaseapp.com",
  projectId: "contactlinks-77cc6",
  storageBucket: "contactlinks-77cc6.appspot.com",
  messagingSenderId: "643740281641",
  appId: "1:643740281641:web:4f63ee8b03459c579ea538",
  measurementId: "G-EV9CQLPGLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('User:', user);
      // Handle user information as needed
      return user;
    })
    .catch((error) => {
      console.error('Error during sign in:', error);
      throw error;
    });
};

// Function to get the current authenticated user
export const getCurrentUser = () => {
  return auth.currentUser;
};
