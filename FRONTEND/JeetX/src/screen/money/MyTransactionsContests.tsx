import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyTransactionsContests = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>My Transactions Contests</Text>
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

export default MyTransactionsContests;
