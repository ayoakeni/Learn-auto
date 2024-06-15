import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBDVRI4M55kUcAzRkY3m1NH9yfNY2UNkC8",
  authDomain: "learn-auto-4a8a7.firebaseapp.com",
  projectId: "learn-auto-4a8a7",
  storageBucket: "learn-auto-4a8a7.appspot.com",
  messagingSenderId: "1031509737349",
  appId: "1:1031509737349:web:65629faf52268225f38eec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };