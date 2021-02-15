import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { Alert, Modal, Image, ImageBackground } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { Card, ListItem, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import BookingInfo from './BookingInfo';

const AirBook = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/oc3.jpg")}
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
            <Ionicons name="airplane-sharp" size={40} color="white" style={styles.iconStyle} />
          </View>

        </View>
        <Text style={styles.textStyle}>CHOOSE A FLIGHT</Text>
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
                GM
              </Text>
              <Text style={styles.dots}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - 
              </Text>
              <Text style={styles.headingFontStyle}>
                IDN
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
                {`Germany\n 3 am`}
          </Text>
              <Text
                style={styles.rightFont}
              >
                {`      Indonesia\n          12 pm`}
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
                  HKG
              </Text>
                <Text style={styles.dots}>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - 
              </Text>
                <Text style={styles.headingFontStyle}>
                  DXB
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
                  {`Hong Kong \n 6 am`}
                </Text>
                <Text
                  style={styles.rightFont}
                >
                  {`          Dubai\n          7 pm`}
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
                  KL
              </Text>
                <Text style={styles.dots}>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              </Text>
                <Text style={styles.headingFontStyle}>
                  ISL
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
                  {`Kuala Lampur \n 11 am`}
                </Text>
                <Text
                  style={{
                    color: "#a2a2db",
                    paddingLeft: 210,
                  }}
                >
                  {`      Istanbul\n      5 pm`}
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
                  DOH
              </Text>
                <Text style={styles.dots}>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              </Text>
                <Text style={styles.headingFontStyle}>
                  UK
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
                  {`Doha \n 1 am`}
                </Text>
                <Text
                  style={{
                    color: "#a2a2db",
                    paddingLeft: 260,
                  }}
                >
                  {`       London\n       9 am`}
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
                  BD
              </Text>
                <Text style={styles.dots}>
                  - - - - - - - - - - - - - - - - - -  - - - - - - - - - -
              </Text>
                <Text style={styles.headingFontStyle}>
                  DXB
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
                  {`Bangladesh\n 3 am`}
                </Text>
                <Text
                  style={styles.rightFont}
                >
                  {`           Dubai\n         1 pm`}
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
                  USA
              </Text>
                <Text style={styles.dots}>
                  - - - - - - - - - - - - - - - -
              </Text>
                <Text style={styles.headingFontStyle}>
                  RU
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
                  {`United States \n 5 am`}
                </Text>
                <Text
                  style={styles.rightFont}
                >
                  {`Russia\n 7 pm`}
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
        marginLeft: 5
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
export default AirBook;