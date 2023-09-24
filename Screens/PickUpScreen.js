import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const PickUpScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev, 0);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState([]);
    const [delivery, setDelivery] = useState([]);

    const deliveryTime = [
        {
            id: "0",
            name: "2-3 Days",
        },
        {
            id: "1",
            name: "3-4 Days",
        },
        {
            id: "2",
            name: "4-5 Days",
        },
        {
            id: "3",
            name: "5-6 Days",
        },
        {
            id: "4",
            name: "Tomorrow",
        },
    ];

    const times = [
        {
            id: "0",
            time: "11:00 PM",
        },
        {
            id: "1",
            time: "12:00 PM",
        },
        {
            id: "2",
            time: "01:00 PM",
        },
        {
            id: "3",
            time: "02:00 PM",
        },
        {
            id: "4",
            time: "03:00 PM",
        },
        {
            id: "5",
            time: "04:00 PM",
        },
    ];


    const navigation =useNavigation();
    const proceedToCart = () => {
        if(!selectedTime || !selectedDate || !delivery) {
            Alert.alert(
                'Empty or Invalid',
                'Please Select all the fields',
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
        }
        if(selectedTime && selectedDate && delivery) {
            navigation.replace("Cart", {
                pickUpDate: selectedDate,
                selectedTime: selectedTime,
                no_of_days: delivery,

            });
        }
    }

    return (
        <>
            <SafeAreaView style={{ marginTop: 50 }}>
                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Enter Address</Text>
                <TextInput style={{ padding: 40, borderColor: "gray", paddingTop: 80, borderWidth: 0.7, borderRadius: 9, margin: 10 }} />

                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Pick Up Date</Text>
                <HorizontalDatepicker
                    mode="gregorian"
                    startDate={new Date('2023-01-01')}
                    endDate={new Date('2023-12-31')}
                    initialSelectedDate={new Date('2020-08-22')}
                    onSelectedDateChange={(date) => setSelectedDate(date)}
                    selectedItemWidth={170}
                    unselectedItemWidth={38}
                    itemHeight={38}
                    itemRadius={10}
                    selectedItemTextStyle={styles.selectedItemTextStyle}
                    unselectedItemTextStyle={styles.selectedItemTextStyle}
                    selectedItemBackgroundColor="#222831"
                    unselectedItemBackgroundColor="#ececec"
                    flatListContainerStyle={styles.flatListContainerStyle}
                />

                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Pick Up Time</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {times.map((item, index) => (
                        <Pressable key={index} onPress={() => setSelectedTime(item.time)} style={selectedTime.includes(item.time) ? {
                            margin: 10, borderRadius: 7, padding: 15, borderColor: "red", borderWidth: 0.9
                        } : {
                            margin: 10, borderRadius: 7, padding: 15, borderColor: "gray", borderWidth: 0.7
                        }}>
                            <Text>{item.time}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Delivery Time</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {deliveryTime.map((item, index) => (
                        <Pressable key={index} onPress={() => setDelivery(item.name)} style={delivery.includes(item.name) ? {
                            margin: 10, borderRadius: 7, padding: 15, borderColor: "red", borderWidth: 0.9
                        } : {
                            margin: 10, borderRadius: 7, padding: 15, borderColor: "gray", borderWidth: 0.7
                        }}>
                            <Text>{item.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

            </SafeAreaView>

            {total === 0 ? null : (
                <Pressable style={{ backgroundColor: "#088F8F", marginTop: "auto", padding: 10, marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>{cart.length} items | ${total}</Text>
                        <Text style={{ fontSize: 13, fontWeight: "500", color: "white", marginVertical: 6 }}>extra charges might apply</Text>
                    </View>
                    <Pressable onPress={proceedToCart}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>Proceed to Cart</Text>
                    </Pressable>
                </Pressable>
            )}
        </>
    )
}

export default PickUpScreen

const styles = StyleSheet.create({})