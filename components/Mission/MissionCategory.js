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

import notWater from '../../assets/images/mission/not_seleted_water.png';
import notFood from '../../assets/images/mission/not_seleted_food.png';
import notElectricity from '../../assets/images/mission/not_seleted_eletricity.png';
import notRecycle from '../../assets/images/mission/not_seleted_recycle.png';

import water from '../../assets/images/mission/seleted_water.png';
import food from '../../assets/images/mission/seleted_food.png';
import electricity from '../../assets/images/mission/seleted_eletricity.png';
import recycle from '../../assets/images/mission/seleted_recycle.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
    },
    text:{
        color: 'black',
        fontSize: 17,
    },
    container:{
        width: SCREEN_WIDTH * 0.16,

        paddingVertical: 7,
        marginLeft: SCREEN_WIDTH * 0.02,
        marginRight: SCREEN_WIDTH * 0.02,
        borderRadius: 20,
        alignItems: 'center',
    }
})
function MissionCategory(props) {
    console.log(props);
    const onCategoryHandler = (e) => {
        props.onHandler();
    };

    const [selectedImg, setSelectedImg] = useState('');
    const [notSelectedImg, setNotSelectedImg] = useState('');

    useEffect(() => {
        if(props.misCategory === 'water'){
            setSelectedImg(water);
            setNotSelectedImg(notWater);
        } else if(props.misCategory === 'food'){
              setSelectedImg(food);
              setNotSelectedImg(notFood);
        } else if(props.misCategory === 'electronic'){
            setSelectedImg(electricity);
            setNotSelectedImg(notElectricity);
        } else if(props.misCategory === 'recycle'){
              setSelectedImg(recycle);
              setNotSelectedImg(notRecycle);
        }
    }, [props]);
    return(
    <View>
        <TouchableOpacity  style={{...styles.container, backgroundColor: props.btnOn ? '#C1F4C8' : '#FBFBFD'}} onPress={onCategoryHandler}>
            {props.misCategory === 'all'?
            (<Text
                style={styles.text}
            >
                ALL
            </Text>)
            :
            (<ImageBackground
                source={props.btnOn === true ? selectedImg : notSelectedImg}
                style={styles.image}
            />)}
        </TouchableOpacity>
    </View>
    )
}

export default MissionCategory;