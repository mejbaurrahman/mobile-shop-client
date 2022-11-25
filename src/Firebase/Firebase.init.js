// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey, 
  authDomain: process.env.REACT_APP_authDomain, 
  projectId: process.env.REACT_APP_projectId, 
  storageBucket: process.env.REACT_APP_storageBucket, 
  messagingSenderId: process.env.REACT_APP_messagingSenderId, 
  appId: process.env.REACT_APP_appId 
};


// const firebaseConfig = {
//   apiKey: "AIzaSyCVBJXMGrUeqFE5ogqeNJCpO2TDrpWQrXE",
//   authDomain: "mobile-shop-52fab.firebaseapp.com",
//   projectId: "mobile-shop-52fab",
//   storageBucket: "mobile-shop-52fab.appspot.com",
//   messagingSenderId: "378654559859",
//   appId: "1:378654559859:web:4e9b4bbb1d82ff584be406"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;