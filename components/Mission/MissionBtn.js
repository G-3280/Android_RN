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

const styles = StyleSheet.create({
    btnContainer:{
        alignItems: 'center',
        flexDirection: 'row',
    },
    onBtn: {
        backgroundColor:'#9AEDA5',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',

        marginTop: 20,
        marginBottom: 20,
        marginRight: 8,

        flex: 1,
        height: 35,

    },
    offBtn:{
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 20,
        marginBottom: 20,

        flex: 1,
        height: 35,

    },
});

function MissionScreen(props){
    const [isWeek, setIsWeek] = useState(false);

    const onPressHandler = (e) => {
        if(isWeek === true){
            setIsWeek(false);
        }else{
            setIsWeek(true);
        }

    }
    return(
    <>
    {isWeek === true ?
        (<View style={styles.btnContainer}>
          <TouchableOpacity style={styles.onBtn}>
            <Text>일일 미션</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.offBtn} onPress={onPressHandler}>
            <Text>주간 미션</Text>
          </TouchableOpacity>
        </View>
       ) : (
       <View style={styles.btnContainer}>
         <TouchableOpacity style={styles.offBtn}  onPress={onPressHandler}>
           <Text>일일 미션</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.onBtn}>
           <Text>주간 미션</Text>
         </TouchableOpacity>
       </View>
        )}
        </>
    );
}

export default MissionScreen;