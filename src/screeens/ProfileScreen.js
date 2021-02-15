import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image, ScrollView, ImageBackground } from "react-native";
import { Input, Button, Card, Tile, Text, Header, Avatar } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import colors from '../../assets/colors/colors';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../Providers/AuthProvider";
import CurvedButtons from '../Reusable/CurvedButtons';
import PlaceDetails from '../screeens/PlaceDetails';
import UploadImage from '../Reusable/UploadImage';
import * as firebase from "firebase";
import "firebase/firestore";
import { getDataJSON,  } from "../Functions/AsynchronousStorageFunctions";



const ProfileScreen = (props) => {
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    // const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [Birthdate, setBirthdate] = useState("");
    const [currentCity, setCurrentCity] = useState("");
    const [workPlace, setWorkPlace] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
    



    const loadPosts = async () => {
        //console.log(userId)

        firebase
            .firestore()
            .collection("posts")
            .orderBy("time", "desc")
            .onSnapshot((querySnapshot) => {
                let temp_posts = [];
                let count=0;
                querySnapshot.forEach((doc) => {
                    if (doc.data().userId == userId) {
                        //console.log(doc.data().userId)
                        temp_posts.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                        count = count + 1
                        //console.log(count)
                     }
                });
                setPosts(temp_posts);
                setNumberOfPosts(count)
            })
            .catch((error) => {
                alert(error);
            });
        // }
    }
    //console.log(props)
    const LoadData = async () => {
        setIsLoading(true);
        firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .onSnapshot((querySnapShot) => {
                setIsLoading(false);
                setBirthdate(querySnapShot.data().birthdate);
                setCurrentCity(querySnapShot.data().currentCity);
                setWorkPlace(querySnapShot.data().workPlace);
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            })
    }

    const getUserId = async () => {
        await getDataJSON("mail").then((data) => {
          if (data == null) {
            setUserId("");
          } else setUserId(data);
        });
      }

    useEffect(() => {
        loadPosts();
        LoadData();
    }, [userId]);
    useEffect(() => {
        getUserId();
    },[] );


    let postsButton = " ";
    postsButton = numberOfPosts.toString();


    const renderDiscoverItem = ({ item }) => {
        const image = { uri: item.data.url };

        return (
            <AuthContext.Consumer>
                {(auth) => (

                    <TouchableOpacity
                        onPress={() =>

                            props.navigation.navigate('PlaceDetails', {

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

    return (
        <AuthContext.Consumer>
            {(auth) => (


                <SafeAreaView style={styles.container}>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Header
                            backgroundColor="#fff"
                            leftComponent={{
                                icon: "menu",
                                color: "black",
                                size: 40,
                                onPress: function () {
                                    props.navigation.toggleDrawer();
                                },
                            }}
                            //centerComponent={{ text: "The Office", style: { color: "#fff" } }}
                            rightComponent={{
                                icon: "lock-outline",
                                color: "black",
                                size: 30,
                                onPress: function () {
                                    console.log(auth.setisLoggedin())
                                    firebase
                                        .auth()
                                        .signOut()
                                        .then(() => {
                                            auth.setisLoggedin(false);
                                            auth.setCurrentUser({});
                                        })
                                        .catch((error) => {
                                            alert(error);
                                        })
                                },
                            }}
                        />

                        <View>
                            <UploadImage props={props} />
                            {/* <Text style={{ fontSize: 30, color: '#152a38', marginBottom: 20, marginTop:-60 }}> {auth.CurrentUser.name} </Text> */}
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> {auth.CurrentUser.displayName} </Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{auth.CurrentUser.email}</Text>
                        </View>



                        <View style={styles.statsContainer}>

                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>20</Text>
                                <Text style={[styles.text, styles.subText]}>Media</Text>
                            </View>

                            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                                <Text style={[styles.text, { fontSize: 24 }]}>454</Text>
                                <Text style={[styles.text, styles.subText]}>Followers</Text>
                            </View>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                                <Text style={[styles.text, styles.subText]}>Following</Text>
                            </View>
                        </View>


                        <View >
                            <View style={styles.stats2Container}>
                                <MaterialIcons name="date-range" size={28} color="#52575D" />
                                <Text style={styles.EditedTextStyle, { fontSize: 20, paddingLeft: 10, color: "#52575D", }}>Born On {Birthdate}  </Text>
                            </View>
                            <View style={styles.stats2Container}>
                                <FontAwesome name="home" size={28} color="#52575D" />
                                <Text style={styles.EditedTextStyle, { fontSize: 20, paddingLeft: 10, color: "#52575D", }}>Currently lives in {currentCity} </Text>
                            </View>
                            <View style={styles.stats2Container}>
                                <Entypo name="suitcase" size={24} color="#52575D" />
                                <Text style={styles.EditedTextStyle, { fontSize: 20, paddingLeft: 10, color: "#52575D", }}>Works at {workPlace} </Text>
                            </View>

                        </View>

                        <View style={styles.discoverWrapper}>

                            <View style={styles.discoverItemsWrapper} >

                                <FlatList
                                    data={posts}
                                    renderItem={renderDiscoverItem}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />

                            </View>
                            <View style={styles.mediaCount}>
                                <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>{postsButton}</Text>
                                <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Posts</Text>
                            </View>
                        </View>

                        <Card>
                            <View style={styles.editWrapper}>
                                <Text style={{ fontSize: 20, color: "#6b778d" }}> Edit Profile Details </Text>
                                <Entypo name="edit" size={20} color="#6b778d" />
                            </View>
                            <Card.Divider />
                            <Input leftIcon={<FontAwesome name="calendar" size={24} color="#DFD8C8" />}
                                placeholder='Add Birth Date'
                                onChangeText={function (currentInput) {
                                    setBirthdate(currentInput);
                                }}
                            />

                            <Input leftIcon={<FontAwesome name="address-card" size={24} color="#DFD8C8" />}
                                placeholder='Add Current City'
                                onChangeText={function (currentInput) {
                                    setCurrentCity(currentInput);
                                }}
                            />
                            <Input leftIcon={<Entypo name="suitcase" size={24} color="#DFD8C8" />}
                                placeholder="Add Work Place"
                                onChangeText={function (currentInput) {
                                    setWorkPlace(currentInput);
                                }}
                            />
                            <CurvedButtons
                                title="Update"
                                onPress={
                                    function () {
                                        firebase
                                            .firestore()
                                            .collection('users')
                                            .doc(auth.CurrentUser.uid)
                                            .set(
                                                {
                                                    birthdate: Birthdate,
                                                    currentCity: currentCity,
                                                    workPlace: workPlace

                                                },
                                                { merge: true }
                                            )
                                            .then(() => {
                                                setIsLoading(false);
                                            })
                                            .catch((error) => {
                                                setIsLoading(false);
                                                alert(error);
                                            })

                                    }
                                }
                                color='white'
                                bgcolor='#db5e40'
                                widthpass={150}
                                heightpass={40}
                            />

                        </Card>

                    </ScrollView>
                </SafeAreaView>
            )}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    editWrapper: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 300,
        height: 300,
        borderRadius: 200,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#db5e40",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#00bd56",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#db5e40",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32,
        marginRight:30
    },
    stats2Container: {
        flexDirection: "row",
        alignSelf: "flex-start",
        marginTop: 22,
        marginLeft: 40


    },
    statsBox: {
        alignItems: "center",
        flex: 1,
        marginLeft: 15


    },
    discoverItemsWrapper: {
        paddingVertical: 20,
        marginLeft: 10
    },
    discoverItem: {
        width: 170,
        height: 200,
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
    discoverWrapper: {
        // marginHorizontal: 20,
        marginTop: 20,
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#db5e40",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    editedTextStyle: {
        color: "#52575D",
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "100",
        padding: 10
    },
    updateButton: {
        height: 40,
        borderRadius: 15,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ProfileScreen;