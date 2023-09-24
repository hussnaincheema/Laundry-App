import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/Firebase";
import { setDoc, doc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log("======user credential", userCredential);
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: user,
          phone: phone,
        });
      }
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
            //padding: 15,
            marginTop: 25,
          }}
        >
          <Image
            style={{ width: 150, height: 150, borderRadius: 75 }}
            source={require("../assets/Images/Laundry_Logo.png")}
          />
        </Pressable>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 23, color: "#088F8F", fontWeight: "bold" }}>
            Sign Up
          </Text>
          <Text style={{ fontSize: 20, marginTop: 8, fontWeight: "600" }}>
            Create a new account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
              style={{
                borderBottomWidth: 1,
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="key-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword} // Use the secureTextEntry prop
              placeholderTextColor="black"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                fontSize: password ? 18 : 18,
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
            <TouchableOpacity
              style={{ marginLeft: -20, marginBottom: 6 }}
              onPress={togglePasswordVisibility}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"} // Change icon based on showPassword
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              placeholder="Phone No"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor="black"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                fontSize: phone ? 18 : 18,
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>

          <Pressable
            onPress={register}
            style={{
              width: 200,
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#088F8F",            
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Sign Up
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
              Already have an account?{" "}
              <Text
                style={{
                  color: "#088F8F",
                  fontSize: 19,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                {" "}
                Sign In
              </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
