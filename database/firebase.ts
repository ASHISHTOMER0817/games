// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAg1_Rjn94OfZijMPDletT3LzH565zeOJw",
//   authDomain: "snake-ladder-ca007.firebaseapp.com",
//   projectId: "snake-ladder-ca007",
//   storageBucket: "snake-ladder-ca007.firebasestorage.app",
//   messagingSenderId: "842855497280",
//   appId: "1:842855497280:web:45aa1b060ed7b7b203a9a5",
//   measurementId: "G-1FG4YT8X2Q"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const analytics = getAnalytics(app);



import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: process.env.firebase_url,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
 const database = getDatabase(app);
 export default database;