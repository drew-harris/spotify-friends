import firebase from "firebase/app";
import "firebase/functions";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAfRshiLIDci_2QAmqelgmgN19Kk9QIznw",
  authDomain: "friends-for-spotify.firebaseapp.com",
  projectId: "friends-for-spotify",
  storageBucket: "friends-for-spotify.appspot.com",
  messagingSenderId: "703424764081",
  appId: "1:703424764081:web:57ec74980a0d6932b36a90",
  measurementId: "G-L1VZF97NP9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const FieldValue = firebase.firestore.FieldValue;

const auth = firebase.auth();
const functions = firebase.functions();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
export { auth, functions, firestore, FieldValue, analytics };
