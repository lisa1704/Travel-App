import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons';

const PhotoComponent = () => {
    const [image, setImage] = useState( 'https://dummyimage.com/200x300/e0e0e0/e8e8e8.jpg&text=upload');

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Need Camera and Media Permisson');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [7, 7],
            quality: 5,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        
           < View style={{width:200,justifyContent:"center",alignContent:"center",alignSelf:"center",height:220,marginTop:10, marginBottom:10}}>
            <TouchableOpacity
            
            onPress={pickImage}
            >


                {image && <Image source={{ uri: image }} style={styles.photoStyle} />}

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    photoStyle: {
        marginTop:20,
        width:200,
        height: 220, 
        borderWidth:5, 
        borderColor: 'black', 
        borderWidth:3,
        resizeMode:'contain'
    }
});

export default PhotoComponent