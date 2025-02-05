import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
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



const Firebase_db = getFirestore(Firebase_app);
const Firebase_rtdb = getDatabase(Firebase_app);


export { Firebase_auth , Firebase_db,Firebase_rtdb};

// IOS : 729641409796-mup9hs9bk5kgf4bhnv89da8baimv0tj6.apps.googleusercontent.com
// Android : 729641409796-3vv0bb2qnpjigkojhkf0fqakn195vr01.apps.googleusercontent.com