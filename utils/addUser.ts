import {Firebase_db} from "@/config/firebaseConfig"
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { User,ExtraData } from "./";
import { Firebase_rtdb } from "@/config/firebaseConfig";
import { ref, set } from "firebase/database";

export const addUser = async (user : User,extraData?:ExtraData) => {
    const userDocRef = doc(Firebase_db, "users", user.uid);

    try{
        const userDoc = await getDoc(userDocRef);

    if(!userDoc.exists()) {

        await setDoc(userDocRef,{
            uid: user.uid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage:user.profileImage,
            createdAt: new Date(),
            locationRef:`/locations/${user.uid}`,
            ...extraData,
        });

        await updateUserLocation(user.uid,{
            latitude:0,
            longitude:0,
        });

        console.log("User added to Firestore with location reference");

        return true;
    } else{
        console.warn(`User with UID ${user.uid} already exists`);
        return false;
    }

    } catch (error) {
        console.error("Error adding user data:",error);
        return false;
    }
    
};
export const updateUserLocation = async (
    uid:string,
    location: { latitude:number; longitude:number }
) => { 
    try{
        const locationRef = ref(Firebase_rtdb, `/locations/${uid}`); // Reference to the user's location path
    
        await set(locationRef, {
          ...location,
          timestamp: Date.now(),
        });
        console.log("Location updated in Realtime Database");
    } catch(error){
        console.error("Error updating location",error);
    }
};

export const updateUserLocationRefInFirestore = async(
    uid:string,
    locationRef:string
) =>{
    try{
        const userDocRef = doc(Firebase_db,"users",uid);
        await updateDoc(userDocRef,{locationRef});
        console.log("User's location reference updated in Firestore.");
    } catch(error){
        console.error("Error updating location reference in Firestore",error)
    }
};
