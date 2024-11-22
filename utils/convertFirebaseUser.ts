import {User} from "./index";
import {User as FirebaseUser} from "firebase/auth";

const DEFAULT_PROFILE_IMAGE = "https://imgs.search.brave.com/6mjmF-EzeDn0GTtweyDSRV74VpNuw-RDizN6ZK_2aVk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzcyLzMy/Lzk4LzcyMzI5ODIz/MzYwZTU2MjY5ODk3/ODEzYTNkYmQ5OWI2/LmpwZw"; 


export const convertFirebaseUserToUser =(
    firebaseUser : FirebaseUser
): User =>({
    uid: firebaseUser.uid || "",
    email: firebaseUser.email || "defaultemail@gmail.com",
    firstName: firebaseUser.displayName?.split(" ")[0] || "Default",
    lastName: firebaseUser.displayName?.split(" ")[0] || "User",
    profileImage: firebaseUser.photoURL || DEFAULT_PROFILE_IMAGE,
    createdAt: new Date(),
    locationRef:`/locations/${firebaseUser.uid}`,
});