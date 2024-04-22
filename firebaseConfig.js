import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9FxJ_f96TqSFv7wR312wLPhO4pZGnfhI",
    authDomain: "grobi-gallery.firebaseapp.com",
    databaseURL: "https://grobi-gallery-default-rtdb.firebaseio.com",
    projectId: "grobi-gallery",
    storageBucket: "grobi-gallery.appspot.com",
    messagingSenderId: "1091941921955",
    appId: "1:1091941921955:web:537de03713580281aefb16"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
const database = getDatabase(app);

export default database;