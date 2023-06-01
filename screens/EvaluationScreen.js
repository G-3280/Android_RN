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

import firestore, {doc, getDoc} from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app";

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
    const db = firebase.firestore();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState(firebase.auth().currentUser?.uid);
    const [imgName, setImgName] = useState([]);

    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser);
          if (currentUser === null) {
            setIsLoggedIn(false);
            setUid(currentUser.uid);
            console.log(`uid: ${uid}`);
            navigation.navigate("Login");
          } else {
            setIsLoggedIn(true);
          }
    }, [firebase.auth().currentUser]);

    const onEveluationHandler = async (e) => {
        // 자신의 uid를 제외한 다른 유저들의 imageUrl을 배열에 담기
        let missionDocuments = await db.collection("missionTest").get();
        for (const docc of missionDocuments.docs) {
            const userCollection = await docc.ref.collection("users").get();
            userCollection.forEach((docc2) => {
                  const userCollectionData = docc2.data();
                  console.log(userCollectionData);
                  console.log(`uid: ${uid}`);
                  if (docc2.id !== uid) { // uid와 다른 필드만 출력
                    console.log(`${docc2.id}:`, userCollectionData);
                    if(userCollectionData.imageUrl !== ""){
                        setImgName([...imgName, userCollectionData.imageUrl]);
                    }
                  }
            });
        }

        navigation.navigate("EvaluationImg", {
            imageUrl: imgName,
        });
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