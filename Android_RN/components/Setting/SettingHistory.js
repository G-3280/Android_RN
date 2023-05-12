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
} from 'react-native';

import mission from '../../assets/images/history/Completed.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH * 0.9 * 0.33,
        alignItems: 'center',

    },
    image: {
        width: 54,
        height: 54,
    }
});

function SettingHistory (props){
    return(
        <View style={styles.container}>
            <Image source={props.source} style={styles.image}/>
            <Text>{props.completed}개</Text>
            <Text>{props.contentText}</Text>
        </View>
    );
};

export default SettingHistory;