import React, {Component, useState, useEffect} from 'react';
import type {Node} from 'react';

import { signUp } from "../lib/auth";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";

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
  TextInput,
  Alert,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputContainer: {
        flex: 3,
        width: '100%',

    },

    inputInnerContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SCREEN_HEIGHT * 0.02,
    },

    inputTitle:{
        width: '80%',
        fontWeight: 'bold',
        color: 'black',
    },

    input: {
        height: 45,
        width: '80%',

        marginVertical: 8,
        paddingHorizontal: 16,

        borderWidth: 1,
        borderColor: '#DBD9D9',
        color: "black",
        alignItems: 'center',
        justifyContent: 'center',
    },

    errorMsg: {
        color: "red",
        fontSize: 12,
        display: 'none',
    },

    btnContainer:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginButton: {
        height: 53,
        width: '80%',
        marginTop: 24,
        backgroundColor: '#34E18B',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

function LoginScreen ({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [chkPassword, setChkPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    const db = firebase.firestore();


    const signUpSubmit = async () => { // 회원가입 함수
        const info = {email, password, nickname};



        try {
            if (password !== chkPassword) {
                setShowErrorMsg(true); // Show error message if passwords don't match
                return;
             } else {
                setShowErrorMsg(false);

          const {user} = await signUp(info);
          const firebaseConfig = {
              "uid" : user.uid,
              "userEmail" : email,
              "userName" : nickname,
              "completedMission" : 0,
              "completedCard" : ["penguin", "redPanda", "penguin"],
              "completedEvaluation" : 0,
              "nowCompletedMissionCount": 0,
              "nowTotalMissionCount": 0,
          };
          console.log(user);


          await db.collection('users').doc(user.uid).set(firebaseConfig);
          navigation.navigate("SignUpCompeleteScreen");


          }
        } catch (e) {
          Alert.alert("이미 존재하는 회원입니다.");
        }
      };

    return(
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <View style={styles.inputInnerContainer}>
                <Text style={styles.inputTitle}>아이디</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="이메일을 입력하세요"
                        keyboardType="email-address"
                    />
                </View>


                <View style={styles.inputInnerContainer}>
                <Text style={styles.inputTitle}>비밀번호</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="비밀번호를 입력하세요"
                        secureTextEntry
                    />
                </View>


                <View style={styles.inputInnerContainer}>
                    <Text style={styles.inputTitle}>비밀번호 확인</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setChkPassword}
                        value={chkPassword}
                        placeholder="비밀번호 확인을 위해 다시 입력하세요"
                        secureTextEntry
                    />
                    {showErrorMsg &&
                        <Text style={styles.errorMsg}>비밀번호가 일치하지 않습니다.</Text>
                    }
                </View>


                <View style={styles.inputInnerContainer}>
                <Text style={styles.inputTitle}>닉네임</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNickname}
                        value={nickname}
                        placeholder="사용할 닉네임을 입력하세요"
                    />
                </View>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={signUpSubmit}>
                    <Text style={styles.buttonText}>가입하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default LoginScreen;