import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBgzWCqgtx6bMLYQ7-CD6fZ7gq91tbNbp0",
  authDomain: "datasharing-3e4a8.firebaseapp.com",
  projectId: "datasharing-3e4a8",
  storageBucket: "datasharing-3e4a8.appspot.com",
  messagingSenderId: "199111014374",
  appId: "1:199111014374:web:a2b18d3e7e09cd9dec8827"
});


// this is for firebase database

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };