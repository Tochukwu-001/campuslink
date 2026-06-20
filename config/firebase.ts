// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBesyaVZPWQ8fOrbzf7H2tEY57D92jSt0o",
  authDomain: "campuslink-2b18f.firebaseapp.com",
  projectId: "campuslink-2b18f",
  storageBucket: "campuslink-2b18f.firebasestorage.app",
  messagingSenderId: "779594843902",
  appId: "1:779594843902:web:5ad4b6dc23b52a290587af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db}