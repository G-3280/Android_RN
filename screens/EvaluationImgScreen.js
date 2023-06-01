import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text,ScrollView, View, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import Tiger from '../assets/images/tiger.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import firestore, {doc, getDoc} from '@react-native-firebase/firestore';
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
    const [imageName, setImageName] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const storage = getStorage();
    console.log(route.params);

    // params로 받은 imageUrl 세팅
    useEffect(() => {
    if(imageName.length === 0 && route.params !== null){
        setImageName(route.params.imageUrl);
        console.log(imageName);
    }
    }, [route.params]);


    // storage에서 이미지 불러오기
    useEffect(() => {
        const imagePath = 'rn_image_picker_lib_temp_9dff22f7-16cc-4189-9676-4ac0ea438060.jpg'; // 이미지가 저장된 경로
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
      }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                indicatorStyle='black'
                contentContainerStyle={styles.card_scroll}
            >
                <Text style={styles.category}>물 아껴쓰기</Text>
                {imageUrl !== '' && (<ImageBackground
                    source={{uri: imageUrl}}
                    style={styles.image}
                    imageStyle={{borderRadius: 20}}
                />)}

                <View style={styles.contentWrapper}>
                    <Text>평가 완료</Text>
                    <Text>2 / 5</Text>
                </View>

                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.positiveBtn}>
                        <Text>참 잘했어요!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.negativeBtn}>
                        <Text style={styles.negativeText}>분발하세요!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default EvaluationImgScreen;