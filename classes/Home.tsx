import React from 'react';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, FlatList, TouchableOpacity, Image, StatusBar, ActivityIndicator, TextInput } from 'react-native';

export default function Home({navigation} : any) {


    return (
        <View style={styles.container}>
            <Text>HOME</Text>
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
});