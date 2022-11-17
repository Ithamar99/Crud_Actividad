import firebase from "firebase";
import'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDELN9kEj2lXoldymGjFodFxz9nye-5Qj8",
    authDomain: "crud-jueves-8ea37.firebaseapp.com",
    projectId: "crud-jueves-8ea37",
    storageBucket: "crud-jueves-8ea37.appspot.com",
    messagingSenderId: "169454087971",
    appId: "1:169454087971:web:f0be8ed8c8cb43f0bc2696",
    measurementId: "G-FT4K2Y5EH7"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export{firebase};