import React from 'react';
import {Text,ScrollView, View, ImageBackground, StyleSheet, Dimensions} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import panda from '../assets/images/card/RedpandaCard.png';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    image: {
        width: SCREEN_WIDTH * 0.7,
        height: SCREEN_HEIGHT * 0.5,
        marginTop: 20,
        marginBottom: 25,
        marginLeft: SCREEN_WIDTH * 0.15,
        marginRight: SCREEN_WIDTH * 0.15,
        alignItems: "center",

    },
    NameContainer: {
        alignItems: 'center',
    },
    NameText: {
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
    },
    boxContainer: {
        alignItems: 'center',
    },
    contentContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        width: SCREEN_WIDTH * 0.8,

        marginTop: 20,
        marginBottom: 40,

        paddingHorizontal: SCREEN_WIDTH * 0.05,
        paddingVertical: SCREEN_WIDTH * 0.05,
    },
    contentNameText: {
        marginBottom: 20,

        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentExpText: {
        color: 'black',
    },
});

function DetailScreen(props){
    console.log(props.route.params);
    return (
        <View style={styles.container}>
            <ScrollView
                indicatorStyle='black'
                contentContainerStyle={styles.card_scroll}
            >
                <ImageBackground
                    source={panda}
                    style={styles.image}
                    imageStyle={{borderRadius: 20}}
                />

                <View style={styles.boxContainer}>
                    <View style={styles.NameContainer}>
                        <Text style={styles.NameText}>{props.route.params.nickName}</Text>
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.contentNameText}>{props.route.params.name}</Text>
                        <Text style={styles.contentExpText}>{props.route.params.explanation}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailScreen;