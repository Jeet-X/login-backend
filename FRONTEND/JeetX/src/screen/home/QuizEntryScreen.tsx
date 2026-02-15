import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image,
    StatusBar,
    Animated,
    Dimensions,
    Modal,
    BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getQuizEntryOptions, QuizEntryResponse, startPracticeQuiz, joinTournament, startTournamentQuiz } from '../../api/quizApi';
import { scale, verticalScale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

const QuizEntryScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { subCategoryId, subCategoryName } = route.params as { subCategoryId: string; subCategoryName: string };

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<QuizEntryResponse['data'] | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const toastOpacity = useRef(new Animated.Value(0)).current;

    // View Mode State
    const [viewMode, setViewMode] = useState<'SELECTION' | 'TOURNAMENT_LIST'>('SELECTION');

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [startingQuiz, setStartingQuiz] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
    const [mode, setMode] = useState<'PRACTICE' | 'TOURNAMENT'>('PRACTICE');

    // Countdown State
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await getQuizEntryOptions(subCategoryId);
                if (response.success) {
                    setData(response.data);
                }
            } catch (error) {
                console.error('Error fetching entries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();

        const timer = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, [subCategoryId]);

    // Handle Hardware Back Press
    useEffect(() => {
        const backAction = () => {
            if (viewMode === 'TOURNAMENT_LIST') {
                setViewMode('SELECTION');
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [viewMode]);

    const handleBackPress = () => {
        if (viewMode === 'TOURNAMENT_LIST') {
            setViewMode('SELECTION');
        } else {
            navigation.goBack();
        }
    };

    const showToast = (message: string) => {
        setToastMessage(message);
        Animated.sequence([
            Animated.timing(toastOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(toastOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => setToastMessage(null));
    };

    const handlePracticeClick = () => {
        if (!data) return;
        const { practice_mode, wallet_balance } = data;

        if (!practice_mode.available) {
            showToast("Practice mode is currently unavailable.");
            return;
        }

        if (practice_mode.entry_coins > wallet_balance) {
            // Check if user really wants to proceed if balance is low? 
            // Usually we block, but let's just warn or allow viewing terms.
            // showToast("Insufficient balance. Add coins to your account.");
            // return; 
        }

        // Navigate to new Practice Mode screen
        (navigation as any).navigate('PracticeMode', {
            subCategoryId,
            subCategoryName,
            practiceConfig: practice_mode
        });
        // setMode('PRACTICE');
        // setSelectedSlot(null);
        // setTermsAccepted(false);
        // setModalVisible(true);
    };

    const handleTournamentModeSelect = () => {
        setViewMode('TOURNAMENT_LIST');
    };

    const handleTournamentJoin = (slot: any) => {
        if (!data) return;
        const { wallet_balance } = data;

        if (slot.entry_coins > wallet_balance) {
            showToast("Insufficient balance to join.");
            // return;
        }

        setMode('TOURNAMENT');
        setSelectedSlot(slot);
        setTermsAccepted(false);
        setModalVisible(true);
    };

    const handleAcceptTerms = async () => {
        if (!termsAccepted) return;
        setStartingQuiz(true);

        try {
            if (mode === 'PRACTICE') {
                const response = await startPracticeQuiz(subCategoryId, true);
                if (response.success) {
                    setModalVisible(false);
                    (navigation as any).navigate('QuizzGamePlay', {
                        sessionData: response.data,
                        subCategoryName
                    });
                } else {
                    showToast(response.message || "Failed to start quiz");
                }
            } else {
                if (selectedSlot) {
                    const joinResponse = await joinTournament(selectedSlot.id, true);

                    if (joinResponse.success) {
                        const { session_id, slot_details } = joinResponse.data;
                        const startTime = new Date(slot_details.start_time).getTime();
                        const now = Date.now();

                        if (now >= startTime) {
                            const startResponse = await startTournamentQuiz(session_id);
                            if (startResponse.success) {
                                setModalVisible(false);
                                (navigation as any).navigate('QuizzGamePlay', {
                                    sessionData: startResponse.data,
                                    subCategoryName,
                                    mode: 'TOURNAMENT'
                                });
                            } else {
                                setModalVisible(false);
                                showToast(startResponse.message || "Tournament joined, but failed to start quiz.");
                            }
                        } else {
                            setModalVisible(false);
                            showToast("Tournament joined! Wait for start time.");
                        }
                    } else {
                        showToast(joinResponse.message || "Failed to join tournament"); // Access message correctly if exists
                    }
                }
            }
        } catch (error: any) {
            showToast(error.message || "An error occurred");
        } finally {
            setStartingQuiz(false);
        }
    };

    const getTimeRemaining = (endTime: string) => {
        const total = Date.parse(endTime) - currentTime;
        if (total <= 0) return "Started";
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const seconds = Math.floor((total / 1000) % 60);
        return `${hours > 0 ? hours + 'h ' : ''}${minutes}m:${seconds < 10 ? '0' : ''}${seconds}s`;
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00897b" />
            </View>
        );
    }

    const { practice_mode, tournament_mode } = data || {};

    const renderFeatureItem = (text: string) => (
        <View style={styles.featureRow}>
            <FontAwesome name="check" size={10} color="#64748b" style={{ marginTop: 2 }} />
            <Text style={styles.featureText}>{text}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor="#02121a" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{subCategoryName || 'Logic Quiz'}</Text>
                <View style={styles.walletContainer}>
                    <View style={styles.coinIcon}>
                        <Text style={styles.coinSymbol}>©</Text>
                    </View>
                    <Text style={styles.walletText}>{data?.wallet_balance?.toLocaleString() ?? 0}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {viewMode === 'SELECTION' ? (
                    <>
                        <Text style={styles.pageTitle}>Choose Your Play Mode</Text>
                        <Text style={styles.pageSubtitle}>Practice freely or compete with real players.</Text>

                        {/* Practice Mode Card */}
                        <TouchableOpacity
                            style={[styles.modeCard, styles.practiceCard]}
                            onPress={handlePracticeClick}
                            activeOpacity={0.9}
                            disabled={!practice_mode?.available}
                        >
                            <View style={styles.modeHeader}>
                                <View style={[styles.iconBox, styles.practiceIconBg]}>
                                    <FontAwesome name="bolt" size={20} color="#ea580c" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.modeTitle}>PRACTICE MODE</Text>
                                    <Text style={styles.modeHighlight}>Free & Fun</Text>
                                </View>
                                <FontAwesome name="question-circle" size={16} color="#ea580c" />
                            </View>
                            <Text style={styles.modeDesc}>Solve puzzles for learning & fun</Text>
                            <View style={styles.featuresContainer}>
                                <View style={styles.featureCol}>
                                    {renderFeatureItem('No entry fee')}
                                    {renderFeatureItem('Learn at your pace')}
                                </View>
                                <View style={styles.featureCol}>
                                    {renderFeatureItem('No leaderboard')}
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Tournament Mode Card */}
                        <TouchableOpacity
                            style={[styles.modeCard, styles.tournamentCard]}
                            onPress={handleTournamentModeSelect}
                            activeOpacity={0.9}
                        >
                            <View style={styles.modeHeader}>
                                <View style={[styles.iconBox, styles.tournamentIconBg]}>
                                    <FontAwesome name="trophy" size={20} color="#ca8a04" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.modeTitle}>TOURNAMENT MODE</Text>
                                    <Text style={[styles.modeHighlight, { color: '#ca8a04' }]}>Compete & Win</Text>
                                </View>
                                <FontAwesome name="question-circle" size={16} color="#ca8a04" />
                            </View>
                            <Text style={styles.modeDesc}>Compete in puzzles & win prizes</Text>
                            <View style={styles.featuresContainer}>
                                <View style={styles.featureCol}>
                                    {renderFeatureItem('Entry fee applicable')}
                                    {renderFeatureItem('Leaderboard rankings')}
                                </View>
                                <View style={styles.featureCol}>
                                    {renderFeatureItem('Timed events')}
                                    {renderFeatureItem('Real rewards')}
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Bottom Stats */}
                        <View style={styles.statsRow}>
                            <View style={styles.statBox}>
                                <View style={styles.statHeader}>
                                    <FontAwesome name="users" size={12} color="#64748b" />
                                    <Text style={styles.statLabel}>Active Players</Text>
                                </View>
                                <Text style={styles.statValue}>12.5K</Text>
                            </View>
                            <View style={styles.statBox}>
                                <View style={styles.statHeader}>
                                    <FontAwesome name="gift" size={12} color="#64748b" />
                                    <Text style={styles.statLabel}>Prize Pool</Text>
                                </View>
                                <Text style={styles.statValue}>50K</Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.pageTitle}>Select Your Challenge</Text>
                        <Text style={styles.pageSubtitle}>Challenge yourself against live opponents.</Text>

                        {tournament_mode?.slots?.map((slot, index) => {
                            const startTime = new Date(slot.start_time).getTime();
                            const isLive = currentTime >= startTime;

                            return (
                                <View key={slot.id || index} style={styles.slotCard}>
                                    <View style={[styles.slotIconContainer, { backgroundColor: index % 2 === 0 ? '#fef3c7' : '#ffedd5' }]}>
                                        <FontAwesome
                                            name={index % 2 === 0 ? "binoculars" : "gamepad"}
                                            size={24}
                                            color={index % 2 === 0 ? "#d97706" : "#c2410c"}
                                        />
                                    </View>

                                    <View style={styles.slotContent}>
                                        <Text style={styles.slotTitle}>{slot.slot_name || 'Tournament'}</Text>
                                        <View style={styles.slotMetaRow}>
                                            <FontAwesome name="users" size={10} color="#94a3b8" style={{ marginRight: 4 }} />
                                            <Text style={styles.slotPlayersText}>{slot.current_players || 0}/{slot.max_players}</Text>
                                        </View>
                                        <Text style={[styles.timerText, isLive && { color: '#22c55e' }]}>
                                            {isLive ? 'LIVE NOW' : `Starts In - ${getTimeRemaining(slot.start_time)}`}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.priceButton}
                                        onPress={() => handleTournamentJoin(slot)}
                                    >
                                        <Text style={styles.priceButtonText}>₹ {slot.entry_coins}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}

                        {!tournament_mode?.slots?.length && (
                            <View style={{ alignItems: 'center', marginTop: 40 }}>
                                <Text style={{ color: '#94a3b8' }}>No tournaments available right now.</Text>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

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
                        <Text style={styles.modalDate}>Last updated: {new Date().toLocaleDateString()}</Text>

                        <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                            <Text style={styles.termsText}>
                                {mode === 'TOURNAMENT'
                                    ? (selectedSlot?.terms_content || "Please read the terms and conditions carefully before creating an account or using our services.")
                                    : (practice_mode?.terms?.content || "Please read the terms for practice mode.")
                                }
                            </Text>

                            <Text style={styles.termsHeading}>Acceptance of Terms</Text>
                            <Text style={styles.termsText}>
                                By using this website or application, you confirm that you accept these Terms and Conditions and agree to comply with them. If you do not agree, please do not use the service.
                            </Text>

                            <Text style={styles.termsHeading}>Use of Services</Text>
                            <Text style={styles.termsText}>
                                You agree to use the platform only for lawful purposes and in a manner that does not violate any applicable laws, regulations, or third-party rights.
                            </Text>

                            <View style={styles.checkboxRow}>
                                <TouchableOpacity
                                    onPress={() => setTermsAccepted(!termsAccepted)}
                                    style={{ padding: 4 }}
                                >
                                    <FontAwesome
                                        name={termsAccepted ? "check-square" : "square-o"}
                                        size={20}
                                        color={termsAccepted ? "#00897b" : "#94a3b8"}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.checkboxLabel}>I Accept all Terms & Conditions</Text>
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.btnReject}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.btnRejectText}>Reject</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btnAccept, !termsAccepted && { opacity: 0.6 }]}
                                onPress={handleAcceptTerms}
                                disabled={!termsAccepted || startingQuiz}
                            >
                                {startingQuiz ? (
                                    <ActivityIndicator color="#fff" size="small" />
                                ) : (
                                    <Text style={styles.btnAcceptText}>Accept</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Toast */}
            {toastMessage && (
                <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
                    <Text style={styles.toastText}>{toastMessage}</Text>
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(12),
        backgroundColor: '#02121a',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4),
        borderRadius: scale(16),
        gap: scale(4),
    },
    coinIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fbbf24',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinSymbol: {
        color: '#92400e',
        fontWeight: 'bold',
        fontSize: 12,
    },
    walletText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scale(14),
    },
    scrollContent: {
        padding: scale(20),
        paddingBottom: verticalScale(40),
    },
    pageTitle: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: verticalScale(4),
        fontFamily: 'Montserrat-Bold',
    },
    pageSubtitle: {
        fontSize: scale(13),
        color: '#64748b',
        marginBottom: verticalScale(20),
        fontFamily: 'Montserrat-Regular',
    },
    modeCard: {
        backgroundColor: '#fff',
        borderRadius: scale(16),
        padding: scale(16),
        marginBottom: verticalScale(16),
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    practiceCard: {
        borderColor: '#f97316',
        backgroundColor: '#fff7ed',
    },
    tournamentCard: {
        borderColor: '#eab308',
        backgroundColor: '#fefce8',
    },
    modeHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: scale(12),
        marginBottom: verticalScale(8),
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    practiceIconBg: {
        backgroundColor: '#ffedd5',
    },
    tournamentIconBg: {
        backgroundColor: '#fef9c3',
    },
    modeTitle: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#1e293b',
        letterSpacing: 0.5,
    },
    modeHighlight: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#ea580c',
        marginTop: 2,
    },
    modeDesc: {
        fontSize: scale(13),
        color: '#334155',
        marginBottom: verticalScale(12),
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 8,
        padding: 8,
    },
    featureCol: {
        gap: 6,
    },
    featureRow: {
        flexDirection: 'row',
        gap: 6,
    },
    featureText: {
        fontSize: scale(11),
        color: '#475569',
    },
    statsRow: {
        flexDirection: 'row',
        gap: scale(12),
        marginTop: verticalScale(4),
    },
    statBox: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    statLabel: {
        fontSize: scale(12),
        color: '#64748b',
    },
    statValue: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#0f172a',
    },
    // Tournament List Styles
    slotCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f1f5f9',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
    },
    slotIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    slotContent: {
        flex: 1,
    },
    slotTitle: {
        fontSize: scale(15),
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    slotMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    slotPlayersText: {
        fontSize: scale(11),
        color: '#64748b',
    },
    timerText: {
        fontSize: scale(11),
        color: '#ef4444',
        fontWeight: '600',
    },
    priceButton: {
        backgroundColor: '#00897b',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    priceButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scale(13),
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        height: '80%',
    },
    modalPullBar: {
        width: 40,
        height: 4,
        backgroundColor: '#cbd5e1',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#0f172a',
        textAlign: 'center',
        marginBottom: 4,
    },
    modalDate: {
        fontSize: scale(12),
        color: '#94a3b8',
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    modalBody: {
        flex: 1,
        marginBottom: 20,
    },
    termsHeading: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#1e293b',
        marginTop: 12,
        marginBottom: 4,
    },
    termsText: {
        fontSize: scale(13),
        color: '#334155',
        lineHeight: 20,
        marginBottom: 8,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    checkboxLabel: {
        fontSize: scale(13),
        color: '#0284c7',
        marginLeft: 8,
        textDecorationLine: 'underline',
    },
    modalFooter: {
        flexDirection: 'row',
        gap: 12,
    },
    btnReject: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderColor: '#00897b',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnRejectText: {
        color: '#00897b',
        fontWeight: 'bold',
        fontSize: scale(15),
    },
    btnAccept: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#00897b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnAcceptText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scale(15),
    },
    toast: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: '#1e293b',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    toastText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default QuizEntryScreen;
