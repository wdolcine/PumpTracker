import {Firebase_db} from "@/config/firebaseConfig"
import { doc, getDoc } from "firebase/firestore";
import {User} from "./index"

export const getUser = async (user: User ) => {

    try{
       const userDoc = doc(Firebase_db, "users", user.uid);

       const userSnap = await getDoc(userDoc);
       const infos = userSnap.metadata
       console.log(infos);

       if (userSnap.exists()) {

       return userSnap.data() as User;
       } else{
         console.log(`User with UID ${user.uid} not found`);
       }
    } catch(error) {
        console.log("Error fetching user data:",error);
        return null;

    }
    
  };