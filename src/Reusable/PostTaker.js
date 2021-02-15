import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { AntDesign } from '@expo/vector-icons';

const PostTaker = (props) => {
    return (

        <View style={[styles.inputstyle, { width: props.widthpass, height: props.heightpass}]}>

            <View >
            {props.leftIcon}
            </View>

            <TextInput
               multiline={true}
               style={{ width: props.widthpass, height: props.heightpass, paddingBottom: 20,fontSize:17}}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                keyboardType= {props.keyboardType}
                numberOfLines={20}
                textAlignVertical="top"
                textAlign="left"
                textBreakStrategy="balanced"
                               // maxLength = {20}
            >

            </TextInput>
        </View>
    )

}



const styles = StyleSheet.create(
    {
        inputstyle: {
            borderRadius: 10,
            backgroundColor: '#dedede',
            padding: 10,
            margin: 5,
            alignSelf: "center",
            flexDirection:"row"

        },


    }
)


export default PostTaker