import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons';

const UploadImage = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{justifyContent:"center", alignItems:"center", flex: 1}}>
            {image && <Image source={{ uri: image }} style={styles.photoStyle} />}
            <Button buttonStyle={{ backgroundColor: 'white', borderColor:'#db5e40',borderWidth:2, width: "90%", paddingRight:10, width: 170,marginTop:20,}}
                type="solid"
                titleStyle={{ color: '#db5e40' }}
                title="  Upload Photo"
                onPress={pickImage}
                icon={<Entypo name="camera" size={24} color='#db5e40' />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    photoStyle: {
        width: 220,
        height: 220,
        borderRadius: 200,
        overflow: "hidden"
    }
});
export default UploadImage;