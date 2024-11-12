import {User} from "./index";
import {User as FirebaseUser} from "firebase/auth";

const DEFAULT_PROFILE_IMAGE = ""; // Replace with your default image URL


export const convertFirebaseUserToUser =(
    firebaseUser : FirebaseUser
): User =>({
    uid: firebaseUser.uid || "",
    email: firebaseUser.email || "defaultemail@gmail.com",
    firstName: firebaseUser.displayName || "Default",
    lastName: firebaseUser.displayName || "User",
    profileImage:firebaseUser.photoURL || DEFAULT_PROFILE_IMAGE,
    createdAt: new Date(),
});