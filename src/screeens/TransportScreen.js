import React from 'react';
import { View, Text, StyleSheet, Alert, Modal, Image, ImageBackground,StatusBar, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Header } from "react-native-elements";
import BackgroundCurve from '../Reusable/BackgroundCurve';

const TransportScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BackgroundCurve style={styles.svg}/>
            <View style={styles.viewStyle}>
                <Text style={styles.heading}>{`Explore your \ntransport options`}</Text>
            </View>
            <ScrollView horizontal={true}>
            <TouchableOpacity onPress={() =>{
            navigation.navigate('AirBook')
            }}>
            <ImageBackground
                source={require("../../assets/images/del.jpg")}
                style={styles.discoverItem}
                imageStyle={styles.discoverItemImage}
                blurRadius={0}
            >
            <Text style={styles.textStyle}>Airplane</Text>
            </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{
            navigation.navigate('TrainBook')
            }}>
            <ImageBackground
                source={require("../../assets/images/trainnn.jpg")}
                style={styles.discoverItem}
                imageStyle={styles.discoverItemImage}
            >
            <Text style={styles.textStyle}>Train</Text>
            </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{
            navigation.navigate('BusBook')
            }}>
            <ImageBackground
                source={require("../../assets/images/bus.jpg")}
                style={styles.discoverItem}
                imageStyle={styles.discoverItemImage}
            >
            <Text style={styles.textStyle}>Bus</Text>
            </ImageBackground>
        </TouchableOpacity>
        </ScrollView>
        </View>

);
};
const styles= StyleSheet.create({
    discoverItem: {
        width: 350,
        height: 400,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginRight: 20,
    },
    discoverItemImage: {
        borderRadius: 20,
    },
    container:{
        flex:1,
        position:'relative'
    },
    svg:{
        position:'absolute',
        width: Dimensions.get('window').width
    },
    heading:{
        fontSize:32,
        fontWeight:"bold",
        top:-130,
        paddingLeft:10,
        alignSelf:'center',
        color:"#fff",
        textAlign:'center'
    },
    viewStyle:{
        alignContent:'center'
    },
    textStyle:{
       fontSize:40,
       fontWeight:"bold",
       color:"white",
       textAlign:'center',
       marginTop:150,
       textDecorationLine:"underline",
       textDecorationColor: "#db5e40",
        textShadowColor: "black",
        textShadowRadius: 5,
        margin: 24,
        letterSpacing:2,
        textShadowOffset:{width:1,height:1}
        
    }
})
export default TransportScreen;