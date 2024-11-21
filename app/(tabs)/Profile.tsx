import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/useAuth";
import { getUser } from "@/utils/getUser";
import { User } from "@/utils";

export default function Profile() {
  const { logout, currentUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser).then((userData) => {
        setUserData(userData ?? null);
        setLoading(false);
      });
    }
  }, [currentUser]);

  const handleLogOut = async () => {
    console.log("Logged out");
    await logout();
  };

  if (loading) {
    return (
      <View style={styles.Themedview}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        {/* Title */}
        <Text style={styles.title}>My Account</Text>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          {currentUser?.firstName ||
          (userData?.firstName && currentUser?.lastName) ||
          (userData?.lastName && currentUser?.email) ||
          userData?.email ? (
            <>
              <Image
                source={{
                  uri:
                    currentUser?.profileImage || "/assets/images/DSC_3693.jpg",
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileDetails}>
                <Text style={styles.name}>
                  {userData?.lastName || currentUser?.lastName}
                  {"\t"}
                  {userData?.firstName || currentUser?.firstName}
                </Text>
                <Text style={styles.email}>
                  {userData?.email || currentUser?.email}
                </Text>
              </View>
            </>
          ) : (
            <Text>No user logged in</Text>
          )}
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons
              name="create-outline"
              size={20}
              color={Colors.lightColor.iconSelected}
            />
          </TouchableOpacity>
        </View>

        {/* Switch dark and light mode */}
        <View>
          {/* <TouchableOpacity onPress={onToggleDarkMode}>
            <Switch
              value={isDarkMode}
              onValueChange={(value) => {
                toggleDarkMode(value);
              }}
              style={{ shadowColor: Colors.lightColor.text }}
            ></Switch>
          </TouchableOpacity> */}
        </View>

        {/* Quick Link */}
        <View style={styles.quickLinkContainer}>
          <Text style={styles.quickLinkText}>QUICK LINKS</Text>
          {/* <View style={styles.quickLink}>
            <Ionicons
              name="time-outline"
              size={20}
              color={Colors.lightColor.iconDefault}
            />
            <Text style={styles.quickLinkLabel}>History</Text>
            <TouchableOpacity>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.lightColor.iconDefault}
              />
            </TouchableOpacity>
          </View> */}
          <View style={styles.quickLink}>
            <Ionicons
              name="shield-outline"
              size={20}
              color={Colors.lightColor.iconDefault}
            />
            <Text style={styles.quickLinkLabel}>Privacy Policy</Text>
            <TouchableOpacity>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.lightColor.iconDefault}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.quickLink}>
            <Ionicons
              name="information-outline"
              size={20}
              color={Colors.lightColor.iconDefault}
            />
            <Text style={styles.quickLinkLabel}>About PumpTracker</Text>
            <TouchableOpacity>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.lightColor.iconDefault}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightColor.background,
    padding: 20,
  },
  Themedview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "Outfit-Bold",
    marginBottom: 30,
    textAlign: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightColor.textButton,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontFamily: "Outfit-SemiBold",
  },
  email: {
    fontSize: 14,
    fontFamily: "Outfit-Regular",
    color: Colors.lightColor.text,
  },
  editIcon: {
    padding: 5,
  },
  quickLinkContainer: {
    marginBottom: 30,
  },
  quickLinkText: {
    fontSize: 12,
    color: Colors.lightColor.text,
    fontFamily: "Outfit-SemiBold",
    marginBottom: 10,
  },
  quickLink: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightColor.textButton,
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  quickLinkLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Outfit-Regular",
    color: Colors.lightColor.text,
  },
  logoutButton: {
    backgroundColor: Colors.lightColor.tintColor,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  logoutText: {
    color: Colors.lightColor.textButton,
    fontSize: 16,
    fontFamily: "Outfit-Bold",
  },
});
