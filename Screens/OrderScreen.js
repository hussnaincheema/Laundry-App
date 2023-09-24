import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React, {useEffect, useRef} from 'react'
import LottieView from "lottie-react-native"
import { useNavigation } from "@react-navigation/native";


const OrderScreen = () => {
    const navigation = useNavigation();
    const lottieAnimation = useRef(null);

    useEffect(() => {
        lottieAnimation.current?.play()
    
        // Or set a specific startFrame and endFrame with:
        // lottieAnimation.current?.play(30, 120);
      }, [])

    return (
        <SafeAreaView>
            <LottieView source={require("../assets/Animations/3009-sparkles.json")} style={{ height: 360, width: 300, alignSelf: "center", marginTop: 40, justifyContent: "center" }} autoplay loop speed={1} ref={lottieAnimation} />

            <Text style={{marginTop: 40, fontSize: 35, fontWeight: "bold", textAlign:"center"}}>Order Placed Successfully</Text>

            {/* <LottieView source={require("../assets/Animations/thumbs-up.json")} style={{ height: 300, width: 300, alignSelf: "center", position: "absolute", top: 45 }} autoplay loop speed={0.7 } /> */}

            <Pressable 
            onPress={() => navigation.navigate("Home")}
            style={{
              width: 200,
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#088F8F",            }}>
                <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>Go to Home</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default OrderScreen

const styles = StyleSheet.create({})