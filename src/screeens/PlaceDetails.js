import React, { useState, useEffect, createRef, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import colors from '../../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AppLoading from 'expo-app-loading';
import TransportScreen from './TransportScreen';
import { AuthContext } from "../Providers/AuthProvider"
import InputTaker from "../Reusable/InputTaker"
import "firebase/firestore";
import OutlineButton from "../Reusable/OutlineButton"
import * as firebase from "firebase"
import { MaterialIcons } from '@expo/vector-icons';
import CommentCard from "../Reusable/CommentCard"
const height = Dimensions.get('window').height;

const PlaceDetails = ({ route, navigation }) => {

  const { items, auth_id } = route.params;
  const image = { uri: items.data.url };
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const bottomSheet = useRef();
  const [comments, setComment] = useState("")
  const [commentsData, setCommentsData] = useState([])
  const org = "#db5e40"

  const loadPosts = async () => {


    firebase
      .firestore()
      .collection("posts").doc(items.id).collection("postLikes").doc(auth_id).get()
      .then((doc) => {
        if (doc.exists) {
          setLike(true)
        }

      }

      )

    firebase
      .firestore()
      .collection("posts").doc(items.id).collection("postcomments")
      .orderBy("created_desc", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),


          });
        });
        setCommentsData(temp_posts);
        // setcomment(querySnapshot.size)
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
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {



    return (
      <AuthContext.Consumer>
        {(auth) => (


          <ScrollView>
            <View style={styles.container}>

              <ImageBackground source={image} style={styles.backgroundImage}>
                <TouchableOpacity
                  style={styles.backIcon}
                  onPress={() => navigation.goBack()}>
                  <Entypo name="chevron-left" size={32} color={colors.white} />
                </TouchableOpacity>
                <View style={styles.titlesWrapper}>
                  <Text style={styles.itemsTitle}>{items.data.postheader}</Text>
                  <View style={styles.locationWrapper}>
                    <Entypo name="location-pin" size={24} color={colors.white} />
                    <Text style={styles.locationText}>{items.data.locationName}</Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.descriptionWrapper}>



                <View style={styles.commentWrapper}>
                  <TouchableOpacity
                    onPress={
                      () => {

                        bottomSheet.current.show()

                      }
                    }
                  >
                    <FontAwesome name="comment" size={32} color={"gray"} />

                  </TouchableOpacity>


                </View>
                <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}

                >

                  <Text style={{ textAlign: "center", fontSize: 22, color: "dimgray" }}>Comments</Text>

                  <ScrollView style={{marginBottom:50}}>

                    <FlatList

                      data={commentsData}
                      renderItem={({ item }) => {

                        return (
                          <TouchableOpacity
                            onLongPress={() => {
                              Alert.alert(
                                "Delete The Comment?",
                                "Press ok to Delete",
                                [
                                  {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                  },
                                  {
                                    text: "OK", onPress: () => {

                                      if (auth.CurrentUser.uid == item.data.userId) {

                                        firebase
                                          .firestore()
                                          .collection("posts").doc(items.id).collection("postcomments").doc(item.id).delete()
                                      }

                                      else {
                                        alert("You're not the author of this post")
                                      }
                                    }



                                  }
                                ],
                                { cancelable: false }
                              );
                            }}
                          >



                            <CommentCard
                              name={item.data.author}
                              comment={item.data.body}
                              date={item.data.created_at}

                            />
                          </TouchableOpacity>

                        )
                      }
                      }


                    />

                  </ScrollView>




                  <View
                    style={{
                     height:20,
                      justifyContent: 'flex-end',
                      marginBottom: 20,
                      marginLeft: 5,
                    }}

                  >
                    <View style={{ flexDirection: "row" }}>


                      <InputTaker
                        leftIcon={<FontAwesome name="comment" size={22} color={"gray"} />}
                        placeholder="Write a comment.."
                        widthpass={300}
                        heightpass={50}
                        keyboardType="default"
                        onChangeText={
                          function (currentInput) {
                            setComment(currentInput)
                          }
                        }
                      >

                      </InputTaker>

                      <View style={{ justifyContent: "center" }}>

                        <TouchableOpacity

                          onPress={
                            () => {
                              firebase
                                .firestore()
                                .collection("posts").doc(items.id).collection("postcomments")
                                .add({
                                  userId: auth.CurrentUser.uid,
                                  body: comments,
                                  author: auth.CurrentUser.displayName,
                                  created_desc: firebase.firestore.Timestamp.now(),
                                })
                                .then((docref) => {
                                  alert("comment id :" + docref.id);

                                })
                                .catch((error) => {
                                  alert(error);
                                });

                              firebase
                                .firestore()
                                .collection("notification").add(
                                  {
                                    type: "commented",
                                    author: auth.CurrentUser.displayName,
                                    created_at: firebase.firestore.Timestamp.now(),

                                  }
                                )


                            }

                          }

                        >
                          <MaterialIcons name="send" size={36} color={colors.orange} />
                        </TouchableOpacity>

                      </View>

                    </View>
                  </View>

                </BottomSheet>

                <View style={styles.heartWrapper}>
                  <TouchableOpacity
                    onPress={
                      () => {
                        if (like == true) {
                          setLike(false)
                          firebase
                            .firestore().collection("posts").doc(items.id)
                            .collection("postLikes").doc(auth.CurrentUser.uid)
                            .delete()


                          firebase
                            .firestore()
                            .collection("notification").add(
                              {
                                type: "disliked",
                                author: auth.CurrentUser.displayName,
                                created_at: firebase.firestore.Timestamp.now(),

                              }
                            )

                        }
                        else {
                          setLike(true)
                          firebase
                            .firestore().collection("posts").doc(items.id)
                            .collection("postLikes").doc(auth.CurrentUser.uid)
                            .set({
                              like: 1
                            })

                            .catch((error) => {
                              alert(error);
                            });

                          firebase
                            .firestore()
                            .collection("notification").add(
                              {
                                type: "liked",
                                author: auth.CurrentUser.displayName,
                                created_at: firebase.firestore.Timestamp.now(),


                              }
                            )
                        }
                      }
                    }
                  >
                    {like == true ? <Entypo name="heart" size={32} color={colors.orange} /> : <Entypo name="heart" size={32} color="gray" />}

                  </TouchableOpacity>

                </View>



                <View style={styles.descriptionTextWrapper}>
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>{items.data.postbody}</Text>
                </View>

                <View style={styles.infoWrapper}>
                  <View style={styles.infoItemsitems}>
                    <Text style={styles.infoTitle}>PRICE</Text>
                    <View style={styles.infoTextWrapper}>
                      <Text style={styles.infoText}>${items.data.costing}</Text>
                      <Text style={styles.infoSubText}>/person</Text>
                    </View>
                  </View>
                  <View style={styles.infoItemsitems}>
                    <Text style={styles.infoTitle}>RATING</Text>
                    <View style={styles.infoTextWrapper}>
                      <Text style={styles.infoText}>${items.data.rating}</Text>
                      <Text style={styles.infoSubText}>/5</Text>
                    </View>
                  </View>
                  <View style={styles.infoItemsitems}>
                    <Text style={styles.infoTitle}>DURATION</Text>
                    <View style={styles.infoTextWrapper}>
                      <Text style={styles.infoText}>${items.data.durations}</Text>
                      <Text style={styles.infoSubText}> hours</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.buttonWrapper}
                  onPress={() => {
                    console.log('booking')
                    navigation.navigate('TransportScreen')
                  }
                  }
                >
                  <Text style={styles.buttonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </AuthContext.Consumer>

    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundImage: {
    height: height * 0.6,
    justifyContent: 'space-between',
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -20,
    borderRadius: 25,
  },
  backIcon: {
    marginLeft: 20,
    marginTop: 60,
  },
  titlesWrapper: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  itemsTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 32,
    color: colors.white,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: colors.white,
  },
  heartWrapper: {
    position: 'absolute',
    right: 30,
    top: -30,
    width: 64,
    height: 64,
    backgroundColor: colors.white,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  commentWrapper: {
    position: 'absolute',
    right: 100,
    top: -30,
    width: 64,
    height: 64,
    backgroundColor: colors.white,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionTextWrapper: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  descriptionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    color: colors.black,
  },
  descriptionText: {
    marginTop: 20,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: colors.darkGray,
    height: 85,
  },
  infoWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  infoItemsitems: {},
  infoTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    color: "dimgray",
  },
  infoTextWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  infoText: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    color: colors.orange,
  },
  infoSubText: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: "dimgray"
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: colors.orange,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 30
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: colors.white,
  },
  gesbutton: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4
    },
    shadowRadius: 5,
    elevation: 6
  },
  gestext: {
    color: "white",
    fontWeight: "600"
  },
  gescontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PlaceDetails;