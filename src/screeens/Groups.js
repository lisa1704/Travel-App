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
import { Card, Button } from 'react-native-elements';
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

const Groups = ({ route, navigation }) => {

  const { items,auth_id} = route.params;
  const image = { uri: items.data.url };
  const [isMember, setIsMember] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const bottomSheet = useRef();
  const [comments, setComment] = useState("")
  const [commentsData, setCommentsData] = useState([])
  const org = "#db5e40"
const [GroupMembers,setMembers] = useState([])
  const loadPosts = async () => {


           firebase
          .firestore()
          .collection("groups").doc(items.id).collection("members").doc(auth_id).get()
          .then((doc) => {
            if (doc.exists) {
              setIsMember(true)
            }

          }

          )

    firebase
      .firestore()
      .collection("groups").doc(items.id).collection("members")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),

          });
        });
        setMembers(temp_posts);
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
                    <Text style={styles.locationText}>{items.data.groupname}</Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.descriptionWrapper}>





              <View style={styles.commentWrapper}>
                  <TouchableOpacity
                    onPress={
                      () => {

                            if(isMember== true)
                            {
                                firebase
                                .firestore()
                                .collection("groups").doc(items.id).collection("members").doc(auth.CurrentUser.uid).delete()
                               
                                .then((docref) => {
                                    Alert.alert("Left Group");
                                    setIsMember(false)
                                    //alert(auth.CurrentUser.sid)
                                })

                            }
                            else
                            {
                                Alert.alert("you are not a Member.")
                            }
                      }
                    }
                  >
                    <FontAwesome name="minus" size={32} color={"gray"} />

                  </TouchableOpacity>


                </View>
               

                <View style={styles.heartWrapper}>
                  <TouchableOpacity
                    onPress={
                      () => {

                            if(isMember== false)
                            {
                                firebase
                                .firestore()
                                .collection("groups").doc(items.id).collection("members").doc(auth.CurrentUser.uid)
                                .set({
                                    name: auth.CurrentUser.displayName,
                                })

                                .then((docref) => {
                                  setIsMember(true)
                                    Alert.alert("Joined new Group");
                                    //alert(auth.CurrentUser.sid)
                                })

                            }
                            else
                            {
                                Alert.alert("you are already a Member.")
                            }
                      }
                    }
                  >
                    <FontAwesome name="plus" size={32} color={"gray"} />

                  </TouchableOpacity>


                </View>
               

            


                <View style={styles.descriptionTextWrapper}>
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>{items.data.details}</Text>
                </View>
                <View style={styles.descriptionTextWrapper}>
                  <Text style={styles.descriptionTitle}>Members</Text>
                  
                </View>
                

                <ScrollView style={{marginBottom:50}}>

<FlatList

  data={GroupMembers}
  renderItem={({ item }) => {

    return (
    
        <Card containerStyle={styles.cardViewStyle}>
            <View style={{flexDirection:"row"}}>
            <MaterialIcons name="person" size={24} color="black" style={{padding:3}} />

            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', }}> {item.data.name}</Text>

            </View>


    </Card>


     

    )
  }
  }


/>

</ScrollView>




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
    marginTop: -30,
    borderRadius: 25,
    height:500
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
  },
  cardViewStyle: {
    // justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: "#e3e3e3",
    height: 40,
    width: 330,
    alignItems:"center",
    alignSelf:"center",
    justifyContent:"center"


},
});

export default Groups;