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
  PermissionsAndroid,
  Alert
} from 'react-native';

import firebase from "@react-native-firebase/app";
import firestore, {doc, getDoc} from '@react-native-firebase/firestore';
import { getStorage, ref } from "@react-native-firebase/storage";

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import water from '../../assets/images/mission/seleted_water.png';
import food from '../../assets/images/mission/seleted_food.png';
import electricity from '../../assets/images/mission/seleted_eletricity.png';
import recycle from '../../assets/images/mission/seleted_recycle.png';
import check from '../../assets/images/mission/missionCompleted.png';
const styles = StyleSheet.create({
    container:{

        backgroundColor: 'white',
        width: '90%',
        marginBottom: 10,
        marginTop: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
        ...Platform.select({
            android: {
                elevation: 2,
            },
        }),
    },
    mainWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxWrapper: {
        flexDirection: 'row',
    },
    titleWrapper: {
        flexDirection: 'row',
    },

    imgBox: {
        width: 20,
        height: 20,
        marginRight: 5,
    },

    textCategory: {
        color: '#A9A9A9',
        fontSize: 15,
        marginBottom: 10,
    },
    textContent: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },

    checkImg: {
        width: 50,
        height: 50,
    }
});

function MissionBox(props){
    const db = firebase.firestore();
    const storage = getStorage();

    const [response, setResponse] = useState(null);

    const [isDone, setIsDone] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState('');
    const [imgName, setImgName] = useState('');

    const currentUser = firebase.auth().currentUser;

    useEffect(() => {
        console.log(currentUser.uid);
          if (currentUser !== null) {
            setIsLoggedIn(true);
            setUid(currentUser.uid);
          } else {
            setIsLoggedIn(false);
            navigation.navigate("Login");
          }
    }, [firebase.auth().currentUser]);

    // 미션 버튼 눌렀을 때 동작하는 함수 (카메라 연동, 선택한 이미지 업로드)
    const clickMission = async (e) => {
        const {category, content} = props;
        console.log(category, content);
        console.log(uid);

        // 카메라 접근 권한 확인
        const grantedCamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        )

        // 앨범 접근 권환 확인
        const grantedStorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        )

        if(grantedCamera === PermissionsAndroid.RESULTS.GRANTED && grantedStorage === PermissionsAndroid.RESULTS.GRANTED){
            console.log("Camera & storage permission given");
        } else{
            console.log("Camera permission denied");
        }

        // 찍은 사진에 대한 정보는 result에 담김
        const result = await launchCamera({
            mediaType : 'photo',
            cameraType : 'back',
        });
        if (result.didCancel){
          return null;
        }
        setResponse(result);
        console.log(result);

        const asset = result.assets[0];
        const localUri = result.assets[0].uri;
        const uriPath = localUri.split("//").pop();
        const imageName = localUri.split("/").pop();
        console.log(uriPath, imageName);

        // 사진 업로드
        const fileName = result.assets[0].fileName;
        setImgName(result.assets[0].fileName);

        const response = await fetch(localUri);
        const blob = await response.blob();

        const storageRef = storage.refFromURL("gs://g-3280-project.appspot.com");
        const fileRef = storageRef.child(fileName);

        await fileRef.put(blob);



        toStorageMission();
        return;
    }

    // 미션 정보 storage에 업로드
    const toStorageMission = async (e) => {
        let missionDocuments = await db.collection("missionTest").where("title", "==", "쓰레기 줄이기").get();
        for (const docc of missionDocuments.docs) {
            console.log(docc.data());
            if(docc.data().title === "쓰레기 줄이기"){
                const userCollection = await docc.ref.collection("users").doc(uid).get();
                if(userCollection.data() !== undefined){
                    console.log(imgName);
                    docc.ref.collection("users").doc(uid).update({ isCompleted: true })
                    docc.ref.collection("users").doc(uid).update({ imageUrl: imgName })
                }

            }
        }
        Alert.alert('업로드 완료', '업로드를 완료했습니다.', [
          {
            text: '확인',
            onPress: () => console.log('Cancel Pressed'),
          },
        ]);

        // 완료 미션 수 갱신
        let usersDocuments = await db.collection("users").doc(uid).get();
        const prevMissionCnt = usersDocuments.data().nowCompletedMissionCount;
        const prevCompletedMis = usersDocuments.data().completedMission;
        console.log(usersDocuments);
        db.collection("users").doc(uid).update({
            nowCompletedMissionCount: prevMissionCnt + 1,
            completedMission: prevCompletedMis + 1,
        })

        setIsDone(true);

    }

    return(
        <TouchableOpacity
            style={styles.container}
            onPress={clickMission}
        >
        <View style={styles.mainWrapper}>
            <View>
                <View style={styles.boxWrapper}>
                    <ImageBackground
                         style={styles.titleWrapper}
                    >
                        <Image source={water} style={styles.imgBox} />
                        <Text style={styles.textCategory}>
                            {props.title}
                        </Text>
                    </ImageBackground>

                </View>
                <Text style={styles.textContent}>{props.content}</Text>
            </View>
            {isDone &&
            (<View>
                <ImageBackground>
                    <Image source={check} style={styles.checkImg}/>
                </ImageBackground>
            </View>)
            }
        </View>
        </TouchableOpacity>
    );
}

export default MissionBox;