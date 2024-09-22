import React from 'react';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, FlatList, TouchableOpacity, Image, StatusBar, ActivityIndicator, TextInput } from 'react-native';

export default function Home({navigation} : any) {


    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Image 
                    source={require('../assets/search.svg')} 
                    style={styles.icon1}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                />
                <Image 
                    source={require('../assets/mic.svg')} 
                    style={styles.icon2}
                />
            </View>
            {/* <View style={styles.recomended}></View>
            <View style={styles.products}></View>
            <View style={styles.tabBar}></View> */}
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
        // alignItems: 'center',
    },
    search: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: '#0fa917',
        // padding: 45,
    },
    searchInput: {
        width: '70%',
        height: 40,
        borderColor: '878380',
        backgroundColor: '#EDEEEF',
        borderWidth: 1,
        borderRadius: 30,
    },
    icon1: {
        width: 30,
        height: 30,
    },
    icon2: {
        width: 30,
        height: 30,
    },
});