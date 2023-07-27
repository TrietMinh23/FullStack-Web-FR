// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbiSVWPWmXvZEDBvJg8Y44Ua2qmH1dRcU",
  authDomain: "fr-shop-c3ce4.firebaseapp.com",
  projectId: "fr-shop-c3ce4",
  storageBucket: "fr-shop-c3ce4.appspot.com",
  messagingSenderId: "31523580650",
  appId: "1:31523580650:web:17d7d0d5fee1e9206d0593",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
