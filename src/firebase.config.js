import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAj4WITxji_28xeBiXl7GN6uraS2v8neq0",
  authDomain: "todolist-app-42bcb.firebaseapp.com",
  databaseURL: "https://todolist-app-42bcb.firebaseio.com",
  projectId: "todolist-app-42bcb",
  storageBucket: "todolist-app-42bcb.appspot.com",
  messagingSenderId: "713944183028",
  appId: "1:713944183028:web:2f311feb53a57136462ea1",
  measurementId: "G-4GKRTF4MCX"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore  = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage};
