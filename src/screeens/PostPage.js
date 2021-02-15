import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Alert,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Input, Button, Card, Tile } from 'react-native-elements';
import CurvedButtons from '../Reusable/CurvedButtons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase'
import InputTaker from '../Reusable/InputTaker';
import PostTaker from '../Reusable/PostTaker';
import CategoryPicker from '../screeens/CategoryPicker'
import PhotoComponent from '../Reusable/PhotoComponent';
import LocationPicker from '../screeens/LocationPicker';
import MultiSelect from 'react-native-multiple-select';
import "firebase/firestore";
import { AuthContext } from "../Providers/AuthProvider"
import StarRating from 'react-native-star-rating';
import { or } from 'react-native-reanimated';

const PostPage = (props) => {

    let durl = ""
    const colorcode = "#606361"
    const [selcted, setselected] = useState([])
    const [selectedItems, setItems] = useState([])
    const [location, setlocation] = useState("")
    const [download, setdownload] = useState("")

    // input takers.
    const [Header, setHeaderName] = useState("")
    const [blog, setBlog] = useState("")
    // const {data} = props.name
    const [costs,setCost] = useState(0)
    const [duration,setDuration] = useState(0)
    const [image, setImage] = useState("");
    const org = "#db5e40"
    let multiSelect = ""
    //const [image, setImage] = useState('https://dummyimage.com/200x300/e0e0e0/e8e8e8.jpg&text=upload');
    const [stars, setStars] = useState(0)
    useEffect(() => {

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Need Camera and Media Permisson');
                }
            }


            // setprops();
            setselected(props.route.params.item)

        })();
    }, []);


    const onSelectedItemsChange = (selectedItems) => {
        setItems(selectedItems)

    };


    const setprops = () => {

        setselected(props.route.params.item)


    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [7, 7],
            quality: 1,
        });




        // console.log(result);

        if (!result.cancelled) {

            setImage(result.uri)
        }
    };

    const uploadImage = async (auth) => {
        if (image == "") {
            console.log(selcted)

            console.log(location)


        }
        else {
            const response = await fetch(image)
            const blob = await response.blob()
            var ref = firebase.storage().ref().child("images/" + Header)
            ref.put(blob).then(() => {
                ref.getDownloadURL().then((downloadURL) => {
                    if (Header && blog && costs && duration && ((props.route.params.item).length != 0 && (props.route.params.location != ""))) {
 
                        firebase
                            .firestore()
                            .collection("posts")
                            .add({
                                userId: auth.CurrentUser.uid,
                                author: auth.CurrentUser.displayName,
                                postheader: Header,
                                postbody: blog,
                                url: downloadURL,
                                time: firebase.firestore.Timestamp.now(),
                                categories: props.route.params.item,
                                locationName: props.route.params.location,
                                costing: costs,
                                durations: duration,
                                rating: stars
                            })
                            .then((docref) => {
                                //setHeaderName("")
                                Alert.alert("Post Created");
 
                                props.navigation.navigate("HomePage")
                                //alert(auth.CurrentUser.sid)
 
 
                            })
                            .catch((error) => {
                                alert(error);
                            });
 
 
                    }
                    else {
                        Alert.alert("Please Fill up Necessary Sections")
                    }
                }

                )
            })
                .catch((error) => {
                    Alert.alert(error)
                })
        }
    }

    return (


        <AuthContext.Consumer>
            {(auth) => (



                <ScrollView>


                    <Card containerStyle={styles.cardViewStyle}>
                        <View>
                            <Text style={{ alignSelf: "flex-start", fontSize: 20, color: 'dimgray', fontWeight: "bold", marginBottom: 10 }}>
                                Post!
                            </Text>
                        </View>

                        <PostTaker
                            leftIcon={<Entypo name="location-pin" size={22} color={colorcode} />}
                            placeholder="Headline of blog."
                            widthpass={300}
                            heightpass={50}
                            keyboardType="default"
                            onChangeText={
                                function (currentInput) {
                                    setHeaderName(currentInput)
                                }
                            }
                        >
                        </PostTaker>


                        <PostTaker
                            leftIcon={<Entypo name="location-pin" size={22} color={colorcode} />}
                            placeholder="Share your recent adventure."
                            widthpass={300}
                            heightpass={160}
                            keyboardType="default"
                            onChangeText={
                                function (currentInput) {
                                    setBlog(currentInput)
                                }
                            }
                        >
                        </PostTaker>

                        <InputTaker
                            leftIcon={<FontAwesome name="dollar" size={20} color={colorcode}/> }
                            placeholder="Cost Per Person."
                            widthpass={300}
                            heightpass={50}
                            keyboardType="number-pad"
                            onChangeText={
                                function (currentInput) {
                                    setCost(currentInput)
                                }
                            }
                        >
                        </InputTaker>
                        <InputTaker
                            leftIcon={<Ionicons name="md-time" size={20} color={colorcode} />}
                            placeholder="Duration in hours."
                            widthpass={300}
                            heightpass={50}
                            keyboardType="number-pad"
                            onChangeText={
                                function (currentInput) {
                                    setDuration(currentInput)
                                }
                            }
                        >
                        </InputTaker>

                        <View style={{ marginTop: 10, height: 30, flexDirection: 'row' }}>
                            <Button
                                buttonStyle={{ borderRadius: 15, width: 130, height: 30, borderColor: org, color: org, borderWidth: 1, alignContent: "center", paddingBottom: 10, paddingRight: 15 }}
                                icon={{
                                    name: "list",
                                    size: 20,
                                    color: "gray"
                                }}
                                title="Category"
                                titleStyle={{ color: "#db5e40" }}
                                type="outline"

                                onPress={
                                    function () {
                                        setlocation(props.route.params.location)

                                        props.navigation.navigate("CategoryPicker")
                                    }
                                }
                            />

                            <Button
                                buttonStyle={{ borderRadius: 15, width: 130, height: 30, borderColor: org, color: org, marginLeft: 35, borderWidth: 1, paddingBottom: 10, paddingRight: 15 }}
                                icon={{
                                    name: "location-pin",
                                    size: 20,
                                    color: "gray"
                                }}
                                title="Location"
                                titleStyle={{ color: "#db5e40" }}
                                type="outline"

                                onPress={
                                    function () {
                                        props.navigation.navigate("LocationPicker", { item: props.route.params.item })

                                    }
                                }
                            />

                        </View>

                        <View style={{ width: 250, alignSelf: "center",marginTop:20 }}>

                            <StarRating
                                fullStarColor= {org}
                                
                                disabled={false}
                                maxStars={5}
                                starSize={30}
                                rating={stars}
                                halfStarEnabled={true}
                                selectedStar={(rating) => setStars(rating)}

                            />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Button
                                buttonStyle={{ borderRadius: 15, backgroundColor: '#db5e40', }}
                                icon={{
                                    name: "photo",
                                    size: 20,
                                    color: "white"
                                }}
                                title="Upload Image"
                                raised={true}
                                onPress={pickImage}
                            />
                        </View>




                    </Card>

                    <FlatList
                        style={{ marginTop: 20, marginRight: 20, marginLeft: 10 }}
                        data={props.route.params.item}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}


                        renderItem={({ item }) => {

                            return (
                                <View style={{ marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 15, borderWidth: 1, borderRadius: 15, borderColor: org, padding: 5, }}> {item}</Text>
                                </View>
                            )
                        }
                        }
                    />
                    <View style={{ marginTop: 20, marginRight: 20, marginLeft: 15, alignContent: "center", alignSelf: "center", width: 200 }}
                    >

                        {props.route.params.location == "" ? <Text style={{ fontSize: 15, borderWidth: 1, borderRadius: 15, borderColor: org, padding: 5, textAlign: "center" }}>
                            Choose Location
                    </Text> : <Text style={{ fontSize: 15, borderWidth: 1, borderRadius: 15, borderColor: org, padding: 5, textAlign: "center" }}>
                                {props.route.params.location}
                            </Text>}


                    </View>



                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <CurvedButtons
                            title="Post"
                            style={styles.container}
                            onPress=
                            {() => uploadImage(auth)}


                            color='#db5e40'
                            bgcolor='white'
                            widthpass={310}
                            heightpass={45}
                        >
                        </CurvedButtons>
                    </View>








                </ScrollView>
            )}
        </AuthContext.Consumer>
    )
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },


        cardViewStyle: {
            // justifyContent: 'center',
            borderRadius: 20,
            elevation: 5,
            marginTop: 100,
            height: 580,
            width: 330


        },
    })

export default PostPage;