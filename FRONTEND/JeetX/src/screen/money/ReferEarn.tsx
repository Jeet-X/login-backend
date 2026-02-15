import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, Dimensions, Platform, Share, Alert, ToastAndroid, ActivityIndicator, Clipboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { CONFIG, getAccessToken } from '../../api/config';
import { scale, verticalScale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

const ReferEarn = ({ navigation }: any) => {

    const [loading, setLoading] = useState(false);
    const [referralData, setReferralData] = useState<any>({
        referral_code: '...',
        reward_per_referral: 0,
        total_referrals: 0,
        total_earned_coins: 0,
        terms_url: ''
    });

    useEffect(() => {
        fetchReferralData();
    }, []);

    const fetchReferralData = async () => {
        setLoading(true);
        try {
            const token = getAccessToken();
            if (!token) {
                console.log('No access token found');
                return;
            }

            console.log('Fetching Referral Data...', `${CONFIG.BASE_URL}api/v1/referral/summary`);
            const response = await fetch(`${CONFIG.BASE_URL}api/v1/referral/summary`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const responseText = await response.text();
            console.log('Referral Response:', responseText);

            let data;
            try { data = JSON.parse(responseText); } catch (e) { console.error(e); }

            if (data && data.success && data.data) {
                setReferralData(data.data);
            }
        } catch (error) {
            console.error('Fetch Referral Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (referralData.referral_code === '...') return;

        try {
            Clipboard.setString(referralData.referral_code);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Referral Code Copied!', ToastAndroid.SHORT);
            } else {
                Alert.alert('Copied', 'Referral Code Copied to Clipboard');
            }
        } catch (e) {
            console.error('Clipboard Error:', e);
            Alert.alert('Error', 'Clipboard not available');
        }
    };

    const shareReferral = async () => {
        try {
            const message = `Use my referral code ${referralData.referral_code} to sign up and earn ₹${referralData.reward_per_referral}! Download the app now.`;
            await Share.share({
                message: message,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#02121a" />

            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={20} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Referral</Text>
                    <View style={{ width: 20 }} />{/* Spacer to balance title */}
                </View>
            </SafeAreaView>

            <View style={styles.scrollContent}>
                <View style={styles.bannerContainer}>
                    <Image
                        source={require('../../assets/ref.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="contain"
                    />
                </View>

                {/* Referral Code Section */}
                <View style={styles.codeSection}>
                    <Text style={styles.labelSimple}>Your Referral Code</Text>
                    <View style={styles.codeBox}>
                        <Text style={styles.codeText}>{referralData.referral_code}</Text>
                        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                            <Text style={styles.copyButtonText}>COPY</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Share Via Section */}
                <View style={styles.shareSection}>
                    <Text style={styles.labelSimple}>Share via:</Text>
                    <View style={styles.socialRow}>
                        {/* Instagram */}
                        <TouchableOpacity style={styles.socialIconBtn} onPress={shareReferral}>
                            <LinearGradient colors={['#833ab4', '#fd1d1d', '#fcb045']} style={styles.socialGradient}>
                                <FontAwesome name="instagram" size={24} color="#ffffff" />
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* WhatsApp */}
                        <TouchableOpacity style={styles.socialIconBtn} onPress={shareReferral}>
                            <View style={[styles.socialCircle, { backgroundColor: '#25D366' }]}>
                                <FontAwesome name="whatsapp" size={24} color="#ffffff" />
                            </View>
                        </TouchableOpacity>

                        {/* Facebook */}
                        <TouchableOpacity style={styles.socialIconBtn} onPress={shareReferral}>
                            <View style={[styles.socialCircle, { backgroundColor: '#1877F2' }]}>
                                <FontAwesome name="facebook" size={24} color="#ffffff" />
                            </View>
                        </TouchableOpacity>

                        {/* More/Dots */}
                        <TouchableOpacity style={styles.socialIconBtn} onPress={shareReferral}>
                            <View style={[styles.socialCircle, { backgroundColor: '#e2e8f0' }]}>
                                <FontAwesome name="ellipsis-h" size={20} color="#64748b" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Invite Button */}
                <TouchableOpacity activeOpacity={0.8} style={styles.inviteBtnContainer} onPress={shareReferral}>
                    <LinearGradient
                        colors={['#ff6b00', '#ff3d00']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={styles.inviteBtn}
                    >
                        <Text style={styles.inviteBtnText}>INVITE NOW</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statHeader}>Referral Stats</Text>
                        <Text style={styles.statSubText}>{referralData.total_referrals} Referrals</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statHeader}>₹{referralData.total_earned_coins}</Text>
                        <Text style={styles.statSubText}>Earned</Text>
                    </View>
                </View>

                {/* Footer */}
                <TouchableOpacity style={styles.footerLink}>
                    <Text style={styles.termsText}>Terms & Conditions Applied</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerSafeArea: {
        backgroundColor: '#0f172a',
    },
    header: {
        height: verticalScale(56),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        backgroundColor: '#0f172a',
    },
    backButton: {
        padding: scale(8),
        marginLeft: scale(-8),
    },
    headerTitle: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Montserrat-Bold',
    },
    scrollContent: {
        flex: 1,
        paddingBottom: verticalScale(20),
    },
    bannerContainer: {
        width: '100%',
        height: verticalScale(130),
        backgroundColor: '#0f172a',
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(10),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    bannerArt: {
        flex: 1,
        borderRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#334155',
        overflow: 'hidden',
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: scale(10),
    },
    tagWrapper: {
        transform: [{ rotate: '-5deg' }],
    },
    tagYellow: {
        backgroundColor: '#fbbf24',
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(16),
        borderRadius: scale(8),
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 3,
    },
    tagYellowText: {
        color: '#92400e',
        fontWeight: '800',
        fontSize: scale(15),
        fontFamily: 'Montserrat-ExtraBoldItalic',
    },
    tagYellowTextBold: {
        color: '#ffffff', // White
        fontWeight: '900',
        fontSize: scale(15),
        fontFamily: 'Montserrat-BlackItalic',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    tagRed: {
        backgroundColor: '#ec4899', // Pinkish
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(16),
        borderRadius: scale(12),
        transform: [{ rotate: '5deg' }],
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 3,
    },
    tagRedText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: scale(22),
        fontFamily: 'Roboto-BlackItalic',
    },
    codeSection: {
        alignItems: 'center',
        marginHorizontal: scale(20),
        marginTop: verticalScale(20),
        marginBottom: verticalScale(20),
    },
    labelSimple: {
        fontSize: scale(16),
        color: '#475569',
        marginBottom: verticalScale(16),
        fontFamily: 'OpenSans-SemiBold',
        textAlign: 'center',
    },
    codeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: scale(12),
        width: '100%',
        height: verticalScale(56),
        paddingLeft: scale(20),
        backgroundColor: '#ffffff',
        overflow: 'hidden',
    },
    codeText: {
        flex: 1,
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#1e293b',
        fontFamily: 'Roboto-Bold',
        letterSpacing: 1,
    },
    copyButton: {
        backgroundColor: '#fff7ed', // Light Orange
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: scale(24),
        borderLeftWidth: 1,
        borderLeftColor: '#ffedd5',
    },
    copyButtonText: {
        color: '#ea580c', // Dark Orange
        fontWeight: 'bold',
        fontSize: scale(14),
        fontFamily: 'Montserrat-Bold',
    },
    shareSection: {
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    socialRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(4),
    },
    socialIconBtn: {
        marginHorizontal: scale(12),
    },
    socialImg: {
        width: scale(48), height: scale(48), display: 'none'
    },
    socialGradient: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialCircle: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    inviteBtnContainer: {
        marginHorizontal: scale(30),
        marginBottom: verticalScale(20),
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: verticalScale(6) },
        shadowOpacity: 0.3,
        shadowRadius: scale(12),
        elevation: 8,
    },
    inviteBtn: {
        paddingVertical: verticalScale(16),
        borderRadius: scale(30),
        alignItems: 'center',
    },
    inviteBtnText: {
        color: '#ffffff',
        fontSize: scale(18),
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: scale(40),
        marginBottom: verticalScale(20),
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statHeader: {
        fontSize: scale(18),
        color: '#1e293b', // Dark
        fontWeight: 'bold',
        marginBottom: verticalScale(4),
        fontFamily: 'Montserrat-Bold',
    },
    statSubText: {
        fontSize: scale(14),
        color: '#64748b',
        fontFamily: 'OpenSans-Regular',
    },
    statDivider: {
        width: 1,
        height: verticalScale(40),
        backgroundColor: '#cbd5e1',
        marginHorizontal: scale(20)
    },
    footerLink: {
        alignItems: 'center',
        marginBottom: verticalScale(10),
    },
    termsText: {
        fontSize: scale(13),
        color: '#3b82f6',
        fontFamily: 'OpenSans-SemiBold',
    },
});

export default ReferEarn;
