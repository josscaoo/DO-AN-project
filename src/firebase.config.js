import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCod9GLvckTTisyR0YLU17AlnHJgy-5G7g",
  authDomain: "maltimart-2f37e.firebaseapp.com",
  projectId: "maltimart-2f37e",
  storageBucket: "maltimart-2f37e.appspot.com",
  messagingSenderId: "69205665212",
  appId: "1:69205665212:web:7163aee4d38968c74077b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;