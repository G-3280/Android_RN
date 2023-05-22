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
import panda from '../assets/images/RedpandaCard.png';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";

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
            'species': 'koala',
            'nickname': '코',
            'name': '코알라',
            'explanation': `황제펭귄(Aptenodytes forsteri)은 지구상에 생존하는 모든 펭귄들 중에서 가장 키가 크고 체중이 많이 나가는 종이다.

서식지는 남극과 포클랜드 제도이다. 암컷과 수컷은 덩치와 깃털 무늬가 비슷하며, 성체는 최고 120센티미터에 몸무게는 23~45킬로그램까지 나간다. 등은 검고 가슴 부위는 창백한 노란색을 띠고 있으며 귀 부위는 밝은 노란색이다. 다른 펭귄들과 마찬가지로 황제펭귄은 날지 못한다. 이들은 해양 생활에 적합한 유선형의 몸매와 플리퍼(flipper)로 불리는 납작한 날개를 갖고 있다.`
        }
    ];
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState('');
    const [completedCard, setCompletedCard] = useState([]);

    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser);
          if (currentUser === null) {
            setIsLoggedIn(false);
            navigation.navigate("Login");
          } else {
            setIsLoggedIn(true);
          }
    }, [firebase.auth().currentUser]);

    useEffect(() => {
      const updateUserInfo = async () => {
        if (route.params) {
          console.log(route.params);
          setNickname(route.params.nickname);

          if(route.params.card.length !== 0 && completedCard.length === 0){
              let minCard = route.params.card;
              minCard.forEach((card, index) => {
                const matchingIndex = cardName.findIndex((cardInfo) => card === cardInfo.species);
                if (matchingIndex !== -1) {
                  setCompletedCard((prevCompletedCard) => [...prevCompletedCard, matchingIndex]);
                }
              });
          }
          setIsLoggedIn(true);
        }
      };

      updateUserInfo();
    }, [route.params]);

    console.log(completedCard);
    const checkLoggedIn = () => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true)
                console.log("loggedIn")
            } else {
                setIsLoggedIn(false)
                console.log("loggedOut")
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
                        <Text style={{ color: '#A6A4A4', fontSize: 16, fontWeight: 'normal'}}> ({cardName.length})</Text>
                    </Text>
                </View>
            </View>
            <ScrollView
                pagingEnabled
                horizontal
                indicatorStyle='black'
                contentContainerStyle={styles.card_scroll}
            >


            {completedCard
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