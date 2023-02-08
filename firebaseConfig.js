import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQdH1u4EeNOfvwhAwfa0JsyoVYp6oWh2U",
    authDomain: "car-rental-ae1be.firebaseapp.com",
    projectId: "car-rental-ae1be",
    storageBucket: "car-rental-ae1be.appspot.com",
    messagingSenderId: "584315533862",
    appId: "1:584315533862:web:173b2a4ad301a6705004e7",
    databaseURL:"https://car-rental-ae1be-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
