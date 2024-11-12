import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { Firebase_auth } from "@/config/firebaseConfig";
import { User, ExtraData } from "../utils";
import { addUser } from "../utils/addUser";
import { convertFirebaseUserToUser } from "../utils/convertFirebaseUser";

WebBrowser.maybeCompleteAuthSession();

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    extraData?: ExtraData
  ) => Promise<void>;
  logInWithGoogle: () => Promise<void>;
  logInWithApple: () => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId:
      "729641409796-1q9i165bdi1ek4aigbd73a99a618i5r4.apps.googleusercontent.com",
  });

  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setCurrentUser(userData);
    } catch (e) {
      console.log(e, "Error getting local user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocalUser();

    const unsubscribe = onAuthStateChanged(Firebase_auth, async (user) => {
      if (user) {
        const appUser = convertFirebaseUserToUser(user);
        setCurrentUser(appUser);
        await AsyncStorage.setItem("@user", JSON.stringify(appUser));
        console.log("User authenticated");
      } else {
        setCurrentUser(null);
        console.log("User not authenticated");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(Firebase_auth, credential)
        .then(async (userCredential) => {
          const user = convertFirebaseUserToUser(userCredential.user);
          const profileImage = userCredential.user.photoURL;
          await addUser({ ...user, profileImage });

          await AsyncStorage.setItem("@user", JSON.stringify(user));
          setCurrentUser(user);
          router.replace("/(tabs)/Home");
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.error("Error signing in with credential:", error.message);
          } else {
            console.error(
              "An unknown error occurred during signing in with credential"
            );
          }
        });
    }
  }, [response]);

  const signup = async (
    email: string,
    password: string,
    extraData?: ExtraData
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        Firebase_auth,
        email,
        password
      );
      const user = convertFirebaseUserToUser(userCredential.user);

      await addUser(user, extraData);

      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setCurrentUser(user);
      router.replace("/(tabs)/Home");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Signup Error :", error.message);
      } else {
        console.error("An unknown error occured during signup");
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        Firebase_auth,
        email,
        password
      );
      const user = convertFirebaseUserToUser(userCredential.user);

      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setCurrentUser(user);
      router.replace("/(tabs)/Home");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login Error:", error.message);
      } else {
        console.error("An unknown error occured during login");
      }
    }
  };

  // Google Login
  const logInWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Google Login Error:", error.message);
      } else {
        console.error("An unknown error occurred during Google login");
      }
    }
  };

  // Apple Login
  const logInWithApple = async () => {
    // try {
    //   const appleCredential = await AppleAuthentication.signInAsync({
    //     requestedScopes: [
    //       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    //       AppleAuthentication.AppleAuthenticationScope.EMAIL,
    //     ],
    //   });
    //   if (appleCredential.identityToken) {
    //     const provider = new OAuthProvider("apple.com");
    //     const credential = provider.credential({
    //       idToken: appleCredential.identityToken,
    //     });
    //     const result = await signInWithCredential(Firebase_auth, credential);
    //     const user = convertFirebaseUserToUser(result.user);
    //     await addUser(user);
    //     setCurrentUser(user);
    //   }
    // } catch (error) {
    //   console.error("Apple login failed:", error);
    // }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(Firebase_auth);
      await AsyncStorage.removeItem("@user");
      setCurrentUser(null);
      router.replace("/(auth)/LoginScreen");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Logout Error:", error.message);
      } else {
        console.error("An unknown error occurred during logout");
      }
    }
  };

  const value: AuthContextType = {
    currentUser,
    login,
    signup,
    logInWithGoogle,
    logInWithApple,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
