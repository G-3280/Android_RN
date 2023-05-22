import React, {Component} from 'react';
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
} from 'react-native';

import water from '../../assets/images/mission/water.png';

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
    boxImage: {
        width: 20,
        width: 20,
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
    }
});

function MissionScreen(props){

    return(
        <View style={styles.container}>
            <ImageBackground style={styles.boxImage} source={water}/>
            <Text style={styles.textCategory}>
                {props.category}
            </Text>
            <Text style={styles.textContent}>{props.content}</Text>
        </View>
    );
}

export default MissionScreen;