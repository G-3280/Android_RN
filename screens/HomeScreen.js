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

import Card from '../components/Home/Card';
import panda from '../assets/images/card/RedpandaCard.png';

import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";
import firestore, {doc} from '@react-native-firebase/firestore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
    home_container: {
        flex: 1,
        backgroundColor: 'white',
    },

    topContainer: {
        marginLeft: SCREEN_WIDTH * 0.07,
        marginTop: 20,
    },

    helloText: {
        color: 'black',
    },

    cardText: {
        marginTop: 20,

    },

    collectText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },

    image: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.6,
        marginTop: 20,
        marginBottom: 25,
        marginLeft: SCREEN_WIDTH * 0.1,
        marginRight: SCREEN_WIDTH * 0.1,
        alignItems: "center",
        justifyContent: 'space-between',
    },
    ImgTextContainer:{
        marginLeft: SCREEN_WIDTH * 0.9 * 0.55,
        flexDirection: 'row',
    },

    ImgTextName: {
        color: 'black',
        fontSize: 50,
        fontWeight: 'bold',
        marginTop: SCREEN_HEIGHT * 0.01,
        marginRight: SCREEN_WIDTH * 0.03,
    },
    ImgText: {
        flexDirection: 'column',
        marginTop: SCREEN_HEIGHT * 0.02,
    },
    ImgTextGen: {

        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
})

function HomeScreen({navigation, route}){
    const db = firebase.firestore();
    console.log(route);

    let cardName = [
        {
            'species': 'redPanda',
            'nickname': '호',
            'name': '레서판다',
            'explanation': `황제펭귄(Aptenodytes forsteri)은 지구상에 생존하는 모든 펭귄들 중에서 가장 키가 크고 체중이 많이 나가는 종이다.

서식지는 남극과 포클랜드 제도이다. 암컷과 수컷은 덩치와 깃털 무늬가 비슷하며, 성체는 최고 120센티미터에 몸무게는 23~45킬로그램까지 나간다. 등은 검고 가슴 부위는 창백한 노란색을 띠고 있으며 귀 부위는 밝은 노란색이다. 다른 펭귄들과 마찬가지로 황제펭귄은 날지 못한다. 이들은 해양 생활에 적합한 유선형의 몸매와 플리퍼(flipper)로 불리는 납작한 날개를 갖고 있다.`
        },
        {
            'species': 'penguin',
            'nickname': '뽀',
            'name': '황제펭귄',
            'explanation': `황제펭귄(Aptenodytes forsteri)은 지구상에 생존하는 모든 펭귄들 중에서 가장 키가 크고 체중이 많이 나가는 종이다.

서식지는 남극과 포클랜드 제도이다. 암컷과 수컷은 덩치와 깃털 무늬가 비슷하며, 성체는 최고 120센티미터에 몸무게는 23~45킬로그램까지 나간다. 등은 검고 가슴 부위는 창백한 노란색을 띠고 있으며 귀 부위는 밝은 노란색이다. 다른 펭귄들과 마찬가지로 황제펭귄은 날지 못한다. 이들은 해양 생활에 적합한 유선형의 몸매와 플리퍼(flipper)로 불리는 납작한 날개를 갖고 있다.`
        },
        {
            'species': 'bear',
            'nickname': '고미',
            'name': '곰',
            'explanation': `황제펭귄(Aptenodytes forsteri)은 지구상에 생존하는 모든 펭귄들 중에서 가장 키가 크고 체중이 많이 나가는 종이다.

서식지는 남극과 포클랜드 제도이다. 암컷과 수컷은 덩치와 깃털 무늬가 비슷하며, 성체는 최고 120센티미터에 몸무게는 23~45킬로그램까지 나간다. 등은 검고 가슴 부위는 창백한 노란색을 띠고 있으며 귀 부위는 밝은 노란색이다. 다른 펭귄들과 마찬가지로 황제펭귄은 날지 못한다. 이들은 해양 생활에 적합한 유선형의 몸매와 플리퍼(flipper)로 불리는 납작한 날개를 갖고 있다.`
        }
    ];
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState('');
    const [card, setCard] = useState([]);
    const [completedCard, setCompletedCard] = useState([]);
    const [uid, setUid] = useState('');

    // 로그인 여부 확인
    const currentUser = firebase.auth().currentUser;
    useEffect(() => {
      const checkLoggedIn = async () => {
        if (currentUser !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigation.navigate("Login");
        }
      };

      checkLoggedIn();
    }, []);

    // 유저 정보 셋팅
    useEffect(() => {
        console.log('isLoggedIn 값 변경');

        console.log(route.params);
        if(isLoggedIn === true){
            console.log(isLoggedIn);

            // 카드 목록 받아오기
            const uidTmp = currentUser.uid;
            setUid(currentUser.uid);

            const fetchData = async () => {
                let getUsers = await db.collection("users").doc(uidTmp).get();
                console.log('getUsers.data: ');
                console.log(getUsers.data());

                const cardList = getUsers.data().completedCard;
                setCard(getUsers.data().completedCard);
                setNickname(getUsers.data().userName);

                if(cardList.length !== 0 && completedCard.length === 0){
                  cardList.forEach((c, index) => {
                    const matchingIndex = cardName.findIndex((cardInfo) => c === cardInfo.species);
                    if (matchingIndex !== -1) {
                      setCompletedCard((prevCompletedCard) => [...prevCompletedCard, matchingIndex]);
                    }
                  });
                }
            }

            fetchData();
        }

    }, [isLoggedIn]);




    console.log(completedCard);
    const checkLoggedIn = () => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true)
                console.log("loggedIn")
            } else {
                setIsLoggedIn(false)
                console.log("loggedOut")
                navigation.navigate("Login");
                setNickname("");
            }
        }
        )
    }
    return (
        <>
        <View style={styles.home_container}>
            <View style={styles.topContainer}>
                <View style={styles.helloTextContainer}>
                    <Text style={styles.helloText}>안녕하세요!</Text>
                    <Text style={styles.helloText}>
                        {isLoggedIn &&
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{nickname} </Text>
                        }
                        님
                    </Text>
                </View>

                <View style={styles.cardText}>
                    <Text style={styles.collectText}>모은 캐릭터 카드
                        <Text style={{ color: '#A6A4A4', fontSize: 16, fontWeight: 'normal'}}> ({completedCard.length})</Text>
                    </Text>
                </View>
            </View>
            <ScrollView
                pagingEnabled
                horizontal
                indicatorStyle='black'
                contentContainerStyle={styles.card_scroll}
            >


            {isLoggedIn && completedCard
                .map((c, i) => (
                    <Card navigation={navigation} cardIdx={c} key={i}/>
                ))
            }

            </ScrollView>

        </View>

        </>
    )
}

export default HomeScreen;