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

import panda from '../../assets/images/card/RedpandaCard.png';

import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({


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

export default function Card({navigation, cardIdx}){
    let cardName = [
            {
                'nickname': '호',
                'name': '레서판다',
                'explanation': `황제펭귄(Aptenodytes forsteri)은 지구상에 생존하는 모든 펭귄들 중에서 가장 키가 크고 체중이 많이 나가는 종이다.

    서식지는 남극과 포클랜드 제도이다. 암컷과 수컷은 덩치와 깃털 무늬가 비슷하며, 성체는 최고 120센티미터에 몸무게는 23~45킬로그램까지 나간다. 등은 검고 가슴 부위는 창백한 노란색을 띠고 있으며 귀 부위는 밝은 노란색이다. 다른 펭귄들과 마찬가지로 황제펭귄은 날지 못한다. 이들은 해양 생활에 적합한 유선형의 몸매와 플리퍼(flipper)로 불리는 납작한 날개를 갖고 있다.`
            },
            {
                'nickname': '뽀',
                'name': '황제펭귄',
                'explanation': `황제펭귄(Aptenodytes forsteri)은 지구상에 생존하는 모든 펭귄들 중에서 가장 키가 크고 체중이 많이 나가는 종이다.

    서식지는 남극과 포클랜드 제도이다. 암컷과 수컷은 덩치와 깃털 무늬가 비슷하며, 성체는 최고 120센티미터에 몸무게는 23~45킬로그램까지 나간다. 등은 검고 가슴 부위는 창백한 노란색을 띠고 있으며 귀 부위는 밝은 노란색이다. 다른 펭귄들과 마찬가지로 황제펭귄은 날지 못한다. 이들은 해양 생활에 적합한 유선형의 몸매와 플리퍼(flipper)로 불리는 납작한 날개를 갖고 있다.`
            },
            {
                'species': 'bear',
                'nickname': '꼼',
                'name': '곰',
                'explanation': `황제펭귄(Aptenodytes forsteri)은 지구상에 생존하는 모든 펭귄들 중에서 가장 키가 크고 체중이 많이 나가는 종이다.

    서식지는 남극과 포클랜드 제도이다. 암컷과 수컷은 덩치와 깃털 무늬가 비슷하며, 성체는 최고 120센티미터에 몸무게는 23~45킬로그램까지 나간다. 등은 검고 가슴 부위는 창백한 노란색을 띠고 있으며 귀 부위는 밝은 노란색이다. 다른 펭귄들과 마찬가지로 황제펭귄은 날지 못한다. 이들은 해양 생활에 적합한 유선형의 몸매와 플리퍼(flipper)로 불리는 납작한 날개를 갖고 있다.`
            }
        ];


    return(
        <TouchableOpacity onPress={() =>{navigation.navigate("Detail", {
            nickName: cardName[cardIdx].nickname,
            name: cardName[cardIdx].name,
            explanation: cardName[cardIdx].explanation,
        })}}>
            <ImageBackground
                source={panda}
                style={styles.image}
                imageStyle={{borderRadius: 20}}
            >
                <View style={styles.ImgTextContainer}>
                    <Text style={styles.ImgTextName}>{cardName[cardIdx].nickname}</Text>
                    <View style={styles.ImgText}>
                        {cardName[cardIdx].name
                            .split('')
                            .map((char, index) => <Text style={styles.ImgTextGen} key={index}>{char}</Text>)}
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}