import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { cleanCart, decrementQuantity, incrementQuantity } from '../Redux/Store/Reducer/CartReducer';
import { decrementQty, incrementQty } from '../Redux/Store/Reducer/ProductReducer';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from "../Firebase/Firebase"

const CartScreen = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);

    const handleDecrementQuantity = () => {
        dispatch(decrementQuantity(item))
        dispatch(decrementQty(item))
    }

    const handleIncrementQuantity = () => {
        dispatch(incrementQuantity(item))
        dispatch(incrementQty(item))
    }

    const userUid = auth.currentUser.uid;

    const placeOrder = async () => {
        navigation.navigate("Order");
        dispatch(cleanCart());
        await setDoc(doc(db, "users", `${userUid}`), {
            orders: {  ...cart },
            pickUpDetails: route.params
        },
            {
                merge: true,
            }
        );
    };

    return (
        <>
            <ScrollView style={{ marginTop: 50 }}>
                {total == 0 ? (
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ marginTop: 40 }}>Your Cart is empty</Text>
                    </View>
                ) : (
                    <>
                        <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                            <Ionicons onPress={() => navigation.goBack()} name="arrow-back-outline" size={24} color="black" />
                            <Text>Your Bucket</Text>
                        </View>

                        <Pressable style={{ backgroundColor: "white", borderRadius: 12, marginHorizontal: 10, padding: 14 }}>
                            {cart.map((item, index) => (
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 12 }} key={index}>
                                    <Text style={{ width: 100, fontSize: 16, fontWeight: 500 }}>{item.name}</Text>
                                    <Pressable style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, alignItems: "center", borderWidth: 0.5, borderRadius: 10, borderColor: "#BEBEBE" }}>
                                        <Pressable onPress={() => {
                                            dispatch(decrementQuantity(item))
                                            dispatch(decrementQty(item))
                                        }}>
                                            <Text style={{ fontSize: 20, color: "#088F8F", paddingHorizontal: 6, fontWeight: "600", }}>-</Text>
                                        </Pressable>

                                        <Pressable>
                                            <Text style={{ fontSize: 19, color: "#088F8F", paddingHorizontal: 8, fontWeight: "600" }}>{item.quantity}</Text>
                                        </Pressable>

                                        <Pressable onPress={() => {
                                            dispatch(incrementQuantity(item))
                                            dispatch(incrementQty(item))
                                        }}>
                                            <Text style={{ fontSize: 20, color: "#088F8F", paddingHorizontal: 6, fontWeight: "600", }}>+</Text>
                                        </Pressable>
                                    </Pressable>
                                    <Text style={{ fontSize: 16, fontWeight: 500 }}>${item.price * item.quantity}</Text>
                                </View>
                            ))}
                        </Pressable>

                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ marginTop: 30, fontSize: 16, fontWeight: "bold" }}>Billing Details</Text>
                            <View style={{ backgroundColor: "white", borderRadius: 7, padding: 10, marginTop: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "400", color: "gray" }}>Item Total</Text>
                                    <Text style={{ fontSize: 18, fontWeight: "400" }}>${total}</Text>
                                </View>

                                <View style={{ marginVertical: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "400", color: "gray" }}> Delivery Fee | 1.2KM</Text>
                                    <Text style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}>
                                        FREE
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}> Free Delivery on Your order</Text>
                                </View>

                                <View style={{ borderColor: "gray", height: 1, borderWidth: 0.5, marginTop: 10 }}>
                                    <View style={{ marginVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}> Selected Date </Text>
                                        <Text style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}>

                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>No of Days</Text>
                                    <Text style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}>
                                        {route.params.no_of_days}
                                    </Text>
                                </View>

                                <View style={{ marginVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>selected Pick Up Time</Text>
                                    <Text style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}>
                                        {route.params.selectedTime}
                                    </Text>
                                </View>

                                <View style={{ borderColor: "gray", height: 1, borderWidth: 0.5, marginTop: 10 }} />
                                <View style={{ marginVertical: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>To pay</Text>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{total + 95}</Text>
                                </View>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>

            {total === 0 ? null : (
                <Pressable style={{ backgroundColor: "#088F8F", marginTop: "auto", padding: 10, marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>{cart.length} items | ${total}</Text>
                        <Text style={{ fontSize: 13, fontWeight: "500", color: "white", marginVertical: 6 }}>extra charges might apply</Text>
                    </View>
                    <Pressable onPress={placeOrder}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>Place Order</Text>
                    </Pressable>
                </Pressable>
            )}
        </>
    )
}

export default CartScreen

const styles = StyleSheet.create({})