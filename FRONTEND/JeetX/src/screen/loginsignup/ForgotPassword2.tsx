import * as React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Dimensions, Image, KeyboardAvoidingView, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ForgotPassword2 = ({ navigation }: any) => {
    const [otp, setOtp] = React.useState('');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Header Section */}
            <View style={styles.headerContainer}>
                <LinearGradient
                    colors={['#0f172a', '#1e293b']}
                    style={styles.headerGradient}
                >
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <FontAwesome name="arrow-left" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Image source={require('../../assets/register2.svg')} style={styles.headerLogo} resizeMode="contain" />
                    </View>
                </LinearGradient>
            </View>

            {/* Bottom Sheet Section */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.bottomSheet}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.textsContainer}>
                        <Text style={styles.title}>Enter OTP</Text>
                        <Text style={styles.subtitle}>Please enter the verification code sent to your mobile/email</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.otpContainer}>
                            <View style={styles.otpBoxesContainer}>
                                {[...Array(6)].map((_, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.otpBox,
                                            otp.length === index && styles.otpBoxActive, // Highlight current box
                                            otp.length > index && styles.otpBoxFilled // Style for filled box
                                        ]}
                                    >
                                        <Text style={styles.otpText}>
                                            {otp[index] || ''}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            <TextInput
                                style={styles.otpInputHidden}
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="number-pad"
                                maxLength={6}
                                caretHidden={true}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPassword3')}
                            activeOpacity={0.8}
                            style={styles.buttonWrapper}
                        >
                            <LinearGradient
                                colors={['#ef4444', '#f97316']}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Verify OTP</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.loginContainer}>
                            <Text style={styles.text}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
        height: '40%',
        width: '100%',
    },
    headerGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        width: '100%',
        height: '100%',
        paddingTop: 40,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 24,
        zIndex: 10,
        padding: 8,
    },
    headerLogo: {
        width: 120,
        height: 120,
    },
    bottomSheet: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -30,
        overflow: 'hidden',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
    },
    textsContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
        fontFamily: 'Montserrat-Bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        lineHeight: 20,
    },
    formContainer: {
        width: '100%',
    },
    otpContainer: {
        marginBottom: 24,
        alignItems: 'center',
        position: 'relative',
    },
    otpBoxesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    otpBox: {
        width: 45,
        height: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpBoxActive: {
        borderColor: '#ef4444',
        backgroundColor: '#fff',
        borderWidth: 1.5,
    },
    otpBoxFilled: {
        borderColor: '#cbd5e1',
        backgroundColor: '#fff',
    },
    otpText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1e293b',
        fontFamily: 'Montserrat-Bold',
    },
    otpInputHidden: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
    },
    buttonWrapper: {
        width: '100%',
        marginBottom: 24,
        shadowColor: "#ef3c00",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    button: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'Montserrat-Bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#94a3b8',
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
    },
    loginText: {
        color: '#ef4444',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
        fontFamily: 'OpenSans-Bold',
    },
});

export default ForgotPassword2;
