import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Services = () => {

    const services = [
        {
            id: "0",
            image: require("../assets/Images/Laundry_six.jpg"),
            name: "Drying"
        },
        {
            id: "1",
            image: require("../assets/Images/Laundry_five.jpg"),
            name: "Ironing"
        },
        {
            id: "2",
            image: require("../assets/Images/Laundry_three.jpg"),
            name: "Folding"
        },
        {
            id: "3",
            image: require("../assets/Images/Laundry_two.jpg"),
            name: "Washing"
        },
        {
            id: "4",
            image: require("../assets/Images/Laundry_one.jpg"),
            name: "Putting"
        },
        {
            id: "5",
            image: require("../assets/Images/Laundry_four.jpg"),
            name: "Folding"
        },

    ];

    return (
        <View style={{ padding: 10 }}>
            <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 7}}>Services Available</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {services.map((services, index) => (
                    <Pressable style={{ margin: 10, backgroundColor: "white", padding: 20, borderRadius: 10 }} key={index}>
                        <Image source={services.image} style={{ width: 70, height: 70 }} />

                        <Text style={{textAlign: "center", marginTop: 10}}>{services.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

export default Services

const styles = StyleSheet.create({})