import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, FlatList, TouchableOpacity, Image, StatusBar, ActivityIndicator } from 'react-native';

export default function Register(props : any) {

    return (
        <View>
            <Text>
                This is the register page thingy
            </Text>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 10,
        height: '100%',
        width: '100%',
        // alignItems: 'center',
    },
    textContainer: {
        padding: 10,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 20,
        // fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        // fontStyle: 'italic',
        // fontWeight: 'bold',
        padding: 10,
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'contain', // Adjust the image to maintain its aspect ratio
        padding: 10,
    },
    button: {
        // alignItems: 'flex-end',
        marginTop: 30,
        margin: 20,
    },
});