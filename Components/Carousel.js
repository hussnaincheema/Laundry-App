import { Slider, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const Images = [
    source=require("../assets/Images/Laundry_one.jpg"),
    source=require("../assets/Images/Laundry_three.jpg"),
    source=require("../assets/Images/Laundry_four.jpg")
  ]

  return(
    <SliderBox 
    images={Images}
    autoplay
    circleLoop
    dotColor={"#13274F"}
    inactiveDotColor={"#90A4AE"}
    ImageComponentStyle={{
        borderRadius: 6,
        width: "94%"
    }}
    />
  );
}

export default Carousel

const styles = StyleSheet.create({})