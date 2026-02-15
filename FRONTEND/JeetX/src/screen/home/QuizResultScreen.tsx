import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
    Image,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scale, verticalScale } from '../../utils/responsive';
import GameLaunchBg from '../../assets/game_launch_bg.svg'; // Reuse background

const { width } = Dimensions.get('window');

const QuizResultScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        score = 0,
        totalQuestions = 10,
        playerName = "Herjeet"
    } = route.params as { score: number, totalQuestions: number, playerName?: string } || {};

    const percentage = Math.min(Math.max((score / totalQuestions) * 100, 0), 100);
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: percentage,
            duration: 1500,
            useNativeDriver: false
        }).start();
    }, [percentage]);

    let message = "";
    if (score > 9) {
        message = "You've nailed it, few more for new league,\nKeep going!";
    } else if (score > 5) {
        message = "Keep practicing, not bad!";
    } else {
        message = "Need more practice.";
    }

    const handleContinue = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            {/* Background SVG */}
            <View style={StyleSheet.absoluteFill}>
                <GameLaunchBg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
            </View>

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>

                    {/* Winner Shield / Trophy Placeholder */}
                    <View style={styles.trophyContainer}>
                        <LinearGradient
                            colors={['#fbbf24', '#d97706']}
                            style={styles.shield}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.winnerText}>WINNER</Text>
                            <View style={styles.avatarContainer}>
                                <FontAwesome name="user-secret" size={40} color="#000" />
                            </View>
                        </LinearGradient>

                        {/* Confetti / Decoration dots (simulated) */}
                        <View style={styles.confettiContainer}>
                            {/* Static dots for now, can be lottie later */}
                        </View>
                    </View>

                    <Text style={styles.congratsText}>Congratulations {playerName}</Text>

                    <Text style={styles.scoreText}>
                        <Text style={{ color: '#22c55e' }}>{score}/{totalQuestions}</Text>
                        <Text style={{ color: '#fff' }}> Correct!!</Text>
                    </Text>

                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                        <View style={styles.crownIcon}>
                            <FontAwesome name="trophy" size={20} color="#d97706" />
                        </View>
                        <View style={styles.track}>
                            <Animated.View
                                style={[
                                    styles.fill,
                                    {
                                        width: progressAnim.interpolate({
                                            inputRange: [0, 100],
                                            outputRange: ['0%', '100%']
                                        })
                                    }
                                ]}
                            />
                        </View>
                    </View>

                    <Text style={styles.messageText}>
                        {message}
                    </Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <LinearGradient
                            colors={['#f97316', '#ea580c']}
                            style={styles.btnGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <Text style={styles.btnText}>Continue</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.bottomActions}>
                        <TouchableOpacity style={styles.circleBtn}><FontAwesome name="home" size={20} color="#fb923c" /></TouchableOpacity>
                        <TouchableOpacity style={styles.circleBtn}><FontAwesome name="play" size={20} color="#fb923c" /></TouchableOpacity>
                        <TouchableOpacity style={styles.circleBtn}><FontAwesome name="share" size={20} color="#fb923c" /></TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#172554',
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: verticalScale(20),
    },
    content: {
        width: '100%',
        alignItems: 'center',
        marginTop: verticalScale(40),
        paddingHorizontal: scale(20),
    },
    trophyContainer: {
        alignItems: 'center',
        marginBottom: verticalScale(30),
    },
    shield: {
        width: scale(160),
        height: scale(200),
        borderBottomLeftRadius: scale(80),
        borderBottomRightRadius: scale(80),
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: '#f59e0b',
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    winnerText: {
        color: '#fff',
        fontSize: scale(24),
        fontWeight: 'bold',
        marginBottom: verticalScale(10),
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 1,
    },
    avatarContainer: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(30),
        backgroundColor: '#fbbf24',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    congratsText: {
        color: '#fff',
        fontSize: scale(22),
        fontWeight: 'bold',
        marginBottom: verticalScale(10),
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    scoreText: {
        fontSize: scale(32),
        fontWeight: '900',
        marginBottom: verticalScale(30),
        fontFamily: 'Montserrat-Bold',
    },
    progressContainer: {
        width: '100%',
        height: verticalScale(24),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(20),
        position: 'relative',
    },
    crownIcon: {
        position: 'absolute',
        left: -10,
        zIndex: 10,
        backgroundColor: '#78350f', // dark brown/bronze
        padding: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fbbf24',
    },
    track: {
        flex: 1,
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: verticalScale(12),
        overflow: 'hidden',
        marginLeft: scale(10), // space for crown
    },
    fill: {
        height: '100%',
        backgroundColor: '#22c55e',
    },
    messageText: {
        color: '#cbd5e1',
        fontSize: scale(16),
        textAlign: 'center',
        lineHeight: scale(22),
        fontFamily: 'Montserrat-Regular',
        maxWidth: '80%',
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        marginBottom: verticalScale(20),
    },
    continueButton: {
        width: '80%',
        height: verticalScale(56),
        borderRadius: scale(28),
        overflow: 'hidden',
        marginBottom: verticalScale(24),
        elevation: 8,
    },
    btnGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: scale(18),
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 1,
    },
    bottomActions: {
        flexDirection: 'row',
        gap: scale(24),
    },
    circleBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    confettiContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Add confetti logic if needed
    },
});

export default QuizResultScreen;
