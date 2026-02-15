import * as React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Dimensions, Image, Platform, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CONFIG } from "../../api/config";
import { sendFirebaseOtp } from '../../api/firebaseApi';

const ForgotPassword1 = ({ navigation }: any) => {
    const [identifier, setIdentifier] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const showToast = (message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Alert.alert('', message);
        }
    };

    const [confirm, setConfirm] = React.useState<any>(null);

    const handleSendOtp = async () => {
        if (!identifier) {
            showToast('Please enter your email or mobile number');
            return;
        }

        setLoading(true);

        // Check if identifier is email or mobile
        const isEmail = identifier.includes('@');

        if (!isEmail) {
            // Mobile Flow (Firebase)
            if (identifier.length !== 10) {
                showToast('Please enter a valid 10-digit mobile number');
                setLoading(false);
                return;
            }

            try {
                const phoneNumber = `+91${identifier}`;
                console.log('Sending OTP to:', phoneNumber);
                const confirmation = await sendFirebaseOtp(phoneNumber);
                setConfirm(confirmation);
                showToast('OTP Sent Successfully');

                navigation.navigate('ForgotPassword2', {
                    identifier: identifier,
                    isEmail: false,
                    confirmation: confirmation // Pass confirmation object to next screen
                });
            } catch (error: any) {
                console.error(error);
                if (error.code === 'auth/too-many-requests') {
                    showToast('Too many requests. Please try again later.');
                } else {
                    showToast(error.message || 'Failed to send OTP');
                }
            } finally {
                setLoading(false);
            }

        } else {
            // Email Flow (Backend)
            try {
                const endpoint = 'api/v1/auth/forgot-password/email';
                const body = { email: identifier };

                const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                const responseText = await response.text();
                console.log('ForgotPassword URL:', `${CONFIG.BASE_URL}${endpoint}`);
                console.log('ForgotPassword Raw:', responseText);

                let data;
                try { data = JSON.parse(responseText); } catch (e) { console.error(e); }

                if (data && data.success) {
                    showToast(data.message || 'OTP Sent Successfully');
                    navigation.navigate('ForgotPassword2', {
                        identifier: identifier,
                        isEmail: true
                    });
                } else {
                    showToast(data?.message || 'Failed to send OTP');
                }

            } catch (error) {
                console.error(error);
                showToast('Something went wrong');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Header Section (Simulating the image area) */}
            <View style={styles.headerContainer}>
                {/* Placeholder for the illustration - Using a gradient or dark bg for now */}
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
                        <Text style={styles.title}>Forgot Password</Text>
                        <Text style={styles.subtitle}>Enter your email or mobile number to receive an OTP</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email ID / Mobile Number"
                                placeholderTextColor="#94a3b8"
                                value={identifier}
                                onChangeText={setIdentifier}
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleSendOtp}
                            activeOpacity={0.8}
                            style={styles.buttonWrapper}
                            disabled={loading}
                        >
                            <LinearGradient
                                colors={['#ef4444', '#f97316']}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                style={styles.button}
                            >
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send OTP</Text>}
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
        backgroundColor: '#0f172a', // Match header bg
    },
    headerContainer: {
        height: '40%', // Takes up top portion
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
        marginTop: -30, // Overlap slightly if needed, or just sit flush. 
        // Logic: if we want it to look like a sheet over the header.
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
    inputContainer: {
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        color: '#1e293b',
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        fontFamily: 'OpenSans-Regular',
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

export default ForgotPassword1;
