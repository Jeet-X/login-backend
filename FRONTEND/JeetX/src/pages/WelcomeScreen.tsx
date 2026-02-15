import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Screen</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f8fafc',
    },
});

export default WelcomeScreen;
