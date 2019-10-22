// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const fbRef = firebase.database();


export default fbRef;
