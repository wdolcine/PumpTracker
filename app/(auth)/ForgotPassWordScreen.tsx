import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

const ForgotPassWordScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert(
        "Success",
        "A password reset email has been sent. Please check your inbox."
      );
      router.replace("/(auth)/LoginScreen");
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address to receive a password reset link.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Sending..." : "Reset Password"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/(auth)/LoginScreen")}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.lightColor.background,
  },
  title: {
    fontSize: 24,
    fontFamily: "Outfit-Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Outfit-SemiBold",
    textAlign: "center",
    color: Colors.lightColor.text,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Outfit-Regular",
  },
  button: {
    backgroundColor: Colors.lightColor.button,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: Colors.lightColor.textButton,
    fontSize: 16,
    fontFamily: "Outfit-Regular",
  },
  backToLogin: {
    marginTop: 15,
    textAlign: "center",
    color: Colors.lightColor.text,
    fontSize: 16,
  },
});

export default ForgotPassWordScreen;
