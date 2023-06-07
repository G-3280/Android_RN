import React, {Component, useState, useEffect} from 'react';
import type {Node} from 'react';

import { signUp } from "../lib/auth";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";

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
  TextInput,
  Alert,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textWrapper: {
        flex: 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },

    btnContainer:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginButton: {
        height: 53,
        width: '80%',
        marginTop: 24,
        backgroundColor: '#34E18B',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

function EvaluationCompleteScreen ({navigation}){



    const signUpSubmit = async () => {
        navigation.navigate("Evaluation");
      };



    return(
        <View style={styles.container}>

            <View style={styles.textWrapper}>
                <Text style={styles.contentText}>평가를</Text>
                <Text style={styles.contentText}>완료했습니다!</Text>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={signUpSubmit}>
                    <Text style={styles.buttonText}>완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default EvaluationCompleteScreen;