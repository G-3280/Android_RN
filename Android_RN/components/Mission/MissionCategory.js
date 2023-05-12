import React, {Component, useState} from 'react';
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
    },
    container:{
        width: SCREEN_WIDTH * 0.16,

        paddingVertical: 7,
        marginLeft: SCREEN_WIDTH * 0.045,
        marginRight: SCREEN_WIDTH * 0.045,
        borderRadius: 20,
        alignItems: 'center',
    }
})
function MissionCategory(props) {
    const onCategoryHandler = (e) => {
        props.onHandler();
    };
    return(
    <View>
        <TouchableOpacity  style={{...styles.container, backgroundColor: props.category ? '#C1F4C8' : '#FBFBFD'}} onPress={onCategoryHandler}>
            <ImageBackground
                source={water}
                style={styles.image}
            />
        </TouchableOpacity>
    </View>
    )
}

export default MissionCategory;