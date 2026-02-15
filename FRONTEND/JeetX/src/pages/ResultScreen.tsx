import * as React from "react";
import { Image as RNImage, StyleSheet, View, Text, ImageBackground } from "react-native";

const Image = (props: any) => <View {...props} style={[{ backgroundColor: 'rgba(255,255,255,0.1)' }, props.style]} ><RNImage {...props} style={{ display: 'none' }} /></View>;
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const ResultScreen = () => {

    return (
        <SafeAreaView style={styles.resultScreen}>
            <View style={styles.view}>
                <Image style={[styles.image43Icon, styles.image43IconPosition]} resizeMode="cover" />
                <Image style={[styles.image43Icon2, styles.image43IconPosition]} resizeMode="cover" />
                <Image style={styles.sl05072142770151Icon} resizeMode="cover" />

                <ImageBackground style={styles.winnirParent} resizeMode="cover">
                    <Text style={[styles.winnir, styles.timeTypo]}>WINNIR</Text>
                    <Image style={styles.frameChild} resizeMode="cover" />
                </ImageBackground>
                <Text style={[styles.congratulationsHerjeet, styles.continueTypo]}>{`Congratulations Herjeet `}</Text>
                <Text style={[styles.correct, styles.correctTypo]}>Correct!!</Text>
                <Text style={[styles.youveNailedIt, styles.correctTypo]}>{`You’ve nailed it, few more for new league, Keep going! `}</Text>
                <Text style={styles.text}>10/10</Text>
                <View style={styles.child} />
                <Image style={[styles.item, styles.itemPosition]} resizeMode="cover" />
                <Image style={[styles.inner, styles.itemPosition]} resizeMode="cover" />
                <Image style={[styles.rectangleIcon, styles.itemPosition]} resizeMode="cover" />
                <Image style={styles.chatgptImageSep25202512} resizeMode="cover" />
                <View style={[styles.hoemX, styles.xLayout]}>
                    <View style={[styles.hoemXChild, styles.childLayout]} />
                    <View style={[styles.x, styles.xLayout]}>
                        <Image style={[styles.x, styles.xLayout]} resizeMode="cover" />
                        <View style={styles.xInner}>
                            <Image style={styles.instanceChild} resizeMode="cover" />
                        </View>
                    </View>
                </View>
                <View style={[styles.shareButton, styles.xLayout]}>
                    <View style={[styles.shareButtonChild, styles.childLayout]} />
                    <Image style={styles.shareUndefinedGlyphUnd} resizeMode="cover" />
                </View>
                <LinearGradient style={[styles.continueWrapper, styles.xLayout]} locations={[0, 1]} colors={['#ff8b26', '#ef3c00']} useAngle={true} angle={186.36}>
                    <Text style={[styles.continue, styles.continueTypo]}>Continue</Text>
                </LinearGradient>
            </View>
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    resultScreen: {
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    image43IconPosition: {
        width: 485,
        left: "50%",
        top: 0,
        position: "absolute",
        height: 880
    },
    leftSideLayout: {
        height: 21,
        width: 54,
        left: "50%",
        position: "absolute"
    },
    timeTypo: {
        color: "#fff",
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
        textAlign: "center",
        position: "absolute"
    },
    iconPosition1: {
        maxWidth: "100%",
        top: "50%",
        position: "absolute",
        overflow: "hidden"
    },
    iconPosition: {
        height: 12,
        top: 1,
        left: "50%",
        position: "absolute"
    },
    continueTypo: {
        fontWeight: "700",
        textAlign: "left",
        color: "#fff",
        left: "50%",
        position: "absolute"
    },
    correctTypo: {
        color: "#e3e7ee",
        fontFamily: "OpenSans-SemiBold",
        fontWeight: "600",
        left: "50%",
        position: "absolute"
    },
    itemPosition: {
        top: 541,
        position: "absolute"
    },
    xLayout: {
        height: 48,
        position: "absolute"
    },
    childLayout: {
        borderRadius: 41,
        height: 48,
        width: 48,
        left: 0,
        top: 0,
        position: "absolute"
    },
    view: {
        overflow: "hidden",
        height: 880,
        width: "100%",
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    image43Icon: {
        display: "none",
        marginLeft: -196.5
    },
    image43Icon2: {
        marginLeft: -255.5
    },
    sl05072142770151Icon: {
        top: 162,
        left: 18,
        borderRadius: 160,
        height: 224,
        width: 357,
        position: "absolute"
    },
    statusbar: {
        width: 393,
        height: 42,
        left: "50%",
        top: 0,
        marginLeft: -196.5,
        position: "absolute"
    },
    statusbar2: {
        height: "100%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        position: "absolute",
        overflow: "hidden",
        width: "100%"
    },
    notch: {
        width: 0,
        height: 0
    },
    leftSide: {
        marginLeft: -168.5,
        top: 14
    },
    statusbarTime: {
        marginLeft: -27,
        borderRadius: 24,
        top: 0
    },
    time: {
        letterSpacing: -0.32,
        lineHeight: 21,
        height: 20,
        textAlign: "center",
        fontSize: 16,
        left: 0,
        top: 1,
        color: "#fff",
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
        width: 54
    },
    rightSide: {
        marginLeft: 92.5,
        top: 19,
        width: 77,
        height: 13,
        left: "50%",
        position: "absolute"
    },
    statusbarBattery: {
        marginLeft: 11.3,
        width: 27,
        height: 13,
        left: "50%",
        top: 0,
        position: "absolute"
    },
    outlineIcon: {
        marginTop: -6.5,
        right: 2,
        borderRadius: 4,
        opacity: 0.35,
        height: 13,
        left: 0
    },
    batteryEndIcon: {
        marginTop: -1.5,
        right: 0,
        width: 1,
        height: 4,
        opacity: 0.4,
        top: "50%",
        position: "absolute"
    },
    fillIcon: {
        marginTop: -4.5,
        right: 10,
        left: 2,
        borderRadius: 2,
        height: 9
    },
    wifiIcon: {
        marginLeft: -12.7,
        width: 17
    },
    iconMobileSignal: {
        marginLeft: -38.7,
        width: 18
    },
    winnirParent: {
        marginLeft: -97.5,
        top: 176,
        width: 196,
        height: 222,
        left: "50%",
        position: "absolute",
        overflow: "hidden"
    },
    winnir: {
        top: 66,
        left: 34,
        fontSize: 34,
        letterSpacing: -0.68,
        lineHeight: 45,
        textShadowColor: "#cf8712",
        textShadowOffset: {
            width: 0,
            height: 1.1666667461395264
        },
        textShadowRadius: 1.2,
        textAlign: "center"
    },
    frameChild: {
        top: 118,
        left: 69,
        width: 51,
        height: 51,
        position: "absolute"
    },
    congratulationsHerjeet: {
        top: 400,
        fontSize: 26,
        lineHeight: 34,
        fontFamily: "OpenSans-Bold",
        textAlign: "left",
        marginLeft: -156.5
    },
    correct: {
        marginLeft: -28.5,
        top: 486,
        lineHeight: 20,
        textAlign: "left",
        fontSize: 16
    },
    youveNailedIt: {
        top: 589,
        fontSize: 14,
        lineHeight: 18,
        width: 313,
        marginLeft: -156.5,
        textAlign: "center"
    },
    text: {
        marginLeft: -50.5,
        top: 440,
        fontSize: 36,
        lineHeight: 44,
        fontWeight: "800",
        fontFamily: "OpenSans-ExtraBold",
        color: "#00ff11",
        textShadowColor: "#07530d",
        textShadowOffset: {
            width: 0,
            height: 1.43216073513031
        },
        textShadowRadius: 0,
        textAlign: "left",
        left: "50%",
        position: "absolute"
    },
    child: {
        top: 540,
        borderRadius: 9,
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderColor: "#0fb309",
        borderWidth: 0.6,
        width: 311,
        height: 18,
        left: 51,
        position: "absolute"
    },
    item: {
        width: 280,
        height: 17,
        left: 51
    },
    inner: {
        left: 317,
        filter: "blur(23.9px)",
        width: 16,
        height: 16
    },
    rectangleIcon: {
        left: 64,
        width: 261,
        height: 3
    },
    chatgptImageSep25202512: {
        top: 529,
        left: 28,
        width: 46,
        height: 49,
        position: "absolute"
    },
    hoemX: {
        left: 261,
        width: 48,
        height: 48,
        top: 800
    },
    hoemXChild: {
        backgroundColor: "#d9d9d9"
    },
    x: {
        width: 48,
        height: 48,
        left: 0,
        top: 0
    },
    xInner: {
        top: 10,
        left: 10,
        width: 28,
        height: 28,
        position: "absolute"
    },
    instanceChild: {
        top: 2,
        left: 1,
        elevation: 2,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: -1.8, height: -1.8 },
        shadowRadius: 1.27,
        shadowOpacity: 1,
        width: 26,
        height: 25,
        position: "absolute"
    },
    shareButton: {
        left: 321,
        width: 48,
        height: 48,
        top: 800
    },
    shareButtonChild: {
        backgroundColor: "#dddeed"
    },
    shareUndefinedGlyphUnd: {
        top: 12,
        left: 12,
        width: 24,
        height: 24,
        position: "absolute"
    },
    continueWrapper: {
        marginTop: 233,
        marginLeft: -178.5,
        elevation: 24,
        shadowColor: "rgba(0, 0, 0, 0.12)",
        shadowOffset: { width: 2, height: 11 },
        shadowRadius: 24,
        shadowOpacity: 1,
        borderRadius: 48,
        backgroundColor: "transparent",
        top: "50%",
        width: 357,
        left: "50%",
        overflow: "hidden"
    },
    continue: {
        marginTop: -12,
        marginLeft: -48.5,
        fontSize: 20,
        lineHeight: 24,
        fontFamily: "Montserrat-Bold",
        textAlign: "left",
        top: "50%"
    }
});

export default ResultScreen;
