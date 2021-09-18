import  firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"
import "firebase/compat/storage"; // 스토리지 임포트

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL:process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_API_ID
  };

  firebase.initializeApp(firebaseConfig);

  export const firebaseInstance = firebase;
  export const dbService = firebase.firestore();
  export const authService = firebase.auth(); 
  export const storageService = firebase.storage();
  