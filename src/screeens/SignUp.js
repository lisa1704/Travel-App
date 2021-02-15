import React, { useState } from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, TextInput } from "react-native"
import InputTaker from "../Reusable/InputTaker"
import { AntDesign } from '@expo/vector-icons'
import CurvedButtons from "../Reusable/CurvedButtons"
import ClearButton from "../Reusable/ClearButton"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import BackLogo from './../Reusable/BackLogo';

const iconsize = 17
const colorcode = "#606361"

const SignUp = (props) => {

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")


    return (


        <View>
            <View>
                <BackLogo />
                <Ionicons name="md-logo-react" size={150} color="white" style={styles.logoStyle}/>
            </View>
            {/* <Text style={{ fontSize: 28, fontWeight: "bold", alignSelf: "center", marginTop: 50 }}>Welcome To Myblog</Text> */}
            <View style={{marginTop:120}}>
                <Text style={{ alignSelf: "center", fontSize: 20, color: 'dimgray', fontWeight: "bold", marginLeft: 0, marginBottom: 10 }}>
                    Register Now!
            </Text>
            </View>

            <InputTaker
                leftIcon={<AntDesign name="user" size={iconsize} color={colorcode} />}
                placeholder=" Username"
                widthpass={300}
                heightpass={50}
                keyboardType="default"
                onChangeText={
                    function (currentInput) {
                        setName(currentInput)
                    }
                }
            >
            </InputTaker>

            <InputTaker
                leftIcon={<MaterialCommunityIcons name="email-outline" size={16} color={colorcode} />}
                placeholder=" Email-adreress"
                widthpass={300}
                heightpass={50}
                keyboardType="email-address"
                onChangeText={
                    function (currentInput) {
                        setEmail(currentInput)
                    }
                }
            >
            </InputTaker>

            <InputTaker
                leftIcon={<AntDesign name="lock" size={iconsize} color={colorcode} />}

                placeholder=" Password"
                widthpass={300}
                heightpass={50}
                keyboardType="default"
                onChangeText={
                    function (currentInput) {
                        setPassword(currentInput)
                    }
                }
                bool={true}
            >
            </InputTaker>

            <View style={{ marginTop: 40 }}>
                <CurvedButtons
                    title="Sign Up"
                    // style={styles.container}
                    onPress={
                        function () {

                            if (Name && Email && Password) {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(Email, Password)
                                    .then((userCreds) => {
                                        alert(userCreds)
                                        userCreds.user.updateProfile({ displayName: Name })
                                        console.log(userCreds)

                                        firebase
                                            .firestore()
                                            .collection("users")
                                            .doc(userCreds.user.uid)
                                            .set({
                                                name: Name,
                                                email: Email,
                                            })
                                            .then(() => {

                                                console.log(userCreds.user);
                                                props.navigation.navigate("SignIn");
                                            })
                                            .catch((error) => {
                                                alert(error);
                                            });
                                    })
                                    .catch((error) => {
                                        alert(error);
                                    });
                            } else {
                                alert("Fields can not be empty!");
                            }
                        }
                    }

                    color='#db5e40'
                    bgcolor='white'
                    widthpass={300}
                    heightpass={55}
                >
                </CurvedButtons>

            </View>
            <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", }}>


                <Text style={styles.TextStyle}>Already Have an Account?</Text>
                <ClearButton
                    title=" Sign In"
                    onPress={
                        function () {
                            props.navigation.navigate("SignIn")
                        }
                    }
                >
                </ClearButton>
            </View>

        </View>




    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            margin: 50
        },


        LogoText:
        {
            fontSize: 25,
            color: 'black',
            alignSelf: "center",
            marginTop: 30,
            marginBottom: 70,
            fontWeight: 'bold',
        },
        placeholdertext:
        {
            fontSize: 15,
            color: 'black',

        },

        passwordContainer: {
            flexDirection: 'row',
        },
        inputStyle: {
            flex: 1,
        },
        TextStyle: {
            fontSize: 16,
            justifyContent: "center",
            alignSelf: "center",
            elevation: 10,
            color: "dimgray"

        },
        logoStyle:{
            justifyContent:"center",
            alignSelf:"center",
            marginVertical:-140,
            paddingBottom:130
        }
    }
)

export default SignUp;