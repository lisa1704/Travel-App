import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
    Alert


} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { AuthContext } from "../Providers/AuthProvider"
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import activitiesData from '../../assets/data/activitiesData';
import discoverCategoriesData from '../../assets/data/discoverCategoriesData';
import learnMoreData from '../../assets/data/learnMoreData';
import discoverData from '../../assets/data/discoverData';
import { SafeAreaView } from 'react-native-safe-area-context';
import profile from '../../assets/images/person.png';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import CommentCard from '../Reusable/CommentCard'
import "firebase/firestore";
import * as firebase from "firebase"
import { Card, Button } from 'react-native-elements';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons';
import CurvedButtons from '../Reusable/CurvedButtons'
import InputTaker from '../Reusable/InputTaker'
Feather.loadFont();
Entypo.loadFont();
import BottomSheet from "react-native-gesture-bottom-sheet";
import PostTaker from '../Reusable/PostTaker';
import * as ImagePicker from 'expo-image-picker';
import TourGuide from './TourGuide';




const HomePage = ({ navigation }) => {
    const bottomSheet = useRef();
    const tourBottomSheet = useRef();

    const [postblog, setPostblog] = useState("");
    const [posts, setPosts] = useState([]);


    let durl = ""
    const colorcode = "#606361"
    const [selcted, setselected] = useState([])
    const [selectedItems, setItems] = useState([])
    const [location, setlocation] = useState("")
    const [download, setdownload] = useState("")
    const [detailsGroup, setDetail] = useState("")
    // input takers.
    const [Header, setHeaderName] = useState("")
    const [blog, setBlog] = useState("")
    // const {data} = props.name
    const [allGroups, setGroups] = useState([])
    const [costs, setCost] = useState(0)
    const [duration, setDuration] = useState(0)
    const [image, setImage] = useState("");
    const org = "#db5e40"
    let multiSelect = ""
    //const [image, setImage] = useState('https://dummyimage.com/200x300/e0e0e0/e8e8e8.jpg&text=upload');
    const [stars, setStars] = useState(0)
    // useEffect(() => {

    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Need Camera and Media Permisson');
    //             }
    //         }


    //         // setprops();


    //     })();
    // }, []);



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

            Alert.alert("Upload Image")

        }
        else {
            const response = await fetch(image)
            const blob = await response.blob()
            var ref = firebase.storage().ref().child("imagesGroup/" + Header)
            ref.put(blob).then(() => {
                ref.getDownloadURL().then((downloadURL) => {

                    firebase
                        .firestore()
                        .collection("groups")
                        .add({
                            groupOwner: auth.CurrentUser.uid,
                            groupname: Header,
                            details: detailsGroup,
                            url: downloadURL,
                            time: firebase.firestore.Timestamp.now(),
                        })
                        .then((docref) => {
                            firebase
                                .firestore()
                                .collection("groups").doc(docref.id).collection("members").doc(auth.CurrentUser.uid)
                                .set({
                                    name: auth.CurrentUser.displayName,
                                })
                                .then((docref) => {
                                    Alert.alert("DONE");
                                    //alert(auth.CurrentUser.sid)
                                })
                            //alert(auth.CurrentUser.sid)
                        })
                        .catch((error) => {
                            alert(error);
                        });


                }

                )
            })
                .catch((error) => {
                    Alert.alert(error)
                })
        }
    }



    const loadPosts = async () => {

        firebase
            .firestore()
            .collection("posts")
            .orderBy("time", "desc")
            .onSnapshot((querySnapshot) => {
                let temp_posts = [];
                querySnapshot.forEach((doc) => {
                    temp_posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setPosts(temp_posts);
            })


        firebase
            .firestore()
            .collection("groups")
            .orderBy("time", "desc")
            .onSnapshot((querySnapshot) => {
                let temp_data = [];
                querySnapshot.forEach((doc) => {
                    temp_data.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setGroups(temp_data);
            })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        loadPosts()
    }, []);


    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),

    });
    const renderDiscoverItem = ({ item }) => {
        const image = { uri: item.data.url };

        return (
            <AuthContext.Consumer>
                {(auth) => (

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('PlaceDetails', {
                                items: item,
                                auth_id: auth.CurrentUser.uid
                            })
                        }>
                        <ImageBackground

                            source={image}
                            style={[
                                styles.discoverItem,
                                { marginLeft: item.id === 'discover-1' ? 20 : 0 },
                            ]}
                            imageStyle={styles.discoverItemImage}>
                            <Text style={styles.discoverItemTitle}>{item.data.postheader}</Text>
                            <View style={styles.discoverItemLocationWrapper}>
                                <Entypo name="location-pin" size={18} color={colors.white} />
                                <Text style={styles.discoverItemLocationText}>{item.data.locationName}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            </AuthContext.Consumer>
        );
    };

    const renderActivityItem = ({ item }) => {

        return (

            <View
                style={[
                    styles.activityItemWrapper,
                    {
                        marginLeft: item.id === 'activities-1' ? 20 : 0,
                    },
                ]}>
                <Image source={item.image} style={styles.activityItemImage} />
                <Text style={styles.activityItemText}>{item.title}</Text>
            </View>


        );
    };



    const renderLearnMoreItem = ({ item }) => {

        const imagecover = { uri: item.data.url };

        return (
            <AuthContext.Consumer>
                {(auth) => (

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Groups', {
                                items: item,
                                auth_id: auth.CurrentUser.uid

                            })
                        }>
                        <ImageBackground
                            source={imagecover}
                            style={[
                                styles.learnMoreItem,
                                {
                                    marginLeft: item.id === 'learnMore-1' ? 10 : 0,
                                },
                            ]}
                            imageStyle={styles.learnMoreItemImage}>
                            <Text style={styles.learnMoreItemText}>{item.data.groupname}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            </AuthContext.Consumer>
        );
    };


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {


        return (

            <AuthContext.Consumer>
                {(auth) => (

                    <View style={styles.container}>
                        <ScrollView>
                            {/* Header */}
                            <SafeAreaView>
                                <View style={styles.menuWrapper}>
                                    
                                    {/* <Image source={profile} style={styles.profileImage} /> */}
                                    <Text style={{ fontWeight: "200", fontSize: 20,fontWeight:"bold" }}> {auth.CurrentUser.displayName} </Text>


                                </View>
                            </SafeAreaView>

                            {/* Discover */}
                            <View style={styles.discoverWrapper}>
                                <Text style={styles.discoverTitle}>Discover</Text>
                                <View style={styles.discoverCategoriesWrapper}>
                                    <Text style={[styles.discoverCategoryText, { color: colors.orange }]}>
                                        All
            </Text>
                                    <Text style={styles.discoverCategoryText}>Destinations</Text>
                                    <Text style={styles.discoverCategoryText}>Cities</Text>
                                    <Text style={styles.discoverCategoryText}>Experiences</Text>
                                </View>
                                <View style={styles.discoverItemsWrapper}>
                                    <FlatList
                                        data={posts}
                                        renderItem={renderDiscoverItem}
                                        keyExtractor={(item) => item.id}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            </View>

                            {/* Activities */}
                            <View style={styles.activitiesWrapper}>
                                <Text style={styles.activitiesTitle}>Popular Categories</Text>
                                <View style={styles.activitiesItemsWrapper}>
                                    <FlatList
                                        data={activitiesData}
                                        renderItem={renderActivityItem}
                                        keyExtractor={(item) => item.id}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            </View>

                            {/* Learn More */}
                            <View style={styles.learnMoreWrapper}>
                                <Text style={styles.learnMoreTitle}>Join New Group</Text>

                                <TouchableOpacity

                                    onPress={
                                        () => {

                                            bottomSheet.current.show()
                                            console.log(allGroups)

                                        }
                                    }

                                >


                                    <Card containerStyle={styles.cardViewStyle}>
                                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 1 }}>
                                            <Entypo name="plus" size={24} color="#fff" style={{ paddingTop: 3 }} />
                                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff',alignSelf:"center", }}> Create New Group</Text>
                                        </View>




                                    </Card>



                                </TouchableOpacity>

                                <BottomSheet hasDraggableIcon ref={bottomSheet} height={450}>



                                    <ScrollView contentContainerStyle={{ flex: 1, marginBottom: 5, justifyContent: "flex-end" }} >



                                        <InputTaker
                                            leftIcon={<FontAwesome name="group" size={18} color="gray" />}
                                            placeholder="Name Your Group."
                                            widthpass={300}
                                            heightpass={50}
                                            keyboardType="default"
                                            onChangeText={
                                                function (currentInput) {
                                                    setHeaderName(currentInput)
                                                }
                                            }
                                        >

                                        </InputTaker>


                                        <PostTaker
                                            leftIcon={<FontAwesome name="group" size={18} color="gray" />}
                                            placeholder=" Details of Group."
                                            widthpass={300}
                                            heightpass={180}
                                            keyboardType="default"
                                            onChangeText={
                                                function (currentInput) {
                                                    setDetail(currentInput)
                                                }
                                            }
                                        >
                                        </PostTaker>



                                        <View style={{ marginTop: 20, alignSelf: "center", width: 300 }}>
                                            <Button
                                                buttonStyle={{ borderRadius: 15, backgroundColor: '#db5e40', }}
                                                icon={{
                                                    name: "photo",
                                                    size: 20,
                                                    color: "white"
                                                }}
                                                title="Group Cover Photo "
                                                raised={true}
                                                onPress={pickImage}

                                            />
                                        </View>
                                        <View style={{ marginTop: 20, marginBottom: 20, }}>
                                            <CurvedButtons
                                                title="Create Group"


                                                color='#db5e40'
                                                bgcolor='white'
                                                widthpass={310}
                                                heightpass={45}
                                                onPress={() => uploadImage(auth)}

                                            >
                                            </CurvedButtons>
                                        </View>






                                    </ScrollView>
                                </BottomSheet>
                                <View style={styles.learnMoreItemsWrapper}>

                                    <FlatList
                                        data={allGroups}
                                        renderItem={renderLearnMoreItem}
                                        keyExtractor={(item) => item.id}
                                        horizontal
                                    />
                                </View>

                            </View>



                            <View style={styles.tourGuideWrapper}>
                                <Text style={styles.tourGuideTitle}>Hire a Tour Guide</Text>

                                <TouchableOpacity

                                    onPress={
                                        () => {

                                            tourBottomSheet.current.show()
                                            //console.log(allGroups)

                                        }
                                    }

                                >

                                    <Card containerStyle={styles.tourCardViewStyle}>
                                        <View style={{
                                            flexDirection: "row", justifyContent: "center", marginBottom: 5,
                                            paddingBottom: 10,
                                            marginRight: 10,
                                            backgroundColor: 'white'
                                        }}>
                                            {/* <Entypo name="call" size={24} color="black" style={{ paddingTop: 3 }} /> */}
                                            <MaterialIcons name="contact-page" size={32} color='#db5e40' style={{ paddingBottom: 10 }} />
                                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#db5e40',marginVertical:4 }}> Contacts</Text>
                                        </View>

                                    </Card>

                                </TouchableOpacity>
                                <BottomSheet hasDraggableIcon ref={tourBottomSheet} height={450}>
                                    <TourGuide />

                                </BottomSheet>
                            </View>
                        </ScrollView>
                    </View>
                )}
            </AuthContext.Consumer>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: colors.white,
    },

    cardViewStyle: {
        // justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: "#db5e40",
        height: 60,
        width: 400,
    },

    menuWrapper: {
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 10,
    },
    discoverWrapper: {
        // marginHorizontal: 20,
        marginTop: 20,
    },
    discoverTitle: {
        marginHorizontal: 20,
        fontFamily: 'Lato-Bold',
        fontSize: 32,
    },
    discoverCategoriesWrapper: {
        marginHorizontal: 20,
        flexDirection: 'row',
        marginTop: 20,
    },
    discoverCategoryText: {
        marginRight: 30,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.gray,
    },
    discoverItemsWrapper: {
        paddingVertical: 20,
        marginLeft: 10
    },
    discoverItem: {
        width: 170,
        height: 250,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginRight: 20,
    },
    discoverItemImage: {
        borderRadius: 20,

    },
    discoverItemTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.white,
    },
    discoverItemLocationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    discoverItemLocationText: {
        marginLeft: 5,
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: colors.white,
    },
    activitiesWrapper: {
        marginTop: 10,
    },
    activitiesTitle: {
        marginHorizontal: 20,
        fontFamily: 'Lato-Bold',
        fontSize: 24,
        color: colors.black,
    },
    activitiesItemsWrapper: {
        paddingVertical: 20,

    },
    activityItemWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 20,

    },
    activityItemImage: {
        width: 36,
    },
    activityItemText: {
        marginTop: 5,
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: colors.gray,
    },
    learnMoreWrapper: {
        marginTop: 10,
    },
    learnMoreTitle: {
        marginHorizontal: 20,
        fontFamily: 'Lato-Bold',
        fontSize: 24,
        color: colors.black,
    },
    learnMoreItemsWrapper: {
        paddingVertical: 20,
    },
    learnMoreItem: {
        width: 170,
        height: 180,
        justifyContent: 'flex-end',
        marginRight: 20,
    },
    learnMoreItemImage: {
        borderRadius: 20,
    },
    learnMoreItemText: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.white,
        marginHorizontal: 10,
        marginVertical: 20,
    },
    tourCardViewStyle: {
        // justifyContent: 'center',
        borderRadius: 15,
        height: 64,
        width: 365,
        marginLeft: 18,
        backgroundColor: '#fff'

    },
    tourGuideWrapper: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        backgroundColor: "#e3e3e3",
        height: 150,
        width: 400,
        paddingTop: 15,
        paddingBottom: 50,
    },
    tourGuideTitle: {
        marginHorizontal: 20,
        fontFamily: 'Lato-Bold',
        fontSize: 24,
        color: colors.black,
        paddingLeft: 0
    },
});

export default HomePage;
