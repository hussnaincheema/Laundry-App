import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../Components/Carousel';
import Services from '../Components/Services';
import DressItem from '../Components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Redux/Store/Reducer/ProductReducer';
import { useNavigation } from '@react-navigation/native';
import {collection, getDoc, getDocs} from 'firebase/firestore';
import {db} from '../Firebase/Firebase'


const HomeScreen = () => {

    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev, 0);
    const navigation = useNavigation();
    console.log("=====Cart Array is: ", cart);

    const [displayCurrentAddress, setDisplayCurrentAddress] = useState("We are loading your location");
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);

    const checkIfLocationEnabled = async () => {
        let enabled = await location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                'Location services not enabled',
                'Please able the location services',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        } else {
            setLocationServicesEnabled(enabled)
        }
    }

    const getCurrentLocation = async () => {
        let { status } = await location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                'Permission denied',
                'Allow the app to use location',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        };

        const { coords } = await location.getCurrentPositionAsync();
        console.log("=====Coords are:", coords)
        if (coords) {
            const { latitude, longitude } = coords;

            let res = await location.reverseGeocodeAsync({
                latitude,
                longitude
            });
            console.log("=====Response is", res)

            for (item of res) {
                let address = `${item.name} ${item.city} ${item.street}`;
                setDisplayCurrentAddress(address);
            }

        }
    }

    const product = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    useEffect(() => {
        if (product.length > 0) return;

        const fetchProducts = async () => {
            const colRef = collection(db, "services");
            const docSnap = await getDocs(colRef);
            docSnap.forEach((doc) => {
                items.push(doc.data());       
            });
            items?.map((services) => dispatch(getProducts(services)));
        };
        fetchProducts();
    }, [])
    console.log("=======Product Array is: ", product)
    const services = [
        {
            id: "0",
            image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            name: "T_Shirt",
            quantity: 0,
            price: 10
        },
        {
            id: "1",
            image: "https://images.unsplash.com/photo-1617118602199-d3c05ae37ed8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            name: "Gloves",
            quantity: 0,
            price: 10
        },
        {
            id: "2",
            image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amVhbnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name: "Jeans",
            quantity: 0,
            price: 10
        },
        {
            id: "3",
            image: "https://images.unsplash.com/photo-1564379976409-79bd0786fff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29ja3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name: "Socks",
            quantity: 0,
            price: 10
        },
        {
            id: "4",
            image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3dlYXRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "Sweater",
            quantity: 0,
            price: 10
        },
    ]

    return (
        <>
            <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}>
                <View style={{ flexDirection: "row", alignItems: "center", padding: 15, paddingTop: 45 }}>
                    <MaterialIcons name="location-on" size={30} color="#fd5c63" />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home</Text>
                        <Text>{displayCurrentAddress}</Text>
                    </View>

                    <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: "https://yt3.ggpht.com/yti/AHyvSCARuA-mne_9bofxrf0PPHqWR97eNGL3Wy_tX8W_CQ=s88-c-k-c0x00ffffff-no-rj-mo" }} />
                    </Pressable>

                </View>


                <View style={{ padding: 10, margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0.8, borderColor: "#C0C0C0", borderRadius: 7 }}>
                    <TextInput placeholder='Search for Items or more' />
                    <Feather name="search" size={24} color="#fd5c63" />
                </View>


                <Carousel />

                <Services />

                {product.map((item, index) => (
                    <DressItem item={item} key={index} />
                ))}
            </ScrollView>

            {total === 0 ? (
                null
            ) : (
                <Pressable style={{backgroundColor: "#088F8F", padding: 10, marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View>
                    <Text style={{fontSize: 15, fontWeight: "bold", color: "white"}}>{cart.length} items | ${total}</Text>
                    <Text style={{fontSize: 13, fontWeight: "500", color: "white", marginVertical: 6}}>extra charges might apply</Text>
                </View>
                <Pressable onPress = {() => navigation.navigate("PickUp")}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "white"}}>Proceed to Pickup</Text>
                </Pressable>
            </Pressable>
            )}
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})