import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, FlatList, TouchableOpacity, Image, StatusBar, ActivityIndicator } from 'react-native';

export default function TheCars(props : any) {
    
    const [data, setData] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);

    // Fetch JSON data from web file (API)
    async function request() {
        try {
            var response = await fetch('https://checo894.github.io/mobileDevelopment/theDream.json');
            var json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch data on component mount
    useEffect(() => {
        request();
    }, []);

    // Handle selection of a Car
    const handleSelectCar = (Car) => {
        setSelectedCar(Car);
    };

    // Handle back button to return to the list
    const handleBack = () => {
        setSelectedCar(null);
    };

    return (
        <View>
            <StatusBar style="auto" />

            {selectedCar ? (
                // Detailed view of the selected Car
                <View style={styles.container}>
                    <Text style={styles.name}>{selectedCar.name}</Text>  
                    <Image 
                        source={{ uri: selectedCar.picture }} 
                        style={styles.image}
                    />
                    {/* <TouchableOpacity onPress={handleBack}>
                        <Text>&lt; &lt; Back to list</Text>
                    </TouchableOpacity> */}
                    <View style={styles.button}>
                        <Button
                            title="Back to list"
                            onPress={handleBack}
                        />
                    </View>
                </View>
            ) : (
                // List view of Cars
                <View style={styles.container}>
                    {/* <View style={styles.textContainer}>
                        <Text style={styles.subtitle}>Choose one Car:</Text>
                    </View> */}
                    {data.length > 0 ? (
                        <FlatList 
                            data={data}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => handleSelectCar(item)}>
                                        <Text style={styles.text}>-   {item.name}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    ) : (
                        <ActivityIndicator size="large" />
                    )}
                </View>
            )}
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