import React from 'react';
import {Text, StyleSheet, Button, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DetailScreen from './DetailScreen';


function TapButton(){
    const navigation = useNavigation();
    return (
        <View style={{backgroundColor: 'black'}}>
            <Button
                title="프로필"
                onPress={() => navigation.navigate('Detail')}
                style = {styles.profile_btn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    profile_btn: {
        backgroundColor: 'black',
        color: 'white',
        flex: 0.3,
        borderRadius: 10,
        margin: 15,
    },

})

export default TapButton;