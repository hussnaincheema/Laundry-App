import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("======Login User credential", userCredential);
      const user = userCredential.user;
      console.log("======Login User details", user);
    });
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
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 23, fontWeight: "bold", color: "red" }}>
            loading
          </Text>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
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
            <Text
              style={{ fontSize: 23, color: "#088F8F", fontWeight: "bold" }}
            >
              Sign In
            </Text>
            <Text style={{ fontSize: 20, marginTop: 8, fontWeight: "600" }}>
              Sign In to your account
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

            <Pressable
              onPress={login}
              style={{
                width: 200,
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#088F8F",              }}
            >
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                Sign In
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{ textAlign: "center", color: "gray", fontSize: 17 }}
              >
                Don't have an account?{" "}
                <Text
                  style={{
                    color: "#088F8F",
                    fontSize: 19,
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  {" "}
                  Sign Up
                </Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
