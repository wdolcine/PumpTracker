import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  View,
  Text,
} from "react-native";
import MyCheckbox from "@/components/Mycheckbox";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/useAuth";

const RegisterScreen = () => {
  const [lastName, setlastName] = useState<string>("");
  const [firstName, setfirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setconfirmPasswordVisible] = useState(false);

  const { signup, logInWithGoogle, error, clearError } = useAuth();

  const validateForm = () => {
    if (
      lastName.trim() &&
      firstName.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword &&
      agreeTerms &&
      password === confirmPassword
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [lastName, firstName, email, password, confirmPassword, agreeTerms]);

  const handleGoogle = async () => {
    // console.log("Google Logged");
    setLoading(true);
    await logInWithGoogle();
    setLoading(false);
  };
  useEffect(() => {
    if (error) {
      // Show error (could use Toast, Modal, or inline Text)
      console.error(error);
    }
    return () => {
      clearError(); // Clear error when the component unmounts or user navigates away
    };
  }, [error]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    } else {
      const extraData = {
        lastName,
        firstName,
      };
      await signup(email, password, extraData);
    }

    console.log("Registred");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account!</Text>
        <Text style={styles.subtitle}>Register to get started.</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text: string) => setlastName(text)}
          />
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text: string) => setfirstName(text)}
          />
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
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
        {/* onChangeText={(text: string) => setConfirmPassword(text)}  confirmPassword*/}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={(text: string) => setConfirmPassword(text)}
            secureTextEntry={!confirmpasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setconfirmPasswordVisible(!confirmpasswordVisible)}
            style={styles.eyeIcon}
          >
            <FontAwesome5
              name={confirmpasswordVisible ? "eye" : "eye-slash"}
              size={15}
              color="#555"
            />
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={[
            styles.registerButton,
            { backgroundColor: isValid ? "#007bff" : "#cccccc" },
          ]}
          onPress={handleRegister}
          disabled={!isValid || loading}
        >
          <Text style={styles.registerText}>
            {loading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or connect via</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogle}>
            <FontAwesome5
              name="google"
              type="font-awesome"
              color="#EA4335"
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <MyCheckbox
            checked={agreeTerms}
            onValueChange={(newValue: boolean) => setAgreeTerms(newValue)}
          />
          <Text style={styles.checkboxText}>
            By registering, you are agreeing with our{"\n"}
            <Link href="/privacy" style={styles.link}>
              {"\t"}
              {"\t"}Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" style={styles.link}>
              Privacy Policy
            </Link>
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.footerText}>
            {"\t"}
            {"\t"}Already have an account?{" "}
            <Link href="../(auth)/LoginScreen" style={styles.link}>
              Log in
            </Link>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles for the register screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightColor.background,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "auto",
    // marginTop: 40,
    paddingTop: 60,
  },
  errorText: { color: "red", marginVertical: 5 },
  title: {
    fontSize: 24,
    fontFamily: "Outfit-Bold",
    color: Colors.lightColor.tintColor,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.lightColor.text,
    fontFamily: "Outfit-Regular",
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
  registerButton: {
    backgroundColor: Colors.lightColor.button,
    width: "100%",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  registerText: {
    color: Colors.lightColor.textButton,
    fontFamily: "Outfit-Bold",
  },
  orText: {
    fontSize: 14,
    color: Colors.lightColor.text,
    fontFamily: "Outfit-Regular",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "25%",
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: Colors.lightColor.textButton,
    padding: 10,
    borderRadius: 50,
    shadowColor: Colors.lightColor.text,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
    fontFamily: "Outfit-SemiBold",
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontFamily: "Outfit-Regular",
    marginBottom: 20,
  },
});

export default RegisterScreen;
