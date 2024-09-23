import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const auth = getAuth();
    const navigation = useNavigation();

    // Verificar si el usuario está autenticado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        });

        // Cleanup suscripción cuando el componente se desmonte
        return () => unsubscribe();
    }, [auth]);

    // Función para cerrar sesión
    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigation.navigate('Inicio'); // Navegar a la pantalla de inicio o login
        })
        .catch((error) => {
            console.error('Error al cerrar sesión:', error);
        });
    };

    return (
        <View style={styles.container}>
            {isLoggedIn && (
                <View style={styles.sessionInfo}>
                <Text style={styles.sessionText}>Sesión iniciada</Text>
                <Button title="Cerrar sesión" onPress={handleSignOut} color={'#f31f35'} />
                </View>
            )}
            <View style={styles.search}>
                <View style={styles.iconContainer1}>
                    <Image 
                        source={require('../assets/search.svg')} 
                        style={styles.icon}
                    />
                </View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                />
                <View style={styles.iconContainer2}>
                    <Image 
                        source={require('../assets/mic.svg')} 
                        style={styles.icon}
                    />
                </View>
            </View>
            <View style={styles.recomended}>
                <View style={styles.recomendedTop}>
                    <Text style={styles.title}>Recomendado</Text>
                    <Text style={styles.text}>más</Text>
                </View>
                <View style={styles.recomendedBottom}>
                    <View style={styles.arrowContainer1}>
                        <Image
                            source={require('../assets/transparent.png')} 
                            style={styles.arrow}
                        />
                    </View>
                    <Image
                        source={require('../assets/element.svg')} 
                        style={styles.element1}
                    />
                    <View style={styles.arrowContainer2}>
                        <Image
                            source={require('../assets/arrow-next.svg')} 
                            style={styles.arrow}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.products}>
                <View style={styles.productsTop}>
                    <Text style={styles.title}>Productos</Text>
                </View>
                <View style={styles.productsBottom}>
                    <View style={styles.eachProductContainer}>
                        <Image
                            source={require('../assets/element.svg')} 
                            style={styles.element2}
                        />
                    </View>
                    <View style={styles.eachProductContainer}>
                        <Image
                            source={require('../assets/element.svg')} 
                            style={styles.element2}
                        />
                    </View>
                </View>
                <View style={styles.productsBottom}>
                    <View style={styles.eachProductContainer}>
                        <Image
                            source={require('../assets/element.svg')} 
                            style={styles.element2}
                        />
                    </View>
                    <View style={styles.eachProductContainer}>
                        <Image
                            source={require('../assets/element.svg')} 
                            style={styles.element2}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.tabBar}>
                <View style={styles.tabBarIconContainer}>
                    <Image 
                        source={require('../assets/tab.svg')} 
                        style={styles.icon}
                    />
                </View>
                <View style={styles.tabBarIconContainer}>
                    <Image 
                        source={require('../assets/tab2.svg')} 
                        style={styles.icon}
                    />
                </View>
                <View style={styles.tabBarIconContainer2}>
                    <Image 
                        source={require('../assets/home.svg')} 
                        style={styles.icon}
                    />
                </View>
                <View style={styles.tabBarIconContainer}>
                    <Image 
                        source={require('../assets/cart.svg')} 
                        style={styles.icon}
                    />
                </View>
                <View style={styles.tabBarIconContainer}>
                    <Image 
                        source={require('../assets/user.svg')} 
                        style={styles.icon}
                    />
                </View>
            </View>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
        alignContent: 'space-between',
        justifyContent: 'space-between',
    },
    sessionInfo: {
        padding: 15,
        backgroundColor: '#EDEEEF',
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
    },
        sessionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0fa917',
        marginBottom: 10,
    },
    search: {
        // flex: 1,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#0fa917',
        // padding: 45,
    },
    searchInput: {
        width: '60%',
        height: 40,
        borderColor: '#EDEEEF',
        backgroundColor: '#EDEEEF',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        color: '#878380',
        // borderRadius: 30,
    },
    icon: {
        width: 25,
        height: 25,
    },
    iconContainer1: {
        paddingRight: 15,
        paddingTop: 7,
        paddingBottom: 6,
        paddingLeft: 10,
        borderColor: '#EDEEEF',
        backgroundColor: '#EDEEEF',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    iconContainer2: {
        paddingLeft: 15,
        paddingTop: 7,
        paddingBottom: 6,
        paddingRight: 10,
        borderColor: '#EDEEEF',
        backgroundColor: '#EDEEEF',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    recomended: {
        // flex: 2,
        // backgroundColor: '#0fa917',
        // padding: 45,
    },
    recomendedTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#0fa917',
        // padding: 45,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        paddingLeft: 15,
    },
    text: {
        fontSize: 15,
        fontWeight: '200',
        color: '#878380',
        paddingRight: 15,
    },
    recomendedBottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEEEF',
        borderWidth: 1,
        borderColor: '#EDEEEF',
        borderRadius: 30,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    element1: {
        width: 180,
        height: 180,
    },
    arrow: {
        width: 50,
        height: 50,
    },
    arrowContainer1: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    arrowContainer2: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    products: {
        // flex: 2,
        // backgroundColor: '#0fa917',
        // padding: 45,
    },
    productsTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: '#0fa917',
        // padding: 45,
        marginBottom: 10,
    },
    productsBottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    element2: {
        width: 100,
        height: 100,
    },
    eachProductContainer: {
        padding: 15,
        backgroundColor: '#EDEEEF',
        borderWidth: 1,
        borderColor: '#EDEEEF',
        borderRadius: 30,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: '#EDEEEF',
    },
    tabBarIconContainer: {
        // padding: 15,
        // backgroundColor: '#EDEEEF',
        // borderWidth: 1,
        // borderColor: '#EDEEEF',
        // borderRadius: 30,
    },
    tabBarIconContainer2: {
        padding: 15,
        backgroundColor: '#f31f35',
        borderWidth: 1,
        borderColor: '#f31f35',
        borderRadius: 50,
    },
    
});
