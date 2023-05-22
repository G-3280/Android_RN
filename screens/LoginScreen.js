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
  TextInput,
  Alert,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {signIn} from "../lib/auth";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
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

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const usersCollection = firestore().collection('users');

    const handleLogin = async () => {
        console.log(email, password);
        const info = {email, password};

        try{
            const {user} = await signIn(info);
            const data = await usersCollection.get();
            console.log(user);
            // 닉네임 추출
            let userData = data._docs
                .filter(doc => email == doc._data.userEmail);
            let nickname = userData[0]._data.userName;

            setIsLoggedIn(true);
            setEmail('');
            setPassword('');

            Alert.alert(
                '로그인',
                '로그인 성공!',
                [
                    {text: '확인', onPress: () => {navigation.navigate("Home", {
                        nickname: nickname
                    })}}
                ]

            );
        } catch(e){
            setEmail('');
            setPassword('');
            Alert.alert(
                '로그인',
                '로그인 실패하였습니다.',
                [
                    {text: '확인', onPress: () => {navigation.navigate("Login")}}
                ]

            );
        }

    };

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="이메일을 입력하세요"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
        </View>
    );

}

export default LoginScreen;