import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
    Alert

} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { Entypo, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Button } from 'react-native-elements';





function TourGuide() {
    const bottomSheet = useRef();
    showAlert = () => {
        Alert.alert(
            'Do you want to call?',
            'Will redirect to direct call...',
            [
                { text: 'Yes', onPress: () => console.log('Yes button clicked') },
                { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }
    return (
        <SafeAreaProvider>
            <ScrollView>
                <Card containerStyle={{ borderRadius: 14 }}>
                    {/* <Text style={{ fontSize: 20 }}> Phone: </Text> */}
                    <View style={{ paddingLeft: 40, paddingBottom: 15, paddingTop: 5 }} >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}> +8801865389786</Text>
                    </View>

                    <View style={styles.mainWrapper}>
                        <Button
                            buttonStyle={{ backgroundColor: 'white', height: 45, width: 200, borderRadius: 15, borderColor: '#db5e40', borderWidth: 2 }}
                            title='  Call Now'
                            titleStyle={{ fontSize: 22, fontWeight: 'bold', color: '#db5e40', backgroundColor: 'white', paddingRight: 10 }}
                            icon={<Feather name="phone-call" size={32} color='#db5e40' style={{ paddingTop: 2 }} />}
                            onPress={showAlert} />

                    </View>
                </Card>



                <Card containerStyle={{ borderRadius: 14 }}>
                    <View style={{
                        flexDirection: "row", justifyContent: "center", marginBottom: 5,
                        marginRight: 10,
                        backgroundColor: 'white'
                    }}>
                        <AntDesign name="facebook-square" size={26} color='#db5e40' style={{ paddingTop: 2 }} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#db5e40', }}> Connect with Facebook</Text>
                    </View>

                </Card>

                <Card containerStyle={{ borderRadius: 14 }}>
                    <View style={{
                        flexDirection: "row", justifyContent: "center", marginBottom: 5,
                        marginRight: 10,
                        backgroundColor: 'white'
                    }}>
                        {/* <AntDesign name="facebook-square" size={26} color='#db5e40' style={{ paddingTop: 2 }} /> */}
                        <Entypo name="mail" size={26} color='#db5e40' style={{ paddingTop: 2 }} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#db5e40', }}> Connect with G-mail</Text>
                    </View>

                </Card>
            </ScrollView>
        </SafeAreaProvider>
    )
};
const styles = StyleSheet.create({
    tourCardViewStyle: {
        height: 60,
        width: 300,
        marginLeft: 18,
        backgroundColor: 'white'

    },
    mainWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    }
})

export default TourGuide;