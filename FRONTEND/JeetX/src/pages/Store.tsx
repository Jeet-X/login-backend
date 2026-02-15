import * as React from "react";
import { StyleSheet, View, Text, Image as RNImage, ScrollView } from "react-native";
import { scale, verticalScale, moderateScale, hp, wp } from '../utils/responsive';

const Image = (props: any) => <View {...props} style={[{ backgroundColor: 'rgba(255,255,255,0.1)' }, props.style]} ><RNImage {...props} style={{ display: 'none' }} /></View>;
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const Store = () => {

    return (
        <SafeAreaView style={styles.store}>
            <View style={styles.view}>

                <View style={[styles.mainBody, styles.mainBodyLayout]}>
                    <View style={styles.categories} />
                    <Image style={styles.chevronDownUndefinedGly} resizeMode="cover" />
                    <View style={styles.mathQuizParent}>
                        <View style={[styles.mathQuiz, styles.mathLayout3]}>
                            <View style={[styles.mathQuizChild, styles.mathLayout3]} />
                            <Text style={[styles.mathsQuiz, styles.mathsQuizTypo]}>Maths Quiz</Text>
                            <Text style={styles.exploreMore}>{`Explore more >`}</Text>
                            <Text style={[styles.challengeYourReasoning, styles.challengePosition]}>Challenge your reasoning and quick thinking wi..</Text>
                            <View style={[styles.mathQuizInner, styles.chatgptLayout]}>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.frameChildPosition2]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptLayout]} />
                                    <Image style={styles.chatgptPosition} resizeMode="cover" />
                                </View>
                            </View>
                            <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                            <Image style={[styles.arrowUpRightUndefinedG, styles.undefinedPosition1]} resizeMode="cover" />
                            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                <View style={[styles.frameChild, styles.frameChildLayout]} />
                                <View style={styles.frameChildPosition1} />
                                <View style={styles.frameChildPosition} />
                                <Text style={[styles.getIn, styles.textTypo]}>Get IN</Text>
                            </View>
                        </View>
                        <View style={[styles.mathQuiz2, styles.mathLayout3]}>
                            <View style={[styles.mathQuizChild, styles.mathLayout3]} />
                            <Text style={[styles.mindBender, styles.mathsQuizTypo]}>Mind Bender</Text>
                            <Text style={styles.exploreMore}>{`Explore more >`}</Text>
                            <Text style={[styles.challengeYourReasoning, styles.challengePosition]}>Challenge your reasoning and quick thinking w..</Text>
                            <View style={[styles.mathQuizInner, styles.chatgptLayout]}>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.frameChildPosition2]}>
                                    <View style={[styles.chatgptImageJul132025032, styles.chatgptLayout]} />
                                    <Image style={styles.ellipseIcon} resizeMode="cover" />
                                    <Image style={[styles.chatgptImageOct132025112, styles.chatgptPosition]} resizeMode="cover" />
                                </View>
                            </View>
                            <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                            <Image style={[styles.arrowUpRightUndefinedG, styles.undefinedPosition1]} resizeMode="cover" />
                            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                <View style={[styles.frameChild, styles.frameChildLayout]} />
                                <View style={styles.frameChildPosition1} />
                                <View style={styles.frameChildPosition} />
                                <Text style={[styles.getIn, styles.textTypo]}>Get IN</Text>
                            </View>
                            <Image style={styles.chatgptImageOct132025113} resizeMode="cover" />
                        </View>
                        <View style={[styles.mathQuiz3, styles.mathLayout2]}>
                            <View style={[styles.mathQuizChild, styles.mathLayout3]} />
                            <Text style={[styles.grandmasterMode, styles.mathsQuizTypo]}>Grandmaster Mode</Text>
                            <Text style={styles.exploreMore}>{`Explore more >`}</Text>
                            <Text style={styles.classicStrategicFace}>Classic Strategic Face offs and quick thinking w...</Text>
                            <View style={[styles.mathQuizInner, styles.chatgptLayout]}>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.frameChildPosition2]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptLayout]} />
                                    <Image style={styles.chatgptImageOct132025114} resizeMode="cover" />
                                </View>
                            </View>
                            <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                            <Image style={[styles.arrowUpRightUndefinedG, styles.undefinedPosition1]} resizeMode="cover" />
                            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                <View style={[styles.frameChild, styles.frameChildLayout]} />
                                <View style={styles.frameChildPosition1} />
                                <View style={styles.frameChildPosition} />
                                <Text style={[styles.getIn, styles.textTypo]}>Get IN</Text>
                            </View>
                        </View>
                        <View style={[styles.mathQuiz4, styles.mathLayout2]}>
                            <View style={[styles.mathQuizChild, styles.mathLayout3]} />
                            <Text style={[styles.ludoRoyale, styles.mathsQuizTypo]}>Ludo Royale</Text>
                            <Text style={styles.exploreMore}>{`Explore more >`}</Text>
                            <Text style={styles.classicStrategicFace}>Role and Race to the victory with our Ludo Royale.</Text>
                            <Image style={[styles.mathQuizInner, styles.chatgptLayout]} resizeMode="cover" />
                            <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                            <Image style={[styles.arrowUpRightUndefinedG, styles.undefinedPosition1]} resizeMode="cover" />
                            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                <View style={[styles.frameChild, styles.frameChildLayout]} />
                                <View style={styles.frameChildPosition1} />
                                <View style={styles.frameChildPosition} />
                                <Text style={[styles.getIn, styles.textTypo]}>Get IN</Text>
                            </View>
                            <Image style={[styles.chatgptImageOct132025115, styles.instanceChildPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.mathQuiz5, styles.mathLayout1]}>
                            <View style={[styles.mathQuizChild, styles.mathLayout3]} />
                            <Text style={[styles.strategies, styles.mathsQuizTypo]}>Strategies</Text>
                            <Text style={styles.exploreMore}>{`Explore more >`}</Text>
                            <Text style={[styles.challengeYourReasoning, styles.challengePosition]}>Challenge your reasoning and quick thinking w...</Text>
                            <Image style={[styles.mathQuizInner, styles.chatgptLayout]} resizeMode="cover" />
                            <Image style={styles.chatgptImageOct132025116} resizeMode="cover" />
                            <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                            <Image style={[styles.arrowUpRightUndefinedG, styles.undefinedPosition1]} resizeMode="cover" />
                            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                <View style={[styles.frameChild, styles.frameChildLayout]} />
                                <View style={styles.frameChildPosition1} />
                                <View style={styles.frameChildPosition} />
                                <Text style={[styles.getIn, styles.textTypo]}>Get IN</Text>
                            </View>
                        </View>
                        <View style={[styles.mathQuiz6, styles.mathLayout1]}>
                            <View style={[styles.mathQuizChild, styles.mathLayout3]} />
                            <Text style={[styles.cardsTrap, styles.mathsQuizTypo]}>Cards Trap</Text>
                            <Text style={styles.exploreMore}>{`Explore more >`}</Text>
                            <Text style={[styles.challengeYourReasoning, styles.challengePosition]}>Challenge your reasoning and quick thinking w...</Text>
                            <View style={[styles.mathQuizInner, styles.chatgptLayout]}>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.frameChildPosition2]}>
                                    <View style={[styles.chatgptImageJul132025032, styles.chatgptLayout]} />
                                    <Image style={styles.ellipseIcon} resizeMode="cover" />
                                    <Image style={[styles.chatgptImageOct132025112, styles.chatgptPosition]} resizeMode="cover" />
                                    <Image style={styles.chatgptImageOct132025118} resizeMode="cover" />
                                </View>
                            </View>
                            <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                            <Image style={[styles.arrowUpRightUndefinedG, styles.undefinedPosition1]} resizeMode="cover" />
                            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                <View style={[styles.frameChild, styles.frameChildLayout]} />
                                <View style={styles.frameChildPosition1} />
                                <View style={styles.frameChildPosition} />
                                <Text style={[styles.getIn, styles.textTypo]}>Get IN</Text>
                            </View>
                        </View>
                        <View style={[styles.mathQuiz7, styles.mathLayout]}>
                            <View style={[styles.mathQuizChild, styles.mathLayout3]} />
                            <Text style={[styles.mathsQuiz2, styles.mathsQuiz2Typo]}>Maths Quiz</Text>
                            <Text style={styles.exploreMore}>{`Explore more >`}</Text>
                            <Text style={[styles.challengeYourReasoning5, styles.challengePosition]}>Challenge your reasoning and quick thinking with our math quiz questions.</Text>
                            <View style={[styles.mathQuizInner, styles.chatgptLayout]}>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.frameChildPosition2]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptLayout]} />
                                    <Image style={styles.chatgptPosition} resizeMode="cover" />
                                </View>
                            </View>
                            <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                            <Image style={[styles.arrowUpRightUndefinedG, styles.undefinedPosition1]} resizeMode="cover" />
                            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                <View style={[styles.frameChild, styles.frameChildLayout]} />
                                <View style={styles.frameChildPosition1} />
                                <View style={styles.frameChildPosition} />
                                <Text style={[styles.getIn, styles.textTypo]}>Get IN</Text>
                            </View>
                        </View>
                        <View style={[styles.mathQuiz8, styles.mathLayout]}>
                            <View style={[styles.mathQuizChild, styles.mathLayout3]} />
                            <Text style={[styles.mindBender2, styles.mathsQuiz2Typo]}>Mind Bender</Text>
                            <Text style={styles.exploreMore}>{`Explore more >`}</Text>
                            <Text style={[styles.challengeYourReasoning5, styles.challengePosition]}>Challenge your reasoning and quick thinking with our math quiz questions.</Text>
                            <View style={[styles.mathQuizInner, styles.chatgptLayout]}>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.frameChildPosition2]}>
                                    <View style={[styles.chatgptImageJul132025032, styles.chatgptLayout]} />
                                    <Image style={styles.ellipseIcon} resizeMode="cover" />
                                    <Image style={[styles.chatgptImageOct132025112, styles.chatgptPosition]} resizeMode="cover" />
                                </View>
                            </View>
                            <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                            <Image style={[styles.arrowUpRightUndefinedG, styles.undefinedPosition1]} resizeMode="cover" />
                            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                <View style={[styles.frameChild, styles.frameChildLayout]} />
                                <View style={styles.frameChildPosition1} />
                                <View style={styles.frameChildPosition} />
                                <Text style={[styles.getIn, styles.textTypo]}>Get IN</Text>
                            </View>
                        </View>
                    </View>
                    <Image style={styles.chatgptImageOct1320251111} resizeMode="cover" />
                    <View style={[styles.bottomNav, styles.bottomNavLayout]}>
                        <Image style={[styles.unionIcon, styles.bottomNavLayout]} resizeMode="cover" />
                        <View style={[styles.leaderboard, styles.eventsLayout]}>
                            <Text style={[styles.leaderboard2, styles.events2Typo]}>Leaderboard</Text>
                            <Image style={styles.leaderboardChild} resizeMode="cover" />
                        </View>
                        <View style={[styles.events, styles.eventsLayout]}>
                            <Text style={[styles.events2, styles.events2Typo]}>Events</Text>
                            <Image style={styles.vectorIcon} resizeMode="cover" />
                        </View>
                        <View style={[styles.profile, styles.eventsLayout]}>
                            <Text style={styles.profile2}>Profile</Text>
                            <Image style={[styles.vectorIcon2, styles.vectorIconPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.referals, styles.eventsLayout]}>
                            <Text style={[styles.referrals, styles.events2Typo]}>Referrals</Text>
                            <Image style={[styles.vectorIcon3, styles.vectorIconPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.x, styles.xLayout]}>
                            <Image style={[styles.xChild, styles.xLayout]} resizeMode="cover" />
                            <View style={styles.xInner}>
                                <Image style={[styles.instanceChild, styles.instanceChildPosition]} resizeMode="cover" />
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.powerUpYour, styles.store2Typo]}>Power Up Your Play!</Text>
                    <Text style={styles.bundlesBoostsAnd}>Bundles, boosts, and challenges — all in one place.</Text>
                </View>
                <LinearGradient style={[styles.bg, styles.bgLayout]} locations={[0, 1]} colors={['#02121a', '#0d3648']} useAngle={true} angle={-90}>
                    <ScrollView style={styles.bgLayout} horizontal={true}>
                        <Image style={[styles.bgChild, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgItem, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgInner, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild2, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild3, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild4, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild5, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild6, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild7, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild8, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild9, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild10, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild11, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild12, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild13, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild14, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild15, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild16, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild17, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild18, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgChild19, styles.childLayout]} resizeMode="cover" />
                        <Text style={[styles.store2, styles.undefinedPosition]}>Store</Text>
                        <Image style={[styles.arrowUpUndefinedGlyph, styles.undefinedPosition]} resizeMode="cover" />
                        <View style={[styles.walletUndefinedGlyphUnParent, styles.undefinedPosition]}>
                            <Image style={[styles.walletUndefinedGlyphUn, styles.undefinedLayout]} resizeMode="cover" />
                            <Text style={[styles.text, styles.textTypo]}>₹1,999</Text>
                        </View>
                        <View style={styles.rectangleParent6}>
                            <View style={[styles.groupChild, styles.groupLayout]} />
                            <View style={[styles.groupItem, styles.groupLayout]} />
                            <View style={[styles.groupInner, styles.groupLayout]} />
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    store: {
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    mainBodyLayout: {
        width: wp(100),
        position: "absolute"
    },
    leftSideLayout: {
        height: 21,
        width: 54,
        left: "50%",
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
    mathLayout3: {
        width: 174,
        borderWidth: 1,
        top: -1,
        borderStyle: "solid",
        position: "absolute"
    },
    mathsQuizTypo: {
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        position: "absolute"
    },
    challengePosition: {
        width: scale(152),
        color: "#646c6d",
        fontFamily: "OpenSans-Regular",
        left: scale(10),
        top: verticalScale(108),
        textAlign: "center",
        position: "absolute"
    },
    chatgptLayout: {
        height: 78,
        width: 172,
        position: "absolute"
    },
    frameChildPosition2: {
        borderRadius: 6,
        left: 0,
        top: 0
    },
    undefinedLayout: {
        width: 24,
        height: 24
    },
    undefinedPosition1: {
        right: -175,
        position: "absolute"
    },
    frameChildLayout: {
        width: 84,
        position: "absolute"
    },
    textTypo: {
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        lineHeight: verticalScale(12),
        fontSize: moderateScale(12),
        textAlign: "left",
        color: "#fff",
        position: "absolute"
    },
    chatgptPosition: {
        height: 138,
        width: 181,
        left: -5,
        top: -31,
        position: "absolute"
    },
    mathLayout2: {
        top: 189,
        width: 174,
        borderWidth: 1,
        borderColor: "#eaeaea",
        borderRadius: 12,
        elevation: 4,
        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
        borderStyle: "solid",
        height: "100%",
        position: "absolute",
        overflow: "hidden"
    },
    instanceChildPosition: {
        top: 3,
        position: "absolute"
    },
    mathLayout1: {
        top: 379,
        width: 174,
        borderWidth: 1,
        borderColor: "#eaeaea",
        borderRadius: 12,
        elevation: 4,
        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
        borderStyle: "solid",
        height: "100%",
        position: "absolute",
        overflow: "hidden"
    },
    mathLayout: {
        top: 569,
        width: 174,
        borderWidth: 1,
        borderColor: "#eaeaea",
        borderRadius: 12,
        elevation: 4,
        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
        borderStyle: "solid",
        height: "100%",
        position: "absolute",
        overflow: "hidden"
    },
    mathsQuiz2Typo: {
        fontSize: 15,
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        lineHeight: 20,
        top: 86,
        fontWeight: "600",
        left: "50%",
        position: "absolute"
    },
    bottomNavLayout: {
        height: verticalScale(68),
        bottom: 0,
        width: wp(100),
        position: "absolute"
    },
    eventsLayout: {
        width: 76,
        height: 68,
        backgroundColor: "#fff",
        position: "absolute",
        overflow: "hidden"
    },
    events2Typo: {
        color: "#8d9f9f",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        top: 44,
        textAlign: "center",
        fontWeight: "600",
        position: "absolute"
    },
    vectorIconPosition: {
        bottom: "44.12%",
        top: "23.53%",
        height: "32.35%",
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden"
    },
    xLayout: {
        height: 67,
        width: 67,
        position: "absolute"
    },
    store2Typo: {
        lineHeight: 24,
        fontSize: 20,
        textAlign: "left"
    },
    bgLayout: {
        backgroundColor: "transparent",
        maxWidth: wp(100),
        flexGrow: 0,
        width: "100%",
        flex: 1
    },
    childLayout: {
        height: verticalScale(58),
        width: scale(28),
        top: verticalScale(1),
        position: "absolute"
    },
    undefinedPosition: {
        top: 13,
        position: "absolute"
    },
    groupLayout: {
        height: 3,
        borderRadius: 3,
        width: 29,
        backgroundColor: "#fff",
        left: 0,
        position: "absolute"
    },
    view: {
        height: verticalScale(830),
        overflow: "hidden",
        width: "100%",
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    statusbar: {
        backgroundColor: "#010e0f",
        height: verticalScale(42),
        left: "50%",
        top: 0,
        marginLeft: -wp(50)
    },
    statusbar2: {
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        height: "100%",
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
        fontFamily: "Inter-SemiBold",
        height: 20,
        textAlign: "center",
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        left: 0,
        top: 1,
        width: 54,
        position: "absolute"
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
        borderRadius: 2,
        height: 9,
        left: 2
    },
    wifiIcon: {
        marginLeft: -12.7,
        width: 17
    },
    iconMobileSignal: {
        marginLeft: -38.7,
        width: 18
    },
    mainBody: {
        top: 91,
        height: 739,
        left: 0
    },
    categories: {
        top: -verticalScale(26),
        elevation: 2,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 2,
        shadowOpacity: 1,
        borderColor: "#ebebeb",
        borderBottomWidth: 1,
        height: verticalScale(44),
        display: "none",
        borderStyle: "solid",
        backgroundColor: "#fff",
        width: wp(100),
        left: "50%",
        marginLeft: -wp(50),
        position: "absolute",
        overflow: "hidden"
    },
    chevronDownUndefinedGly: {
        top: 295,
        left: 171,
        borderRadius: 22,
        width: 22,
        height: 22,
        display: "none",
        position: "absolute"
    },
    mathQuizParent: {
        top: verticalScale(70),
        width: wp(90),
        height: verticalScale(750),
        left: wp(5),
        position: "absolute"
    },
    mathQuiz: {
        borderColor: "#eaeaea",
        borderRadius: 12,
        elevation: 4,

        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
        borderWidth: 1,
        top: -1,
        height: "100%",
        overflow: "hidden",
        left: -1
    },
    mathQuizChild: {
        borderRadius: 10,
        borderColor: "rgba(217, 217, 217, 0.6)",
        height: 182,
        left: -1,
        borderWidth: 1,
        top: -1,
        backgroundColor: "#fff"
    },
    mathsQuiz: {
        textAlign: "left",
        lineHeight: verticalScale(20),
        top: verticalScale(86),
        fontFamily: "Roboto-Bold",
        fontSize: moderateScale(16),
        left: "50%",
        marginLeft: -scale(39)
    },
    exploreMore: {
        marginLeft: -41,
        top: 155,
        color: "#008d9d",
        lineHeight: 16,
        fontSize: 12,
        textAlign: "left",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        left: "50%",
        position: "absolute"
    },
    challengeYourReasoning: {
        lineHeight: 14,
        width: 152,
        fontSize: 12
    },
    mathQuizInner: {
        left: 0,
        top: 0
    },
    chatgptImageJul13202503Parent: {
        height: 78,
        width: 172,
        position: "absolute",
        overflow: "hidden"
    },
    chatgptImageJul13202503: {
        backgroundColor: "rgba(174, 189, 189, 0.2)",
        borderRadius: 8,
        left: 0,
        top: 0
    },
    questionCircleUndefined: {
        top: 8,
        height: 24,
        right: -175,
        position: "absolute"
    },
    arrowUpRightUndefinedG: {
        top: 52,
        borderRadius: 18,
        width: 32,
        height: 32,
        display: "none"
    },
    rectangleParent: {
        top: 46,
        height: 34,
        left: 265,
        borderRadius: 8,
        display: "none",
        overflow: "hidden"
    },
    frameChild: {
        elevation: 2,
        shadowColor: "#0e4f56",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 0,
        shadowOpacity: 1,

        backgroundColor: "#008d9d",
        height: 32,
        borderRadius: 6,
        left: 0,
        top: 0
    },
    frameChildPosition1: {
        opacity: 0.18,
        transform: [
            {
                rotate: "-19.7deg"
            }
        ],
        height: 57,
        width: 7,
        backgroundColor: "#f1f1f1",
        left: -4,
        top: -6,
        position: "absolute"
    },
    frameChildPosition: {
        width: 2,
        left: -11,
        top: -5,
        opacity: 0.18,
        transform: [
            {
                rotate: "-19.7deg"
            }
        ],
        height: 57,
        backgroundColor: "#f1f1f1",
        position: "absolute"
    },
    getIn: {
        top: 10,
        left: 22
    },
    mathQuiz2: {
        left: 184,
        borderColor: "#eaeaea",
        borderRadius: 12,
        elevation: 4,

        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
        borderWidth: 1,
        top: -1,
        height: "100%",
        overflow: "hidden"
    },
    mindBender: {
        marginLeft: -47,
        lineHeight: 20,
        top: 86,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        left: "50%",
        textAlign: "center"
    },
    chatgptImageJul132025032: {
        backgroundColor: "#001138",
        borderRadius: 8,
        left: 0,
        top: 0
    },
    ellipseIcon: {
        left: 53,
        filter: "blur(51px)",
        width: 66,
        height: 66,
        top: 6,
        position: "absolute"
    },
    chatgptImageOct132025112: {
        display: "none"
    },
    chatgptImageOct132025113: {
        left: 49,
        width: 87,
        height: 75,
        top: 1,
        position: "absolute"
    },
    mathQuiz3: {
        left: -1
    },
    grandmasterMode: {
        marginLeft: -70,
        lineHeight: 20,
        top: 86,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        left: "50%",
        textAlign: "center"
    },
    classicStrategicFace: {
        left: 8,
        width: 156,
        color: "#646c6d",
        fontFamily: "OpenSans-Regular",
        top: 108,
        lineHeight: 14,
        fontSize: 12,
        textAlign: "center",
        position: "absolute"
    },
    chatgptImageOct132025114: {
        top: -28,
        left: -8,
        width: 184,
        height: 161,
        position: "absolute"
    },
    mathQuiz4: {
        left: 184
    },
    ludoRoyale: {
        marginLeft: -45,
        lineHeight: 20,
        top: 86,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        left: "50%",
        textAlign: "center"
    },
    chatgptImageOct132025115: {
        left: 77,
        width: 48,
        height: 52
    },
    mathQuiz5: {
        left: -1
    },
    strategies: {
        marginLeft: -35,
        textAlign: "left",
        lineHeight: 20,
        top: 86,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        left: "50%"
    },
    chatgptImageOct132025116: {
        top: 9,
        width: 79,
        height: 70,
        left: 66,
        position: "absolute"
    },
    mathQuiz6: {
        left: 184
    },
    cardsTrap: {
        marginLeft: -40,
        lineHeight: 20,
        top: 86,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        left: "50%",
        textAlign: "center"
    },
    chatgptImageOct132025118: {
        width: 148,
        height: 132,
        top: 12,
        left: 10,
        position: "absolute"
    },
    mathQuiz7: {
        left: -1
    },
    mathsQuiz2: {
        textAlign: "left",
        marginLeft: -39
    },
    challengeYourReasoning5: {
        fontSize: 10,
        lineHeight: 13
    },
    mathQuiz8: {
        left: 184
    },
    mindBender2: {
        marginLeft: -44,
        textAlign: "center"
    },
    chatgptImageOct1320251111: {
        top: 456,
        left: 44,
        width: 62,
        height: 72,
        position: "absolute"
    },
    bottomNav: {
        left: "50%",
        marginLeft: -wp(50)
    },
    unionIcon: {
        boxShadow: "0px -1px 10.2px rgba(0, 0, 0, 0.16)",
        left: 0
    },
    leaderboard: {
        marginTop: -34,
        marginLeft: -192.5,
        top: "50%",
        left: "50%"
    },
    leaderboard2: {
        left: 2
    },
    leaderboardChild: {
        top: 15,
        left: 27,
        width: 21,
        height: 23,
        position: "absolute"
    },
    events: {
        left: 80,
        top: 0
    },
    events2: {
        left: 19
    },
    vectorIcon: {
        height: "23.53%",
        width: "32.89%",
        top: "27.94%",
        right: "32.89%",
        bottom: "48.53%",
        left: "34.21%",
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden"
    },
    profile: {
        left: 317,
        top: 0
    },
    profile2: {
        left: scale(20),
        fontFamily: "Montserrat-SemiBold",
        lineHeight: verticalScale(8),
        fontSize: moderateScale(11),
        top: verticalScale(44),
        color: "#008d9d",
        textAlign: "center",
        fontWeight: "600",
        position: "absolute"
    },
    vectorIcon2: {
        width: "23.68%",
        right: "38.16%",
        left: "38.16%"
    },
    referals: {
        left: 241,
        top: 0
    },
    referrals: {
        left: 13
    },
    vectorIcon3: {
        width: "28.95%",
        right: "35.53%",
        left: "35.53%"
    },
    x: {
        top: -2,
        left: 163
    },
    xChild: {
        left: 0,
        top: 0
    },
    xInner: {
        left: 14,
        width: 39,
        height: 39,
        top: 14,
        position: "absolute"
    },
    instanceChild: {
        left: 1,
        boxShadow: "-2.538658618927002px -2.538658618927002px 1.78px rgba(0, 0, 0, 0.25)",
        width: 37,
        height: 34
    },
    powerUpYour: {
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        position: "absolute",
        left: 18,
        top: 14
    },
    bundlesBoostsAnd: {
        top: 40,
        fontFamily: "Roboto-Regular",
        color: "#4b5151",
        lineHeight: 16,
        fontSize: 12,
        textAlign: "left",
        left: 18,
        position: "absolute"
    },
    bg: {
        top: 41,
        left: 0,
        position: "absolute"
    },
    bgChild: {
        left: 128
    },
    bgItem: {
        left: 265
    },
    bgInner: {
        left: 38
    },
    bgChild2: {
        left: 156
    },
    bgChild3: {
        left: 294
    },
    bgChild4: {
        left: 66
    },
    bgChild5: {
        left: 185
    },
    bgChild6: {
        left: 322
    },
    bgChild7: {
        left: 95
    },
    bgChild8: {
        left: 213
    },
    bgChild9: {
        left: 351
    },
    bgChild10: {
        left: 123
    },
    bgChild11: {
        left: 242
    },
    bgChild12: {
        left: 379
    },
    bgChild13: {
        left: 152
    },
    bgChild14: {
        left: 270
    },
    bgChild15: {
        left: 407
    },
    bgChild16: {
        left: 180
    },
    bgChild17: {
        left: -2
    },
    bgChild18: {
        left: 10
    },
    bgChild19: {
        left: 364
    },
    store2: {
        marginLeft: -26.5,
        fontWeight: "700",
        fontFamily: "OpenSans-Bold",
        lineHeight: 24,
        fontSize: 20,
        textAlign: "left",
        color: "#fff",
        left: "50%"
    },
    arrowUpUndefinedGlyph: {
        height: 24,
        width: 24,
        left: 18
    },
    walletUndefinedGlyphUnParent: {
        left: 306,
        width: 69,
        height: 24,
        display: "none"
    },
    walletUndefinedGlyphUn: {
        height: 24,
        left: 0,
        top: 0,
        position: "absolute"
    },
    text: {
        left: 28,
        top: 6
    },
    rectangleParent6: {
        top: 18,
        left: 348,
        height: 15,
        width: 29,
        display: "none",
        position: "absolute"
    },
    groupChild: {
        top: 0
    },
    groupItem: {
        top: 6
    },
    groupInner: {
        top: 12
    }
});

export default Store;
