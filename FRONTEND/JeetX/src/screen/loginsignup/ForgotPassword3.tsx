import * as React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Dimensions, Image, Platform, KeyboardAvoidingView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ForgotPassword3 = ({ navigation }: any) => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [secureConfirmTextEntry, setSecureConfirmTextEntry] = React.useState(true);

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
                        <Text style={styles.title}>Create a Password</Text>
                        <Text style={styles.subtitle}>Your new password must be different from previous used passwords.</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.passwordInputWrapper}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="New Password"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry={secureTextEntry}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                                    <FontAwesome name={secureTextEntry ? "eye-slash" : "eye"} size={20} color="#94a3b8" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.passwordInputWrapper}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry={secureConfirmTextEntry}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => setSecureConfirmTextEntry(!secureConfirmTextEntry)}>
                                    <FontAwesome name={secureConfirmTextEntry ? "eye-slash" : "eye"} size={20} color="#94a3b8" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            activeOpacity={0.8}
                            style={styles.buttonWrapper}
                        >
                            <LinearGradient
                                colors={['#ef4444', '#f97316']}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Confirm</Text>
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
    inputContainer: {
        marginBottom: 20,
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 16,
        color: '#1e293b',
        fontSize: 15,
        fontFamily: 'OpenSans-Regular',
    },
    buttonWrapper: {
        width: '100%',
        marginBottom: 24,
        marginTop: 20,
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

export default ForgotPassword3;
