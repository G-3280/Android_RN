import React, {Component, useState, useEffect} from 'react';
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

import water from '../assets/images/mission/water.png';
import Tiger from '../assets/images/tiger.png';
import redpandaCard from '../assets/images/RedpandaCard.png';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.5,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 30,

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    startBtn: {
        backgroundColor: '#9AEDA5',
        width: '100%',
        marginTop: 30,
        paddingVertical: 20,
        paddingHorizontal: SCREEN_WIDTH * 0.3,
        borderRadius: 20,
    },
    btnText: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 5,
        color: 'black',
    }
})


function EvaluationScreen({navigation}){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser);
          if (currentUser === null) {
            setIsLoggedIn(false);
            navigation.navigate("Login");
          } else {
            setIsLoggedIn(true);
            console.log("로그인 상태인데 닉네임 없음");
          }
    }, [firebase.auth().currentUser]);

    const onEveluationHandler = (e) => {
        console.log(e);
    };

    return (
        <View style={styles.container}>
            <Image source={Tiger} style={styles.image}/>

            <View style={styles.textContainer}>
                <Text style={styles.text}>다른 사람들의</Text>
                <Text style={styles.text}>친환경 행동을 평가하러가요!</Text>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.startBtn} onPress={onEveluationHandler}>
                    <Text style={styles.btnText}>시작하기</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default EvaluationScreen;