import React from "react"
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native"


const OutlineButton = (props) => {

  return (
    <TouchableOpacity
        onPress={
          props.onPress
        }>
    <View style={{ justifyContent: "center", alignSelf: "center", width: props.width , borderRadius: 10, borderColor: "black", borderWidth: 1, height: props.height, backgroundColor:props.bccolor }}>
      

      
        <Text style={[styles.text,{fontSize:props.fontSize,color:props.textcolor}]}>{props.Text}</Text>

     

    </View>
     </TouchableOpacity>
  )
}

const styles = StyleSheet.create(
  {
    text: {
      justifyContent: "center",
      alignSelf: "center",
      alignContent: "center",
      marginBottom: 5


    },


  }
)

export default OutlineButton