import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {firebaseVariables} from "@/constants/VariableConfigApi";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: firebaseVariables.apiKey,
  authDomain: firebaseVariables.authDomain,
  projectId: firebaseVariables.projectId,
  storageBucket:firebaseVariables.storageBucket,
  messagingSenderId: firebaseVariables.messagingSenderId,
  appId: firebaseVariables.appId,
  measurementId: firebaseVariables.measurementId,
};

// Initialize Firebase
const Firebase_app = initializeApp(firebaseConfig);
const Firebase_auth = getAuth(Firebase_app);
const googleProvider = new GoogleAuthProvider();
const Firebase_db = getFirestore(Firebase_app);
const Firebase_rtdb = getDatabase(Firebase_app);

export {Firebase_app, Firebase_auth , googleProvider , Firebase_db,Firebase_rtdb};

