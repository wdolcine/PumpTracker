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
  sendPasswordResetEmail,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { Firebase_auth } from "@/config/firebaseConfig";
import { User, ExtraData } from "../utils";
import { addUser } from "../utils/addUser";

import { convertFirebaseUserToUser } from "../utils/convertFirebaseUser";

WebBrowser.maybeCompleteAuthSession();

export interface AuthContextType {
  currentUser: User | null;
  error: string | null;
  clearError: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    extraData?: ExtraData
  ) => Promise<void>;
  logInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId:
      "19833993261-ocr5md15t76qiqh0opmv1tf005cpnt34.apps.googleusercontent.com",
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
        router.replace("/(tabs)/Home");
        console.log("User authenticated");
      } else {
        setCurrentUser(null);
        router.replace("/(auth)/LoginScreen");
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
      setError(null);
      router.replace("/(tabs)/Home");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Signup Error :", error.message);
        setError(error.message);
      } else {
        // console.error("An unknown error occured during signup");
        setError("An unknown error occured during signup");
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
      setError(null);
      router.replace("/(tabs)/Home");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login Error:", error.message);
        setError(error.message);
      } else {
        // console.error("An unknown error occured during login");
        setError("An unknown error occured during login");
      }
    }
  };

  // Google Login
  const logInWithGoogle = async () => {
    try {
      console.log("Logging with google");
      await promptAsync();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Google Login Error:", error.message);
        setError(error.message);
      } else {
        // console.error("An unknown error occurred during Google login");
        setError("An unknown error occured during Google Login");
      }
    }
  };
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(Firebase_auth, email);
      console.log("Password reset email sent");
    } catch (error) {
      if (error instanceof Error) {
        // console.error("Error resetting password:", error.message);
        setError(error.message);
      } else {
        // console.error("Unknown error during password reset");
        setError("An unknown error occured during password reset");
      }
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(Firebase_auth);
      await AsyncStorage.removeItem("@user");
      setCurrentUser(null);
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Logout Error:", error.message);
        setError(error.message);
      } else {
        // console.error("An unknown error occurred during logout");
        setError("An unknown error occurred during logout");
      }
    }
  };
  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    currentUser,
    error,
    clearError,
    login,
    signup,
    logInWithGoogle,
    logout,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
