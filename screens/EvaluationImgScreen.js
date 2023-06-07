import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text,ScrollView, View, ImageBackground, StyleSheet, Dimensions} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import firestore, {doc, getDoc, arrayUnion, UpdateAsync} from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app";
import { getStorage, ref, getDownloadURL } from "@react-native-firebase/storage";


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    category:{
        marginTop: 20,
        marginLeft: SCREEN_WIDTH * 0.15,
        color: 'black',
        fontSize: 20,
    },
    image: {
        width: SCREEN_WIDTH * 0.7,
        height: SCREEN_HEIGHT * 0.5,
        marginTop: 20,
        marginBottom: 25,
        marginLeft: SCREEN_WIDTH * 0.15,
        marginRight: SCREEN_WIDTH * 0.15,
        alignItems: "center",

    },
    contentWrapper:{
        alignItems: 'center',
        marginBottom: 30,
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent:"center",
        marginBottom: SCREEN_HEIGHT * 0.1,
    },

    positiveBtn:{
        paddingVertical: 20,
        paddingHorizontal: SCREEN_WIDTH * 0.1,
        backgroundColor: '#9AEDA5',
        borderRadius: 20,
        marginRight: 10,
    },

    negativeBtn: {
        paddingVertical: 20,
        paddingHorizontal: SCREEN_WIDTH * 0.1,
        backgroundColor: '#02956D',
        borderRadius: 20,
        marginLeft: 10,

    },
    negativeText: {
        color: 'white',
    }
});

function EvaluationImgScreen({navigation, route}){
    const db = firebase.firestore();

    const [imageName, setImageName] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    // 평가한 횟수
    const [evaluCnt, setEvaluCnt] = useState(0);

    // 이미지 이름 배열 인덱스
    const [imgIdx, setImgIdx] = useState(0);
    const [imgTitle, setImgTitle] = useState('');

    // 현재 유저 로그인 여부 & uid 변경
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState(firebase.auth().currentUser?.uid);

    // 현재 로그인 여부 확인 & 현재 유저 정보 저장
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


    const storage = getStorage();
    console.log(`params: `);

    // params로 받은 imageUrl 세팅
    useEffect(() => {
    if(imageName.length === 0 && route.params !== null){
        setImageName(route.params.imageUrl);
    }
    }, [route]);


    // storage에서 이미지 불러오기
    useEffect(() => {
        console.log(imgIdx);
        const imagePath = route.params.imageUrl[imgIdx]; // 이미지가 저장된 경로
        setImageUrl(route.params.imageUrl[imgIdx]);

        const imageRef = storage.ref().child(imagePath);
        imageRef
          .getDownloadURL()
          .then((url) => {
            // 이미지 다운로드 URL 사용
            console.log('Image URL:', url);
            setImageUrl(url);
          })
          .catch((error) => {
            // 이미지 다운로드 중 에러 처리
            console.error('Error downloading image:', error);
          });
      }, [imageName, imgIdx]);

      const onHandlerPositiveBtn = async () => {
        // 평가한 횟수 10회 넘어가기 전까지 평가
        if(evaluCnt < 10){
            setEvaluCnt((prev) => prev + 1);
        } else {
            navigation.navigate("EvaluationComplete");
        }
        console.log(evaluCnt);

        // missionTest 컬렉션의 users 컬렉션 내부의 uid 필드에 유저 uid 추가
        let missionDocuments = await db.collection("missionTest").get();
        for (const docc of missionDocuments.docs) {
            console.log(route.params.imageUrl[imgIdx]);
            const userCollection = await docc.ref.collection("users").where("imageUrl", "==", route.params.imageUrl[imgIdx]).get();


            userCollection.forEach(async (docc2) => {
                if(docc2.data().imageUrl === route.params.imageUrl[imgIdx]){
                    console.log('title: ');
                    console.log(docc.data().title);
                    await setImgTitle(docc.data().title);
                }
                console.log('evaluatedUId : ');
                console.log(docc2.data().evaluatedUId);
                // users 컬렉션의 evaluated 필드 가져오기
                let array = docc2.data().evaluatedUId;

                // 배열 길이가 1이면 0번째 인덱스에 넣고 아니면 그 뒤에 추가
                if(array.length === 1){
                    array[0] = uid;
                } else if(array.length < 4){
                    array.push(uid);
                } else if(array.length === 4){
                    array.push(uid);

                    // 평가 완료
                    docc2.ref.update({
                        isEvaluated: true,
                    })
                }

                const docc2Ref = docc2.ref;
                // 평가 uid 추가
                docc2Ref.update({
                    evaluatedUId: array,
                });
                console.log("값 추가 완료");
            })
        }

        if(imgIdx < route.params.imageUrl.length - 1){
        // imgIdx 하나 증가시키고 이미지 또 불러오기
            setImgIdx((prev) => prev + 1);
        } else{
            console.log("평가 완료");
        }
      };

      const onHandlerNegativeBtn = async () => {
        // 평가한 횟수 10회 넘어가기 전까지 평가
        if(evaluCnt < 10){
            setEvaluCnt((prev) => prev + 1);
        } else {
            navigation.navigate("SignUpCompeleteScreen");

            // 평가 완료 횟수 증가
            useEffect(() => {
                if (currentUser === null) {
                  setIsLoggedIn(false);
                  navigation.navigate("Login");
                } else {
                  setIsLoggedIn(true);
                  const uid = currentUser.uid;

                  const usersCollection = firestore().collection('users');
                  usersCollection.doc(uid).get()
                    .then((doc) => {
                      if (doc.exists) {
                        // 문서가 존재하는 경우 데이터에 접근
                        const data = doc.data();
                        console.log(data);
                        const tmpEvaCnt = data.completedEvaluation;

                        let usersDocuments = db.collection("users").doc(uid).get();
                        console.log(usersDocuments);
                        db.collection("users").doc(uid).update({
                            completedEvaluation: tmpEvaCnt + 1,
                        })

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
        }
        console.log(evaluCnt);

        if(imgIdx < route.params.imageUrl.length - 1){
        // imgIdx 하나 증가시키고 이미지 또 불러오기
            setImgIdx((prev) => prev + 1);
        } else{
            console.log("평가 완료");
        }

      }

    return (
        <View style={styles.container}>
            <ScrollView
                indicatorStyle='black'
                contentContainerStyle={styles.card_scroll}
            >
                <Text style={styles.category}>{imgTitle}</Text>
                {imageUrl !== '' && (<ImageBackground
                    source={{uri: imageUrl}}
                    style={styles.image}
                    imageStyle={{borderRadius: 20}}
                />)}

                <View style={styles.contentWrapper}>
                    <Text>평가 완료</Text>
                    <Text>{evaluCnt} / 10</Text>
                </View>

                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.positiveBtn} onPress={onHandlerPositiveBtn}>
                        <Text>참 잘했어요!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.negativeBtn} onPress={onHandlerNegativeBtn}>
                        <Text style={styles.negativeText}>분발하세요!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default EvaluationImgScreen;