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
  Alert,

} from 'react-native';

import firebase from "@react-native-firebase/app";
import firestore, {doc} from '@react-native-firebase/firestore';

import water from '../assets/images/mission/water.png';

import mission from '../assets/images/history/Completed.png';
import card from '../assets/images/history/Card.png';
import evaluation from '../assets/images/history/Completed2.png';


import ProgressBar from './ProgressBar.js';
import SettingHistory from '../components/Setting/SettingHistory.js';

import {signOut} from '../lib/auth';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    settingTop:{

        flexDirection: 'row',
        paddingHorizontal: SCREEN_WIDTH* 0.05,
        justifyContent: 'space-between',
        marginTop: 30,
        color: 'black',
    },

    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    logoutText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },

    contentContainer: {
        alignItems: 'center',
    },

    missionProgress: {
        backgroundColor: '#F5F5F5',
        marginTop: 20,
        paddingVertical: 30,
        borderRadius:20,

        width: SCREEN_WIDTH * 0.9,
    },

    textContainer: {
        marginLeft: SCREEN_WIDTH* 0.05,
    },

    historyContainer: {
        backgroundColor: '#F5F5F5',
        marginTop: 20,
        paddingVertical: 30,
        borderRadius: 20,

        width: SCREEN_WIDTH * 0.9,
    },

    historyText: {
        marginLeft: SCREEN_WIDTH* 0.07,
        marginBottom: 10,

        color: 'black',
        fontSize: 20,

    },
    historyImageContainer: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
    },
    otherContainer: {
        marginLeft: SCREEN_WIDTH* 0.07,
        paddingVertical: 20,

    },

    otherText: {
        marginBottom: 10,
        fontSize: 15,
        color: 'black',
    },
})

function SettingScreen({navigation}){
    const db = firebase.firestore();

    const [userName, setUserName] = useState('');

    const [totalMission, setTotalMission] = useState(10);
    const [completedMission, setCompletedMissioin] = useState(0);


    const [userData, setUserData] = useState({});
    const [cardLength, setCardLength] = useState(0);
    const [newCard, setNewCard] = useState(false); // 새 캐릭터 획득
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState('');

    const currentUser = firebase.auth().currentUser;

    console.log('currentUser ');
    console.log(currentUser);

    // 카드 목록
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

    useEffect(() => {
          if (currentUser === null) {
            setIsLoggedIn(false);
            navigation.navigate("Login");
          } else {
            setIsLoggedIn(true);
            const uid = currentUser.uid;
            setUid(currentUser.uid);
            const usersCollection = firestore().collection('users');
            usersCollection.doc(uid).get()
              .then((doc) => {
                if (doc.exists) {
                  // 문서가 존재하는 경우 데이터에 접근
                  const data = doc.data();
                  console.log(data);
                  if(data.nowCompletedMissionCount < 10){
                    console.log(data.nowCompletedMissionCount);
                    setCompletedMissioin(data.nowCompletedMissionCount);
                  } else if(data.nowCompletedMissionCount === 10){
                    console.log(data.nowCompletedMissionCount);
                    setCompletedMissioin(data.nowCompletedMissionCount);
                    setNewCard(true);

                  }
                  setUserData(data);
                  setCardLength(data.completedCard.length);
                } else {
                  // 문서가 존재하지 않는 경우
                  console.log('문서가 존재하지 않습니다.');
                }
              })
              .catch((error) => {
                console.log('문서 가져오기 오류:', error);
              });
            console.log(usersCollection);
          }
    }, []);

    const getNewCard = async (e) => {
        let usersDocuments = await db.collection("users").doc(uid).get();
        console.log(usersDocuments.data());

        // 새 캐릭터 획득 & 현재 미션 완료 횟수 0으로 갱신
        const cardList = usersDocuments.data().completedCard;
        cardList.push(cardName[cardList.length].species);
        db.collection("users").doc(uid).update({
            nowCompletedMissionCount: 0,
            completedCard: cardList,
        })

        // 새 캐릭터 획득 알림창, home으로 이동
        if(newCard === true){
            Alert.alert(
                '새 캐릭터 획득',
                '새 캐릭터를 획득하셨습니다!',
                [
                    {text: '확인', onPress: () => {navigation.navigate("Home"),{
                        newCard: true
                    }}}
                ]

            );
        }

    };



    const onHandleLogout = async (e) => {
        const user = await firebase.auth().currentUser;
        console.log(user);
        if(user){
            await signOut();
            console.log("로그아웃");
            Alert.alert(
                '로그아웃',
                '로그아웃 성공',
                [
                    {text: '확인', onPress: () => {navigation.navigate("Login")}}
                ]

            );
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.settingTop}>
                <Text style={styles.nameText}>{userData.userName} 님</Text>
                <TouchableOpacity onPress={onHandleLogout}>
                    <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                {newCard === true ?
                (<TouchableOpacity style={styles.missionProgress} onPress={getNewCard}>
                     <View style={styles.textContainer}>
                         <Text>{totalMission}회 중 {completedMission}회 미션 완료!</Text>
                         <Text>새 캐릭터 획득까지 {totalMission - completedMission}회 남았습니다!</Text>
                     </View>
                     <ProgressBar totalStep={totalMission} nowStep={completedMission}/>
                 </TouchableOpacity>
                )
                :
                (<View style={styles.missionProgress}>
                    <View style={styles.textContainer}>
                        <Text>{totalMission}회 중 {completedMission}회 미션 완료!</Text>
                        <Text>새 캐릭터 획득까지 {totalMission - completedMission}회 남았습니다!</Text>
                    </View>
                    <ProgressBar totalStep={totalMission} nowStep={completedMission}/>
                </View>)
                }

                <View style={styles.historyContainer}>
                    <Text style={styles.historyText}>히스토리</Text>
                    <View style={styles.historyImageContainer}>
                          <SettingHistory source={mission} completed={userData.completedMission} contentText={'미션 완료'}/>
                          <SettingHistory source={card} completed={cardLength} contentText={'획득한 카드'}/>
                          <SettingHistory source={evaluation} completed={userData.completedEvaluation} contentText={'평가 완료'}/>
                    </View>
                </View>

            </View>

            <View style={styles.otherContainer}>
                <Text style={styles.otherText}>공지사항</Text>
                <Text style={styles.otherText}>앱 평가하기</Text>
                <Text style={styles.otherText}>오류 신고</Text>
                <Text style={styles.otherText}>버전 정보</Text>
                <Text style={styles.otherText}>라이센스</Text>
            </View>

        </View>
    )
}

export default SettingScreen;