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


import panda from './assets/images/card/RedpandaCard.png';

import TapButton from './screens/TapButton';
import ProgressBar from './screens/ProgressBar';

import HomeScreen from './screens/HomeScreen.js';
import SettingScreen from './screens/SettingScreen';
import EvaluationScreen from './screens/EvaluationScreen';
import EvaluationImgScreen from './screens/EvaluationImgScreen';
import EvaluationCompleteScreen from './screens/EvaluationCompleteScreen.js';
import DetailScreen from './screens/DetailScreen';
import MissionScreen from './screens/MissionScreen';

import LoginScreen from './screens/LoginScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';
import SignUpCompeleteScreen from './screens/SignUpCompeleteScreen.js';
import LoadingScreen from './screens/LoadingScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");



function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
            <Tab.Screen name="Mission" component={MissionScreen} options={{ headerShown: false }}  />
            <Tab.Screen name="Evaluation" component={EvaluationScreen} options={{ headerShown: false }}  />
            <Tab.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }}  />
        </Tab.Navigator>
    );
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Mission" component={MissionScreen} />
            <Tab.Screen name="Evaluation" component={EvaluationScreen} />
            <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>
    )
}

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />

            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen}  />
            <Stack.Screen name="SignUpCompeleteScreen" component={SignUpCompeleteScreen} options={{headerShown: false}} />
            <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />

            <Stack.Screen name="Detail" component={DetailScreen} />

            <Stack.Screen name="EvaluationImg" component={EvaluationImgScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="EvaluationComplete" component={EvaluationImgScreen} options={{ headerShown: false }}/>

        </Stack.Navigator>
    )
}



const App = () => {
    return(
        <NavigationContainer>
            <RootNavigator/>
        </NavigationContainer>
    )
}

export default App;
