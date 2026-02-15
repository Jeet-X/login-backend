import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MonthlyRanking = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Monthly Ranking</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MonthlyRanking;
