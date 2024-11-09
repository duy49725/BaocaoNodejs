// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeVc5BLXo537e679XDPx4yIibHkS_Lh60",
  authDomain: "chat-app-gs-50b9c.firebaseapp.com",
  projectId: "chat-app-gs-50b9c",
  storageBucket: "chat-app-gs-50b9c.appspot.com",
  messagingSenderId: "851594126242",
  appId: "1:851594126242:web:172a00b4103bc218aac8fb",
  measurementId: "G-W30VCQBEQ5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
