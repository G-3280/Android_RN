import React, {Component, useState, useEffect} from 'react';
import type {Node} from 'react';
import { signUp } from "../lib/auth";
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
    },

    input: {
        height: 45,
        width: '80%',
        marginVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#DBD9D9',
        color: "black",
    },

    btnContainer:{
        flex: 1,
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

    const signUpSubmit = async () => { // 회원가입 함수
        const info = {email, password, nickname};
        try {
          const {user} = await signUp(info);
          console.log(user);
          Alert.alert(
              '회원가입',
              '회원가입 성공!',
              [
                  {text: '확인', onPress: () => {navigation.navigate("Login")}}
              ]

          );
        } catch (e) {
          Alert.alert("이미 존재하는 회원입니다.");
        }
      };

    return(
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <Text>아이디</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="이메일을 입력하세요"
                    keyboardType="email-address"
                />

                <Text>비밀번호</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="비밀번호를 입력하세요"
                    secureTextEntry
                />

                <Text>비밀번호 확인</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setChkPassword}
                    value={chkPassword}
                    placeholder="비밀번호 확인을 위해 다시 입력하세요"
                    secureTextEntry
                />

                <Text>닉네임</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNickname}
                    value={nickname}
                    placeholder="사용할 닉네임을 입력하세요"
                />
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