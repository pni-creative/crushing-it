// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import 'firebase/database';
import "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain: "crushin-it.firebaseapp.com",
  databaseURL: "https://crushin-it.firebaseio.com",
  projectId: "crushin-it",
  storageBucket: "crushin-it.appspot.com",
  messagingSenderId: process.env.REACT_APP_FB_MSG_ID,
  appId: process.env.REACT_APP_FB_APP_ID

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const fbRef = firebase;


export default fbRef;
