import React, { useState } from "react"
import { Card, Input } from 'react-native-elements';

import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native";

const PostCards = (props) => {
    const useStackNavigation = useNavigation();

    return (

        <Card containerStyle={styles.cardViewStyle}>
            <View >

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', paddingLeft: 2 }}> {props.name}</Text>
            </View>
            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 5 }}>
                {props.comment}
            </Text>



        </Card>







    )

}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },


        cardViewStyle: {
            // justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: "#e3e3e3",
            height: 100,
            width: 330,



        },
    })
export default PostCards


