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
  AppState,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app";

import MissionBox from '../components/Mission/MissionBox.js';
import MissionBtn from '../components/Mission/MissionBtn.js';
import MissionCategory from '../components/Mission/MissionCategory.js';

import water from '../assets/images/mission/water.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFD',
    },

    titleContainer: {
        marginLeft: SCREEN_WIDTH * 0.05,
        marginTop: SCREEN_WIDTH * 0.05,
    },
    missionContainer: {
        alignItems: 'center',
    },

    titleText:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },

    dateText: {
        fontSize: 15,
        color: '#D7D2D2',
    },

    btnContainer:{
        alignItems: 'center',
        flexDirection: 'row',
    },

    onBtn: {
        backgroundColor:'#9AEDA5',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 20,
        marginBottom: 20,
        marginRight: 8,

        flex: 1,
        height: 35,

    },
    btnText:{
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',

        marginTop: 20,
        marginBottom: 20,
        marginLeft: SCREEN_WIDTH * 0.05,
        marginRight: SCREEN_WIDTH * 0.05,

        flex: 1,
        height: 35,

    },

    text: {
        color: 'black',
    },

    categoryContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 35,
        height: 35,
    },
})


function MissionScreen({navigation}) {
  let today = new Date();
  let time = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  };
  let currentDate = today.getDate();
  let firstDate = new Date(today.setDate(1)).getDay();

  const weekend = Math.ceil((currentDate + firstDate) / 7);


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

  // 가장 마지막으로 미션이 업데이트 된 날짜
  const [updateDate, setUpdateDate] = useState(`${time.year}-${time.month}-${time.date}`);

  const [working, setWorking] = useState(false);
  const [Week, setWeek] = useState(false);
  const [category, setCategory] = useState('all');
  const [memo, setMemo] = useState('');

  // 일일 미션 인덱스 리스트
  let todayMission = [];
  // 주간 미션 인덱스 리스트
  let WeekMission = [];

  // 앱이 active 상태에 있을 경우에만 리렌더링 되게 하는 함수
  const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      const handleAppStateChange = (nextAppState) => {
        setIsActive(nextAppState === 'active');
      };

      AppState.addEventListener('change', handleAppStateChange);

      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    }, []);

    useEffect(() => {
      if (isActive) {
        // 앱이 활성화되면 실행할 작업
        console.log('앱이 활성화되었습니다.');
        console.log(updateDate, `${time.year}-${time.month}-${time.date}`)

        // 현재 날짜가 updateDate와 다를 때 현재 날짜 업데이트 후 미션 렌더링
        if (updateDate !== `${time.year}-${time.month}-${time.date}`) {
            console.log('새로운 날이 시작되었습니다.');
            setUpdateDate(`${time.year}-${time.month}-${time.date}`);

            // 무작위로 3개의 수 구하기

              while (todayMission.length < 3) {
                const randomNumber = Math.floor(Math.random() * 11); // 0부터 10까지의 정수값
                if (!todayMission.includes(randomNumber)) {
                  todayMission.push(randomNumber);
                }
              }
              console.log(todayMission.sort());
      } else {
            console.log('아직 하루가 끝나지 않았습니다.');
      }
      }
    }, [isActive]);

  // 일일 & 주간 미션 버튼 변경
  const onPressHandler = (id) => {
      if(Week === true && id === 'week'){ // 일일 미션 -> 주간 미션
          setWeek(false);
      }else if(Week === false && id === 'daily'){ // 주간 미션 -> 일일 미션
          setWeek(true);
      }
      setCategory('all');
  }



  // 미션 목록
  const missionList = [
    {
        'category': 'food',
        'title': '잔반 줄이기',
        'content': '밥을 다 먹어봐요!',
    },
    {
        'category': 'water',
        'title': '물 아껴 쓰기',
        'content': '양치 컵에 물을 받아서 양치해요!'
    },
    {
        'category': 'recycle',
        'title': '쓰레기 줄이기',
        'content': '쓰레기에 묻은 음식을 닦아 버려봐요!',
    },
    {
        'category': 'electronic',
        'title': '전기 아껴쓰기',
        'content': '안 쓰는 콘센트를 뽑아봐요!',
    }
  ]

  // category 목록
  const categoryList = [
    {
        'category': 'all',
    },
    {
        'category': 'food',
    },
    {
        'category': 'water',
    },
    {
        'category': 'recycle',
    },
    {
        'category': 'electronic',
    },
  ]


  return (
    <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{Week === true ? 'Today' : 'Week'}</Text>
            <Text style={styles.dateText}>
              {time.month}월 {Week ? `${time.date}일` : `${weekend}주차`}
            </Text>
          </View>

          <View style={styles.missionContainer}>
            <View style={styles.btnContainer}>
              <TouchableOpacity key={'1'} style={{...styles.btnText, backgroundColor: Week ? "#9AEDA5" : 'white'}} onPress={(e) => {onPressHandler('daily')}}>
                <Text style={styles.text}>일일 미션</Text>
              </TouchableOpacity>

              <TouchableOpacity key={'2'} style={{...styles.btnText, backgroundColor: !Week ? "#9AEDA5" : 'white'}} onPress={(e) => {onPressHandler('week')}}>
                <Text style={styles.text}>주간 미션</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categoryContainer}>
            {(categoryList
                .map((mission, idx) =>
                    <MissionCategory
                        key={idx}
                        misCategory={mission.category}
                        btnOn={category === mission.category ? true : false}
                        style={styles.categoryLogo}
                        onHandler={(e) => setCategory(mission.category)}
                    />
            ))}
            </View>

            {category === 'all' ?
            (missionList
                .map((mission, idx) =>
                    <MissionBox key={idx} category={mission.category} title={mission.title} content={mission.content}/>
            ))
            :
            (missionList
                .filter((mission) => mission.category === category)
                .map((mission, idx) =>
                    <MissionBox key={idx} category={mission.category} title={mission.title} content={mission.content}/>
            ))}

          </View>
        </View>

    </View>
  );
}


export default MissionScreen;