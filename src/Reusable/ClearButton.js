import React from "react"
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native"



const ClearButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={[styles.TextStyle]}>
                {props.title}
            </Text>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create(
    {
        TextStyle: {
            fontSize: 16,
            justifyContent: "center",
            alignSelf: "center",
            elevation: 10,
            color:'#db5e40',
            fontWeight:"bold"        
        },


    }
)


export default ClearButton