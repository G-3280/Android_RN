import React, {Component} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import panda from './assets/images/RedpandaCard.png';

import TapButton from './screens/TapButton';
import ProgressBar from './screens/ProgressBar';

import HomeScreen from './screens/HomeScreen.js';
import SettingScreen from './screens/SettingScreen';
import EvaluationScreen from './screens/EvaluationScreen';
import DetailScreen from './screens/DetailScreen';
import MissionScreen from './screens/MissionScreen';

import LoginScreen from './screens/LoginScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");



function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Mission" component={MissionScreen} />
            <Tab.Screen name="Evaluation" component={EvaluationScreen} />
            <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>
    )
}


const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Mission" component={MissionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Evaluation" component={EvaluationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }}/>

                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />

                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
