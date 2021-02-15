import React, { useState } from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, TextInput, FlatList } from "react-native"
import InputTaker from "../Reusable/InputTaker"
import { AntDesign } from '@expo/vector-icons'
import CurvedButtons from "../Reusable/CurvedButtons"
import ClearButton from "../Reusable/ClearButton"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import 'firebase/firestore'
import { FontAwesome } from '@expo/vector-icons';
import Entypo from 'react-native-vector-icons/Entypo';
import LocationData from "../../assets/data/LocationData"



const Text_view = () => {



    return (
        <View style={{ marginTop: 80 }}>
            <Text style={{ justifyContent: "center", alignSelf: "center", fontSize: 23, color: "#db5e40" }}>
                Search for Location.
</Text>
        </View>
    )
}

const Flat_view = () => {
    return (
        <View style={{ marginTop: 80 }}>
            <Text style={{ justifyContent: "center", alignSelf: "center", fontSize: 23, color: "#db5e40" }}>
                Search box is fulled.
</Text>
        </View>
    )
}
const FlatListItemSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#db5e40"
                ,
            }}
        />
    );
}

const LocationPicker = (props) => {



    const iconsize = 17
    const colorcode = "#606361"



    const [Location, setLocation] = useState("")

    const filteredData = (Location)
        ? LocationData.filter(x =>
            x.key.toLowerCase().includes(Location.toLowerCase())
        )
        : LocationData;

    return (
        <View style={styles.container}>

            <View style={{ marginTop: 90, }}>
                <InputTaker

                    leftIcon={<FontAwesome name="search" size={22} color="#db5e40" />}
                    placeholder="  Search location"
                    widthpass={320}
                    heightpass={50}
                    keyboardType="default"
                    onChangeText={
                        function (currentInput) {
                            setLocation(currentInput)
                            // console.log(Location)
                        }
                    }

                >

                </InputTaker>
            </View>




            {Location == "" ? <Text_view /> : 


            <View style={styles.MainContainer} >



                <FlatList
                    ItemSeparatorComponent={FlatListItemSeparator}

                    data={filteredData}
                    renderItem={({ item }) => (


                        <TouchableOpacity
                            onPress={
                                function () {
                                    console.log(item.key)
                                    props.navigation.navigate('PostPage',{item:props.route.params.item,location: item.key });

                                }
                            }

                        >

                            <View style={{ flexDirection: "row" }}>
                                <Entypo name="location-pin" size={22} color="gray" style={{        paddingTop: 10,paddingBottom: 10}}/>
                                <Text style={styles.item}


                                >{item.key}</Text>

                            </View>


                        </TouchableOpacity>

                    )}
                />

            </View>
}

        </View>



    )
}

const styles = StyleSheet.create({

    MainContainer: {

        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        margin: 10

    },

    item: {
        padding: 10,
        fontSize: 18,
        height: 44,

    },
    container: {
        flex: 1,
        padding: 20,
        flexDirection: "column"
    },
});

export default LocationPicker

// export default class LocationPicker extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         searchText: '',
//       };
//     }

//     render() {
//       //Data can be coming from props or any other source as well
//       const data = [
//         { key: 'Tiago' },
//         { key: 'Ricardo xxxxxxxxx' },
//         { key: 'Beatriz' },
//         { key: 'Miguel' },
//         { key: 'Simão' },
//         { key: 'David' },
//       ];

//       const filteredData = this.state.searchText
//         ? data.filter(x =>
//             x.key.toLowerCase().includes(this.state.searchText.toLowerCase())
//           )
//         : data;

//       return (
//         <View >
//           <View>
//             <Text >Home</Text>
//           </View>
//           <View >
//             <TextInput
//               underlineColorAndroid="rgba(0,0,0,0)"
//               placeholderTextColor="white"
//               selectionColor="black"
//               keyboardType="default"
//               onChangeText={text => this.setState({ searchText: text })}
//               value={this.state.searchText}
//             />
//           </View>
//           <View >
//             <FlatList
//               data={filteredData}
//               renderItem={({ item }) => (
//                 <Text >{item.key}</Text>
//               )}
//             />
//           </View>
//         </View>
//       );
//     }
//   }

