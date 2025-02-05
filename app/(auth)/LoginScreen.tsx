import { Firebase_auth } from "@/config/firebaseConfig";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useAuth } from "@/context/useAuth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { login, logInWithGoogle, clearError, error } = useAuth();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    return () => {
      clearError();
    };
  }, [error]);

  const validateForm = () => {
    if (email.trim() !== "" && password.trim() !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  useEffect(() => {
    validateForm();
  }, [email, password]);

  const handleGoogle = async () => {
    await logInWithGoogle();
    console.log("Google");
  };
  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    console.log("Logged in");

    setLoading(false);
  };
  const handleForgotPassword = async () => {
    router.push("../(auth)/ForgotPassWordScreen");
  };
  return (
    <ScrollView style={styles.container1}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue.</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="exemple@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <FontAwesome5
              name={passwordVisible ? "eye" : "eye-slash"}
              size={15}
              color="#555"
            />
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: isValid ? "#007bff" : "#cccccc" },
          ]}
          onPress={handleLogin}
          disabled={!isValid || loading}
        >
          <Text style={styles.loginText}>
            {loading ? "Logging..." : "Log In"}
          </Text>
        </TouchableOpacity>

        {/* <Text style={styles.orText}>Or connect via</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogle}>
            <FontAwesome5
              name="google"
              type="font-awesome"
              color="#EA4335"
              size={24}
            />
          </TouchableOpacity>
        </View> */}
        <View style={styles.Footer}>
          <Text style={styles.footerText}>
            By logging, you are agreeing with our <Text>{"\n"}</Text>
            <Link href="/privacy" style={styles.link}>
              Terms of Use{" "}
            </Link>{" "}
            and
            {"  "}
            <Link href="/privacy" style={styles.link}>
              Privacy Policy
            </Link>
          </Text>

          <Text>
            <Text style={styles.footerText}>
              No account yet?{" "}
              <Link href="/(auth)/RegisterScreen" style={styles.link}>
                Register
              </Link>
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles for the login screen
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: Colors.lightColor.background,
    // justifyContent: "center",
    // alignItems: "center",
    minHeight: "auto",
    paddingTop: 60,
  },
  errorText: {
    color: "red",
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lightColor.background,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "auto",
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "Outfit-Bold",
    color: Colors.lightColor.tintColor,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Outfit-SemiBold",
    color: Colors.lightColor.text,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.lightColor.textButton,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: Colors.lightColor.text,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.lightColor.textButton,
    borderRadius: 30,
    marginVertical: 10,
    elevation: 2,
  },
  eyeIcon: {
    padding: 10,
    marginRight: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    fontFamily: "Outfit-Regular",
    color: Colors.lightColor.tintColor,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: Colors.lightColor.tintColor,
    width: "100%",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  loginText: {
    fontFamily: "Outfit-Regular",
    color: "#fff",
    fontWeight: "bold",
  },
  orText: {
    fontFamily: "Outfit-Regular",
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  Footer: {
    marginBottom: "5%",
  },
  footerText: {
    fontFamily: "Outfit-Regular",
    fontSize: 12,
    color: Colors.lightColor.text,
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    fontSize: 14,
    color: Colors.lightColor.tintColor,
    fontFamily: "Outfit-SemiBold",
    textDecorationLine: "underline",
  },
});
