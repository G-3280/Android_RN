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
        placeholderTextColor: "#DBD9D9",
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
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log(id, password);
        Alert.alert(
            '로그인',
            '로그인 성공!',
            [
                {text: '확인', onPress: () => {navigation.navigate("Home")}}
            ]

        );
    };

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setId}
                value={id}
                placeholder="아이디를 입력하세요"
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