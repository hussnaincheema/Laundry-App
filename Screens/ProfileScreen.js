import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React from "react";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const signOutUser = () => {
    // signOut(auth).then(() => {
    //     navigation.replace("Login");
    // }).catch(error => {
    //     console.log("Error is: ", error)
    // })
    Alert.alert(
      "Log Out",
      "Are You Sure You Want to Log Out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            signOut(auth)
              .then(() => {
                navigation.replace("Login");
              })
              .catch((error) => {
                console.log("Error is: ", error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Pressable style={{marginVertical: 10}}>
      <Text style={{fontSize: 20, fontWeight: "600"}}>Welcome {user?.email}</Text>
      </Pressable> */}

      <Pressable
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          padding: 15,
          marginTop: 75,
        }}
      >
        <Image
              style={{ width: 150, height: 150, borderRadius: 75 }}
              source={require("../assets/Images/Laundry_Logo.png")}
            />
      </Pressable>

      <Pressable
        onPress={signOutUser}
        style={{
          width: 200,
          padding: 15,
          marginTop: 50,
          borderRadius: 7,
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#088F8F",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Log Out
        </Text>
      </Pressable>

      {/* <Pressable
        style={{
          width: 300,
          padding: 15,
          marginTop: 25,
          borderBottomColor: "gray",
          borderBottomWidth: 2,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Change Password
        </Text>
      </Pressable>

      <Pressable
        style={{
          width: 300,
          padding: 15,
          marginTop: 25,
          borderBottomColor: "gray",
          borderBottomWidth: 2,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Delete Account
        </Text>
      </Pressable> */}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
