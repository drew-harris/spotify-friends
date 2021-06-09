import firebase from "firebase/app";
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyCI7aUtrZV32TfVTB9RDbkZR82dG2XhN30",
    authDomain: "spotify-friends-drewh.firebaseapp.com",
    projectId: "spotify-friends-drewh",
    storageBucket: "spotify-friends-drewh.appspot.com",
    messagingSenderId: "43892100780",
    appId: "1:43892100780:web:5b5e6fc0aa5a59fe71d909",
    measurementId: "G-MPKPT89E3J"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
export { auth };
