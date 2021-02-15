import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { Alert, Modal, Image, ImageBackground } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { Card, ListItem, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import BookingInfo from './BookingInfo';

const BusBook = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/tr1.jpg")}
      style={{ height: 900, width: 450 }}
    >
      <ScrollView>
        <View
          style={{
            width: 100,
            marginTop: 50,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              backgroundColor: "#db5e40",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginLeft: 320
            }}
          >
            <Ionicons name="train" size={40} color="white" />
          </View>

        </View>
        <Text style={styles.textStyle}>BOARD A TRAIN</Text>
        <View>
          <Card containerStyle={styles.cardViewStyle}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/p.png")}
                style={{ height: 26, width: 26 }}
              />
            </View>
            <View style={{
              flexDirection: "row",
            }}>
              <Text style={styles.headingFontStyle}>
              Khulna
              </Text>
              <Text style={styles.dots}>
                - - - - - - - - - - - - - - - - - - - - - -
              </Text>
              <Text style={styles.headingFontStyle}>
                Dhaka
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={styles.leftFont}
              >
                {`5:30 am`}
          </Text>
              <Text
                style={styles.rightFont}
              >
                {`        12 pm`}
          </Text>
          </View>
        </Card>

            <Button
              type="solid"
              buttonStyle={{ height: 50, width: 381, marginLeft: 17, marginRight: 90, backgroundColor: "#db5e40" }}
              title="Book"
              onPress={() => {
                navigation.navigate('BookingInfo');
                console.log('payemnt info screen')
              }}
            />
            <Card containerStyle={styles.cardViewStyle}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/p.png")}
                  style={{ height: 26, width: 26 }}
                />
              </View>
              <View style={{
                flexDirection: "row",
              }}>
                <Text style={styles.headingFontStyle}>
                  Rajshahi
              </Text>
                <Text style={styles.dots}>
                  - - - - - - - - - - - - - - - - - - - -
              </Text>
                <Text style={styles.headingFontStyle}>
                  Kolkata
              </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={styles.leftFont}
                >
                  {`10:30 pm`}
                </Text>
                <Text
                  style={styles.rightFont}
                >
                  {`      12 pm`}
                </Text>
              </View>
            </Card>

            <Button
              type="solid"
              buttonStyle={{ height: 50, width: 381, marginLeft: 17, marginRight: 90, backgroundColor: "#db5e40" }}
              title="Book"
              onPress={() => {
                navigation.navigate('BookingInfo');
                console.log('payemnt info screen')
              }}
            />
            <Card containerStyle={styles.cardViewStyle}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/p.png")}
                  style={{ height: 26, width: 26 }}
                />
              </View>
              <View style={{
                flexDirection: "row",
              }}>
                <Text style={styles.headingFontStyle}>
                  Jessore
              </Text>
                <Text style={styles.dots}>
                  - - - - - - - - - - - - - - - - - - - -
              </Text>
                <Text style={styles.headingFontStyle}>
                  Rangpur
              </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={styles.leftFont}
                >
                  {`11 am`}
                </Text>
                <Text
                  style={{
                    color: "#a2a2db",
                    paddingLeft: 210,
                  }}
                >
                  {`                 3 pm`}
                </Text>
              </View>
            </Card>

            <Button
              type="solid"
              buttonStyle={{ height: 50, width: 381, marginLeft: 17, marginRight: 90, backgroundColor: "#db5e40" }}
              title="Book"
              onPress={() => {
                navigation.navigate('BookingInfo');
                console.log('payemnt info screen')
              }}
            />
            <Card containerStyle={styles.cardViewStyle}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/p.png")}
                  style={{ height: 26, width: 26 }}
                />
              </View>
              <View style={{
                flexDirection: "row",
              }}>
                <Text style={styles.headingFontStyle}>
                  Dhaka
              </Text>
                <Text style={styles.dots}>
                  - - - - - - - - - - - - - - - - - - -
              </Text>
                <Text style={styles.headingFontStyle}>
                  Chittagong
              </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={styles.leftFont}
                >
                  {`1 am`}
                </Text>
                <Text
                  style={{
                    color: "#a2a2db",
                    paddingLeft: 260,
                  }}
                >
                  {`9 am`}
                </Text>
              </View>
            </Card>

            <Button
              type="solid"
              buttonStyle={{ height: 50, width: 381, marginLeft: 17, marginRight: 90, backgroundColor: "#db5e40" }}
              title="Book"
              onPress={() => {
                navigation.navigate('BookingInfo');
                console.log('payemnt info screen')
              }}
            />
            <Card containerStyle={styles.cardViewStyle}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/p.png")}
                  style={{ height: 26, width: 26 }}
                />
              </View>
              <View style={{
                flexDirection: "row",
              }}>
                <Text style={styles.headingFontStyle}>
                  Syhlet
              </Text>
                <Text style={styles.dots}>
                  - - - - - - - - - - - - - - - -
              </Text>
                <Text style={styles.headingFontStyle}>
                  Dhaka
              </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={styles.leftFont}
                >
                  {`5 am`}
                </Text>
                <Text
                  style={styles.rightFont}
                >
                  {`1 pm`}
                </Text>
              </View>
            </Card>

            <Button
              type="solid"
              buttonStyle={{ height: 50, width: 381, marginLeft: 17, marginRight: 90, backgroundColor: "#db5e40" }}
              title="Book"
              onPress={() => {
                navigation.navigate('BookingInfo');
                console.log('payemnt info screen')
              }}
            />

      </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
        container: {
        padding: 10,
    fontSize: 30
  },
  textStyle: {
        fontSize: 30,
    fontWeight: "bold",
    color: "#db5e40",
    alignSelf: "center",
    marginRight: 30
  },
  iconStyle: {
        marginLeft: 1
  },
  cardViewStyle: {
        fontSize: 30,
    backgroundColor: '#fff',
    height: 100,
    width: 380,
    marginRight: 50,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: '#470000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 1
  },
  headingFontStyle: {
        fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  dots: {
        fontSize: 20,
    color: "#a2a2db",
    paddingHorizontal: 15,
  },
  leftFont: {
        color: "#a2a2db",

  },
  rightFont: {
        color: "#a2a2db",

    paddingLeft: 220,
  }
});
export default BusBook;