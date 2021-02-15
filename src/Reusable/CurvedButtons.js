import React from "react"
import { Text, StyleSheet, View, Pressable} from "react-native"


const CurvedButtons = (props) => {

    return (  
        <View style={styles.buttonView}>
        <Pressable
          onPress={props.onPress}
          android_ripple=   {{color: '#5c5b5a', borderless: true}}
          style={[styles.Button,{backgroundColor:props.color,width:props.widthpass,height:props.heightpass}]}>
          <Text style={[styles.text,{color:props.bgcolor,paddingBottom:7}]}>{props.title}</Text>
        </Pressable>
      </View>
    )

}

const styles = StyleSheet.create(
    {
        text: {
            fontSize: 22,
            fontWeight:"bold"
        },
        buttonView: {            
            borderRadius:15,
            elevation: 5,
            margin:5,
            alignSelf:"center"
            
          },
          Button: {
            //backgroundColor:'white',
            height: 40,
            borderRadius: 15,
            width:200,
            alignItems: 'center',
            justifyContent: 'center',
          },
         

    }
)

export default CurvedButtons