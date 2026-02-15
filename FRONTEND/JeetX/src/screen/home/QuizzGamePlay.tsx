import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute, useNavigation } from '@react-navigation/native';
import { scale, verticalScale } from '../../utils/responsive';
import { PracticeSessionData, submitPracticeQuiz, submitTournamentQuiz } from '../../api/quizApi';
import GameLaunchBg from '../../assets/game_launch_bg.svg';
import { CONFIG } from '../../api/config';

const { width } = Dimensions.get('window');

const QuizzGamePlay = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { sessionData, mode = 'PRACTICE', entryCoins } = route.params as { sessionData: PracticeSessionData, mode?: 'PRACTICE' | 'TOURNAMENT', entryCoins?: number };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [score, setScore] = useState(128); // Mock score
    const QUESTIONS_LENGTH = sessionData?.questions?.length || 0;

    // Store answers. Initialize all with "NA"
    const [userAnswers, setUserAnswers] = useState<string[]>(Array(QUESTIONS_LENGTH).fill("NA"));

    const [timeLeft, setTimeLeft] = useState(sessionData?.timer_duration || 300);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isFinishedRef = useRef(false);

    const questions = sessionData?.questions || [];
    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        if (!sessionData?.timer_enabled) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleFinishTimer();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [sessionData]);

    const handleFinishTimer = () => {
        if (isFinishedRef.current) return;
        submitQuiz(userAnswers);
    };

    const handleContinue = () => {
        // 1. Record User Answer or "NA" (though button disabled if null, safe guard)
        // Map option key "option_a" -> "A" for the API?
        // User prompt says: `answers: ["C", "C", ...]`.
        // My option keys are 'option_a', 'option_c' etc.
        // Need to convert 'option_a' -> 'A'.
        const answerMap: { [key: string]: string } = {
            'option_a': 'A',
            'option_b': 'B',
            'option_c': 'C',
            'option_d': 'D'
        };

        const finalAnswer = selectedOption ? answerMap[selectedOption] : "NA";

        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = finalAnswer;
        setUserAnswers(newAnswers);

        // 2. Move Next or Finish
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            // Finished all questions
            submitQuiz(newAnswers);
        }
    };

    const submitQuiz = async (finalAnswers: string[]) => {
        if (isFinishedRef.current) return;
        isFinishedRef.current = true;
        setIsSubmitting(true);

        const totalDuration = sessionData?.timer_duration || 300;
        const timeTaken = totalDuration - timeLeft;

        try {
            console.log("Submitting Quiz:", {
                sid: sessionData?.session_id,
                answers: finalAnswers,
                time: timeTaken,
                mode
            });

            let response;
            if (mode === 'TOURNAMENT') {
                response = await submitTournamentQuiz(sessionData?.session_id, finalAnswers, timeTaken);
            } else {
                response = await submitPracticeQuiz(sessionData?.session_id, finalAnswers, timeTaken);
            }

            if (response.success) {
                const resultData = response.data || {};

                if (mode === 'TOURNAMENT') {
                    Alert.alert("Tournament Completed", "Your responses have been recorded!", [
                        { text: "OK", onPress: () => navigation.goBack() }
                    ]);
                } else {
                    // Attempt to find score in likely fields
                    const score = resultData.score !== undefined ? resultData.score : (resultData.correct_answers || 0);

                    (navigation as any).replace('QuizResult', {
                        score: score,
                        totalQuestions: questions.length,
                        playerName: "Herjeet" // Hardcoded for now, or fetch from profile
                    });
                }
            } else {
                Alert.alert("Submission Failed", response.message);
                navigation.goBack();
            }
        } catch (error: any) {
            console.error("Quiz Submit Error", error);
            Alert.alert("Error", error.message || "Failed to submit quiz.");
            navigation.goBack();
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle back button / early exit
    const handleExit = () => {
        Alert.alert("Quit Quiz?", "Your progress up to this point will be submitted.", [
            { text: "Cancel", style: 'cancel' },
            {
                text: "Quit",
                style: 'destructive',
                onPress: () => {
                    // Submit whatever we have so far?
                    // "if user lefts the quiz in between send the option selected upto he has performedf and NA in rest"
                    // userAnswers is already pre-filled with NA, and we update index by index.
                    // So just submitting current userAnswers is correct!
                    submitQuiz(userAnswers);
                }
            }
        ]);
    };

    if (!sessionData || !currentQuestion) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ color: '#fff' }}>Loading...</Text>
            </View>
        );
    }

    if (isSubmitting) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#f97316" />
                <Text style={{ color: '#fff', marginTop: 10 }}>Submitting Result...</Text>
            </View>
        );
    }

    // A B C D mapping
    const options = [
        { key: 'option_a', label: 'A', text: currentQuestion.option_a },
        { key: 'option_b', label: 'B', text: currentQuestion.option_b },
        { key: 'option_c', label: 'C', text: currentQuestion.option_c },
        { key: 'option_d', label: 'D', text: currentQuestion.option_d },
    ];

    return (
        <View style={styles.container}>
            {/* Background SVG */}
            <View style={StyleSheet.absoluteFill}>
                <GameLaunchBg width="100%" height="100%" preserveAspectRatio="none" />
            </View>

            <SafeAreaView style={styles.safeArea}>
                {/* Header: Avatar, Name, Score */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleExit} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={20} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <FontAwesome name="user-secret" size={24} color="#fbbf24" />
                        </View>
                        <View>
                            <Text style={styles.userName}>
                                {CONFIG.googleUser?.data?.user?.givenName || CONFIG.googleUser?.data?.user?.name || CONFIG.googleUser?.user?.name || "Player"}
                            </Text>
                            <Text style={styles.userScore}>{entryCoins || 0}</Text>
                        </View>
                    </View>

                    {/* Timer Display if needed in header, or just hidden for now as per design tweak */}
                    <View style={{ width: 40 }} />
                </View>

                {/* Main Content */}
                <View style={styles.gameArea}>

                    <View style={styles.cardContainer}>
                        {/* Stacked Cards Effect */}
                        <View style={styles.cardStack2} />
                        <View style={styles.cardStack1} />

                        {/* Active Question Card */}
                        <View style={styles.card}>
                            {/* Question Count */}
                            <Text style={styles.questionCounter}>
                                {currentQuestionIndex + 1}/{questions.length}
                            </Text>

                            {/* Help Icon */}
                            <TouchableOpacity style={styles.helpIcon}>
                                <FontAwesome name="question-circle" size={16} color="#94a3b8" />
                            </TouchableOpacity>

                            {/* Question Text */}
                            <Text style={styles.questionText}>
                                {currentQuestion.question_text}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Options Grid */}
                <View style={styles.optionsGrid}>
                    {options.map((opt) => {
                        const isSelected = selectedOption === opt.key;
                        return (
                            <TouchableOpacity
                                key={opt.key}
                                style={[styles.optionCard, isSelected && styles.optionSelected]}
                                onPress={() => setSelectedOption(opt.key)}
                                activeOpacity={0.9}
                            >
                                <View style={styles.optionLabelContainer}>
                                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelTextSelected]}>
                                        {opt.label}
                                    </Text>
                                </View>
                                <Text style={styles.optionText} numberOfLines={2}>
                                    {opt.text}
                                </Text>
                                {isSelected && (
                                    <View style={styles.checkIcon}>
                                        <FontAwesome name="check-circle" size={16} color="#fff" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Continue Button */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.continueButton, !selectedOption && { opacity: 0.7 }]}
                        onPress={handleContinue}
                        disabled={!selectedOption}
                    >
                        <LinearGradient
                            colors={['#f97316', '#ea580c']}
                            style={styles.btnGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }} // Vertical gradient look
                        >
                            <Text style={styles.btnText}>Continue</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Bottom Actions Row */}
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
        backgroundColor: '#172554', // Dark blue fallback
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10),
    },
    backButton: {
        padding: 8,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1e293b',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2, // Yellow ring
        borderColor: '#facc15'
    },
    userName: {
        color: '#fff',
        fontSize: scale(12),
        fontWeight: '600',
        fontStyle: 'italic',
        fontFamily: 'Montserrat-Regular',
    },
    userScore: {
        color: '#3ada1a', // Green score
        fontSize: scale(16),
        fontWeight: '900',
        fontFamily: 'Montserrat-Bold',
    },
    gameArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(20),
        marginTop: verticalScale(20),
        zIndex: 10,
    },
    cardContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: scale(20),
        padding: scale(24),
        alignItems: 'center',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        // Removed minHeight to be dynamic
    },
    cardStack1: {
        position: 'absolute',
        top: 6, // Offset from card top
        width: '94%', // Slightly narrower
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: scale(20),
        zIndex: -1,
        transform: [{ translateY: 6 }], // Visual shift
    },
    cardStack2: {
        position: 'absolute',
        top: 12,
        width: '88%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: scale(20),
        zIndex: -2,
        transform: [{ translateY: 12 }],
    },
    questionCounter: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#1e293b',
        alignSelf: 'flex-start',
        marginBottom: verticalScale(16),
    },
    helpIcon: {
        position: 'absolute',
        top: scale(24),
        right: scale(24),
    },
    questionText: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#0f172a',
        textAlign: 'center',
        lineHeight: scale(30),
        fontFamily: 'Montserrat-Bold',
        marginBottom: verticalScale(16),
        marginTop: verticalScale(10),
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        gap: scale(10), // Vertical gap
        marginTop: verticalScale(40), // More space from card
        marginBottom: verticalScale(20),
    },
    optionCard: {
        width: '48%', // 2 columns
        backgroundColor: '#fff',
        borderRadius: scale(16),
        paddingVertical: verticalScale(16),
        paddingHorizontal: scale(12),
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        gap: scale(10),
    },
    optionSelected: {
        backgroundColor: '#22c55e', // Green for selected
    },
    optionLabelContainer: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: '#f1f5f9', // Grey circle
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionLabel: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#64748b',
    },
    optionLabelTextSelected: {
        color: '#22c55e', // Text becomes green
    },
    optionText: {
        fontSize: scale(14),
        fontWeight: '600',
        color: '#334155',
        flex: 1,
        fontFamily: 'Montserrat-Regular',
    },
    checkIcon: {
        position: 'absolute',
        right: scale(8),
        top: scale(8),
    },
    footer: {
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(30),
        alignItems: 'center',
    },
    continueButton: {
        width: '70%',
        height: verticalScale(56),
        borderRadius: scale(28),
        overflow: 'hidden',
        marginBottom: verticalScale(24),
        elevation: 8,
        shadowColor: "#f97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
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
        backgroundColor: '#1e293b',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
    },
});

export default QuizzGamePlay;
