import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated, Text, Dimensions} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function ProgressBar({totalStep, nowStep}){
    const count = nowStep/totalStep;
    return(
        <View>
            <View style={styles.bar}>
                <Animated.View
                    style={{
                        backgroundColor: '#93FB62',
                        width: SCREEN_WIDTH * 0.9 * count,
                        height: 20,
                        borderRadius: 8,
                        textAlign: 'center',
                    }}
                >
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        width: SCREEN_WIDTH * 0.8,
        height: 20,
        backgroundColor: '#C2C2C2',
        textAlign: 'center',
        borderRadius: 8,
        marginTop: 20,
        marginLeft: SCREEN_WIDTH * 0.05,
        marginRight: SCREEN_WIDTH * 0.05,
    },
    step: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
})

export default ProgressBar;