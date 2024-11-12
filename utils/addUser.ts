import {Firebase_db} from "@/config/firebaseConfig"
import { setDoc, doc, getDoc } from "firebase/firestore";
import { User,ExtraData } from "./";

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
            ...extraData,
        });
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