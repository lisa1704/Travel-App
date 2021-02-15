import React, { useState } from "react";
import { View, StyleSheet, ScrollView,ImageBackground  } from "react-native";
import { Input, Button, Card, Text } from "react-native-elements";
import CreditCardForm from '../Reusable/CreditCardForm';
import * as firebase from "firebase";
import "firebase/firestore";

const BookingInfo = (props) => {
    return (
        <ImageBackground
        source={require("../../assets/images/OC.jpg")}
        style={{ height: 900, width: 450 }}>
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Credit Card Information</Text>
            <CreditCardForm/>
        </ScrollView>
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    content: {
        paddingTop: 76,
        paddingHorizontal: 36,
    },
    title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#db5e40",
    alignSelf: "center",
    marginVertical: 0,
    paddingRight:0,
    justifyContent:"center"
    },
});

export default BookingInfo;