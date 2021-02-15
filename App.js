import React from "react"
import { Text, StyleSheet, } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import SignUp from "./src/screeens/SignUp"
import { AuthContext, AuthProvider } from "./src/Providers/AuthProvider"
import colors from './assets/colors/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import PostPage from './src/screeens/PostPage'
import SignIn from "./src/screeens/SignIn"
import * as firebase from 'firebase'
import HomePage from "./src/screeens/HomePage"
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './src/screeens/ProfileScreen';
import CategoryPicker from './src/screeens/CategoryPicker';
import AirBook from './src/screeens/AirBook';
import PlaceDetails from "./src/screeens/PlaceDetails";
import LocationPicker from './src/screeens/LocationPicker';
import Notification from './src/screeens/Notification'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrainBook from './src/screeens/TrainBook';
import BusBook from './src/screeens/BusBook';
import TransportScreen from "./src/screeens/TransportScreen";
import { withNavigation } from 'react-navigation';

const stack = createStackNavigator()
import BookingInfo from "./src/screeens/BookingInfo";
import BackgroundCurve from "./src/Reusable/BackgroundCurve";
import Groups from "./src/screeens/Groups";

const AuthStack = createStackNavigator()
Entypo.loadFont();
MaterialCommunityIcons.loadFont();

var firebaseConfig = {
  apiKey: "AIzaSyCgBLecv8Prt262KoQXh_ntyp1jMEHPMnQ",
  authDomain: "travel-app-963dc.firebaseapp.com",
  projectId: "travel-app-963dc",
  storageBucket: "travel-app-963dc.appspot.com",
  messagingSenderId: "933961659260",
  appId: "1:933961659260:web:3284a16d6403087243eaf9"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}



const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: colors.orange,
        inactiveTintColor: colors.gray,
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddStack}
        options={{

          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-add-circle" size={32} color={color} />),
        }}
      />
      <Tab.Screen
        name="Liked"
        component={Notification}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="heart" size={32} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
// const ProfileStack = () => {
//   return (
//     <stack.Navigator initialRouteName="ProfileScreen">

//       <stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
//         headerShown: false
//       }} />

//     </stack.Navigator>
//   )
// }
const AddStack = () => {
  return (

    <stack.Navigator initialRouteName="PostPage">
      <stack.Screen name="PostPage"

        initialParams={{ item: [], location: "" }}

        component={PostPage} options={{
          headerShown: false
        }} />
      <stack.Screen name="LocationPicker" component={LocationPicker} options={{
        headerShown: false
      }} />
      <stack.Screen name="CategoryPicker" component={CategoryPicker} options={{
        headerShown: false
      }} />

    </stack.Navigator>
  )
}





const HomeStack = () => {
  return (
    <stack.Navigator initialRouteName="HomePage">

      <stack.Screen name="HomePage" component={HomePage} options={{
        headerShown: false
      }} />
      <stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
        headerShown: false
      }} />
      <stack.Screen name="TransportScreen" component={TransportScreen} options={{
        headerShown: false
      }} />
      <stack.Screen name="AirBook" component={AirBook} options={{
        headerShown: false
      }} />

      <stack.Screen name="TrainBook" component={TrainBook} options={{
        headerShown: false
      }} />
      <stack.Screen name="BusBook" component={BusBook} options={{
        headerShown: false
      }} />

      <stack.Screen name="PostPage" component={PostPage} options={{
        headerShown: false
      }} />
      <stack.Screen name="BookingInfo" component={BookingInfo} options={{
        headerShown: false
      }} />

      <stack.Screen name="Groups" component={Groups} options={{
        headerShown: false
      }} />

      <stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
        headerShown: false
      }} />
    </stack.Navigator>
  )
}


const AuthStackScreen = () => {

  return (

    <AuthStack.Navigator
      initialRouteName="SignIn">
      <AuthStack.Screen name="SignUp" component={SignUp} options={{
        headerShown: false,
      }} />

      <AuthStack.Screen name="SignIn" component={SignIn} options={{
        headerShown: false,
      }} />

    </AuthStack.Navigator>
  )
}



function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.isLoggedin ? <TabNavigator /> : <AuthStackScreen />}
          </NavigationContainer>)}
      </AuthContext.Consumer>
    </AuthProvider>

  )
}

const styles = StyleSheet.create(
  {
    tabBar: {
      backgroundColor: colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  }
);
export default App
