import React, { useState, useEffect } from "react";
import { View, Text, Alert, Modal, Image, ImageBackground, StyleSheet, FlatList, ScrollView } from "react-native";
import { Card, Button } from 'react-native-elements';


import "firebase/firestore";
import * as firebase from "firebase"




const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    const loadPosts = async () => {


        // firebase
        //   .firestore()
        //   .collection("posts").doc(items.id).collection("postLikes").doc(auth_id).get()
        //   .then((doc) => {
        //     if (doc.exists) {
        //       setLike(true)
        //     }

        //   }

        //   )

        firebase
            .firestore()
            .collection("notification")
            .orderBy("created_at", "desc")
            .onSnapshot((querySnapshot) => {
                let temp_posts = [];
                querySnapshot.forEach((doc) => {
                    temp_posts.push({
                        id: doc.id,
                        data: doc.data(),


                    });
                });
                setNotifications(temp_posts);
                // setcomment(querySnapshot.size)
            })
            .catch((error) => {
                alert(error);
            });

    }

    useEffect(() => {
        loadPosts()
    }, []);

    return (

        <ScrollView contentContainerStyle={{marginBottom:20}}>
            <FlatList

                data={notifications}
                renderItem={({ item }) => {

                    return (

                        <Card containerStyle={styles.cardViewStyle}>

                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', }}> {item.data.author} {item.data.type} your post</Text>



                        </Card>



                    )
                }
                }


            />

        </ScrollView>

    );
};


const styles = StyleSheet.create({

    cardViewStyle: {
        // justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: "#e3e3e3",
        height: 40,
        width: 330,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"


    },
});
export default Notification;