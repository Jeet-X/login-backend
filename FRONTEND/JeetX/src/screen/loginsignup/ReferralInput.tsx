import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, Alert, ToastAndroid, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RegisterSvg from '../../assets/register2.svg';
import JeetXSmall from '../../assets/Jeetxsmall.svg';
import { scale, verticalScale, moderateScale, hp } from '../../utils/responsive';
import { CONFIG } from '../../api/config';

const ReferralInput = ({ navigation }: any) => {
    const [referralCode, setReferralCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const hideSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const showToast = (message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Alert.alert('', message);
        }
    };

    const validateReferralCode = async () => {
        if (!referralCode.trim()) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${CONFIG.BASE_URL}api/v1/referral/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    referral_code: referralCode.trim()
                })
            });

            const data = await response.json();

            if (data.success) {
                // Pass back success and code
                navigation.navigate('Register', {
                    validatedCode: referralCode.trim(),
                    isValid: true
                });
            } else {
                showToast(data.message || 'Invalid Referral Code');
            }
        } catch (error) {
            console.error('Referral Validation Error:', error);
            showToast('Failed to validate referral code');
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header Illustration Container - Dynamically sized */}
                <View style={[styles.headerContainer, { height: isKeyboardVisible ? hp(15) : hp(50) }]}>
                    <RegisterSvg
                        style={styles.headerImage}
                    />
                </View>

                {/* Overlapping Bottom Card */}
                <View style={styles.card}>
                    <View style={styles.cardBody}>
                        <View style={styles.logoContainer}>
                            <JeetXSmall width={scale(70)} height={scale(70)} />
                        </View>

                        <Text style={styles.title}>Refer & Earn</Text>
                        <Text style={styles.subtitle}>
                            You can receive referral codes from friends who play JEETX
                        </Text>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Enter code"
                                placeholderTextColor="#94a3b8"
                                style={styles.input}
                                value={referralCode}
                                onChangeText={(text) => setReferralCode(text.toUpperCase())}
                                autoCapitalize="characters"
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.btnPrimary}
                            onPress={validateReferralCode}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#ef4444', '#f97316']}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                style={styles.gradientBtn}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" size="small" />
                                ) : (
                                    <Text style={styles.btnText}>SUBMIT</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnSecondary}
                            onPress={handleSkip}
                        >
                            <Text style={styles.secondaryBtnText}>SKIP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    headerContainer: {
        height: hp(50),
        width: '100%',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: scale(30),
        borderTopRightRadius: scale(30),
        marginTop: verticalScale(-30),
        paddingBottom: verticalScale(40),
    },
    cardBody: {
        padding: scale(24),
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: verticalScale(10),
        marginBottom: verticalScale(15),
    },
    title: {
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: verticalScale(8),
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: moderateScale(14),
        color: '#64748b',
        textAlign: 'center',
        marginBottom: verticalScale(30),
        fontFamily: 'OpenSans-Regular',
        lineHeight: 20,
        paddingHorizontal: scale(10),
    },
    inputWrapper: {
        width: '100%',
        marginBottom: verticalScale(30),
    },
    input: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: scale(12),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(15),
        fontSize: moderateScale(18),
        color: '#1e293b',
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    btnPrimary: {
        width: '100%',
        marginBottom: verticalScale(20),
        shadowColor: "#f97316",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    },
    gradientBtn: {
        paddingVertical: verticalScale(16),
        borderRadius: scale(35),
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#ffffff',
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    btnSecondary: {
        // padding: scale(10),
        // marginTop: verticalScale(5),
    },
    secondaryBtnText: {
        fontSize: moderateScale(12),
        color: '#94a3b8',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});

export default ReferralInput;
