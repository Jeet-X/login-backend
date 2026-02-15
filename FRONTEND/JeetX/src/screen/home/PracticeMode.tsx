import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { startPracticeQuiz, PracticeModeConfig } from '../../api/quizApi';
import GameLaunchBg from '../../assets/game_launch_bg.svg';
import { CONFIG } from '../../api/config';

const { width, height } = Dimensions.get('window');

const PracticeMode = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { subCategoryId, subCategoryName, practiceConfig } = route.params as {
        subCategoryId: string;
        subCategoryName: string;
        practiceConfig?: PracticeModeConfig;
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [startingQuiz, setStartingQuiz] = useState(false);

    const termsContent = practiceConfig?.terms?.content || "Please read the terms for practice mode.";

    const handleStartPlaying = () => {
        setModalVisible(true);
    };

    const handleAcceptTerms = async () => {
        if (!termsAccepted) return;
        setStartingQuiz(true);

        try {
            const response = await startPracticeQuiz(subCategoryId, true);
            if (response.success) {
                setModalVisible(false);
                navigation.navigate('QuizzGamePlay', {
                    sessionData: response.data,
                    subCategoryName,
                    entryCoins: response.data.entry_coins
                });
            } else {
                console.error("Failed to start quiz", response.message);
            }
        } catch (error) {
            console.error("Error starting quiz", error);
        } finally {
            setStartingQuiz(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Background SVG */}
            {/* Base Gradient Background */}
            {/* Base Gradient Background */}
            <LinearGradient
                colors={['#2563eb', '#1e40af', '#1e3a8a']} // Brighter blue gradient base
                style={StyleSheet.absoluteFill}
            />

            {/* Background SVG Overlay */}
            <View style={StyleSheet.absoluteFill}>
                <GameLaunchBg width="100%" height="100%" preserveAspectRatio="none" />
            </View>

            <SafeAreaView style={styles.contentContainer} edges={['top', 'bottom']}>

                <View style={styles.content}>
                    {/* Title */}
                    <Text style={styles.title}>PRACTICE{'\n'}MODE</Text>

                    {/* Quiz Box Area */}
                    <View style={styles.quizBoxWrapper}>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']} // Blueish gradient for the box
                            style={styles.quizBox}
                        >
                            <View style={styles.quizIconsRow}>
                                <FontAwesome name="globe" size={32} color="#4ade80" style={{ transform: [{ rotate: '-10deg' }] }} />
                                <FontAwesome name="paw" size={28} color="#fbbf24" style={{ marginTop: -10 }} />
                            </View>

                            <Text style={styles.quizBoxText}>QUIZ</Text>

                            <View style={styles.quizIconsRowBottom}>
                                <FontAwesome name="deviantart" size={28} color="#f472b6" />
                                {/* Using deviantart as a placeholder for the tower/monument */}
                                <FontAwesome name="image" size={28} color="#60a5fa" />
                            </View>
                        </LinearGradient>
                    </View>


                    {/* Avatar Area */}
                    <View style={styles.profileSection}>
                        <View style={styles.avatarOuterRing}>
                            <View style={styles.avatarInnerCircle}>
                                <FontAwesome name="user-secret" size={60} color="#cbd5e1" />
                            </View>
                        </View>

                        {/* Name Badge */}
                        <View style={styles.nameBadgeContainer}>
                            <Image
                                source={require('../../assets/ProfileIcon.png')}
                                style={{ width: 0, height: 0 }} // Hidden load to ensure asset exists? No, just use simple view
                            />
                            {/* Creating the ribbon shape with View */}
                            <View style={styles.nameRibbon}>
                                <FontAwesome name="trophy" size={14} color="#78350f" style={{ marginRight: 6 }} />
                                {/* Use Google User name if available, else fallback */}
                                <Text style={styles.nameText}>{CONFIG.googleUser?.data?.user?.givenName || CONFIG.googleUser?.data?.user?.name || CONFIG.googleUser?.user?.name || "Player"}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1 }} />

                    {/* Start Button */}
                    <TouchableOpacity onPress={handleStartPlaying} style={styles.startButtonContainer}>
                        <LinearGradient
                            colors={['#fdba74', '#ea580c', '#c2410c']}
                            locations={[0, 0.5, 1]}
                            style={styles.startButton}
                            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                        >
                            <Text style={styles.startButtonText}>Start Playing</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Bottom Info Tip */}
                    <View style={styles.infoTipContainer}>
                        <FontAwesome name="info-circle" size={16} color="#1e293b" style={{ marginTop: 2 }} />
                        <Text style={styles.infoTipText}>
                            Ready Yourself, Train your mind, Time is ticking away!!
                        </Text>
                    </View>
                </View>

            </SafeAreaView>

            {/* Terms Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalPullBar} />
                        <Text style={styles.modalTitle}>Terms & Conditions</Text>
                        <ScrollView style={styles.modalBody}>
                            <Text style={styles.termsText}>{termsContent}</Text>
                            <View style={styles.checkboxRow}>
                                <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
                                    <FontAwesome
                                        name={termsAccepted ? "check-square" : "square-o"}
                                        size={24}
                                        color={termsAccepted ? "#00897b" : "#94a3b8"}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.checkboxLabel}>I Accept all Terms & Conditions</Text>
                            </View>
                        </ScrollView>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.btnReject} onPress={() => setModalVisible(false)}>
                                <Text style={styles.btnRejectText}>Reject</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btnAccept, !termsAccepted && { opacity: 0.6 }]}
                                onPress={handleAcceptTerms}
                                disabled={!termsAccepted || startingQuiz}
                            >
                                {startingQuiz ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnAcceptText}>Accept</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1b4b', // Fallback color
    },
    bgContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    contentContainer: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Montserrat-ExtraBold',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 8,
        letterSpacing: 1,
        lineHeight: 40,
        marginBottom: 40,
    },
    // Quiz Box Styling
    quizBoxWrapper: {
        marginBottom: 50,
        transform: [{ rotate: '-2deg' }],
    },
    quizBox: {
        width: 160,
        height: 110,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    quizBoxText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 1,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
        marginVertical: 4,
    },
    quizIconsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    quizIconsRowBottom: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },

    // Avatar Styling
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarOuterRing: {
        width: 110,
        height: 110,
        borderRadius: 60,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#f59e0b', // Gold border
        elevation: 10,
        zIndex: 10,
    },
    avatarInnerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#000', // Black background for hooded figure
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    // Name Badge
    nameBadgeContainer: {
        marginTop: -18, // Overlap the avatar
        zIndex: 20,
    },
    nameRibbon: {
        backgroundColor: '#f97316', // Orange ribbon
        paddingVertical: 6,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderBottomWidth: 3,
        borderBottomColor: '#c2410c', // Darker orange bottom border for 3D effect
        transform: [{ skewX: '-10deg' }] // Slight skew for ribbon effect
    },
    nameText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },

    // Button Styling
    startButtonContainer: {
        width: '70%',
        marginBottom: 20,
        shadowColor: '#ea580c',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    startButton: {
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffedd5',
    },
    startButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },

    // Info Tip Styling
    infoTipContainer: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        width: '90%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 10,
    },
    infoTipText: {
        color: '#334155',
        fontSize: 13,
        flex: 1,
        fontWeight: '600',
        lineHeight: 18,
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        height: '75%',
    },
    modalPullBar: {
        width: 40,
        height: 5,
        backgroundColor: '#cbd5e1',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
        textAlign: 'center',
        marginBottom: 16,
    },
    modalBody: {
        flex: 1,
        marginBottom: 20,
    },
    termsText: {
        fontSize: 14,
        color: '#334155',
        lineHeight: 22,
        marginBottom: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 4,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#0284c7',
        marginLeft: 12,
        fontWeight: '600',
    },
    modalFooter: {
        flexDirection: 'row',
        gap: 16,
    },
    btnReject: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#94a3b8',
        alignItems: 'center',
    },
    btnRejectText: {
        color: '#64748b',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnAccept: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#00897b',
        alignItems: 'center',
        elevation: 2,
    },
    btnAcceptText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default PracticeMode;
