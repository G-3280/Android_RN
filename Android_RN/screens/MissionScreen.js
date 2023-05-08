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

    categoryLogo: {

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


function MissionScreen() {
  let today = new Date();
  let time = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  };

  // 가장 마지막으로 미션이 업데이트 된 날짜
  const [updateDate, setUpdateDate] = useState(`${time.year}-${time.month}-${time.date}`);

  const [working, setWorking] = useState(false);
  const [Week, setWeek] = useState(false);
  const [category, setCategory] = useState('');
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
      setCategory('');
  }



  // 미션 목록
  const missionList = [
    {
        'category': 'food',
        'content': '음식 다 먹기'
    },
    {
        'category': 'water',
        'content': '물 아껴 쓰기'
    },
    {
        'category': 'trash',
        'content': '쓰레기 제대로 버리기'
    },
    {
        'category': 'electronic',
        'content': '전기 아껴 쓰기'
    }
  ]

  return (
    <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{Week === true ? 'Today' : 'Week'}</Text>
            <Text style={styles.dateText}>
              {time.month}월 {time.date}일
            </Text>
          </View>

          <View style={styles.missionContainer}>
            <View style={styles.btnContainer}>
              <TouchableOpacity key={'1'} style={{...styles.btnText, backgroundColor: Week ? "#9AEDA5" : 'white'}} onPress={(e) => {onPressHandler('daily')}}>
                <Text>일일 미션</Text>
              </TouchableOpacity>

              <TouchableOpacity key={'2'} style={{...styles.btnText, backgroundColor: !Week ? "#9AEDA5" : 'white'}} onPress={(e) => {onPressHandler('week')}}>
                <Text>주간 미션</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categoryContainer}>
                <MissionCategory
                    category={category === 'food' ? true : false}
                    style={styles.categoryLogo}
                    onHandler={(e) => setCategory('food')}
                />
                <MissionCategory
                    category={category === 'water' ? true : false}
                    style={styles.categoryLogo}
                    onHandler={(e) => setCategory('water')}
                />
                <MissionCategory
                    category={category === 'trash' ? true : false}
                    style={styles.categoryLogo}
                    onHandler={(e) => setCategory('trash')}
                />
                <MissionCategory
                    category={category === 'electronic' ? true : false}
                    style={styles.categoryLogo}
                    onHandler={(e) => setCategory('electronic')}
                />
            </View>


            {category === '' ?
            (missionList
                .map((mission) =>
                    <MissionBox category={mission.category} content={mission.content}/>
            ))
            :
            (missionList
                .filter((mission) => mission.category === category)
                .map((mission) =>
                    <MissionBox category={mission.category} content={mission.content}/>
            ))}

          </View>
        </View>

    </View>
  );
}


export default MissionScreen;