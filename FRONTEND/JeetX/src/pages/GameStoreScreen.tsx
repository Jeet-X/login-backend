import * as React from "react";
import { StyleSheet, View, Text, Image as RNImage, ScrollView } from "react-native";

const Image = (props: any) => <View {...props} style={[{ backgroundColor: 'rgba(255,255,255,0.1)' }, props.style]} ><RNImage {...props} style={{ display: 'none' }} /></View>;
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const GameStoreScreen = () => {

    return (
        <SafeAreaView style={styles.viewBg}>
            <View style={[styles.view, styles.viewLayout]}>

                <View style={[styles.mainBody, styles.mainBodyLayout]}>
                    <View style={styles.categories} />

                    <Image style={styles.chevronDownUndefinedGly} resizeMode="cover" />
                    <Text style={[styles.unlockEndlessFun, styles.gameStoreTypo]}>Unlock Endless Fun!</Text>
                    <Text style={styles.exclusiveCollectionsAnd}>Exclusive collections and upgrades to elevate your gameplay.</Text>
                    <View style={[styles.mathQuiz, styles.mathLayout2]}>
                        <View style={styles.mathQuizChild} />
                        <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={styles.arrowUpRightUndefinedG} resizeMode="cover" />
                        <View style={styles.rectangleParent}>
                            <View style={[styles.frameChild, styles.wrapperBg]} />
                            <View style={styles.frameChildPosition1} />
                            <View style={styles.frameChildPosition} />
                            <Text style={[styles.getIn, styles.getInTypo]}>Get IN</Text>
                        </View>
                        <Image style={[styles.chatgptImageNov14202509, styles.chatgptPosition]} resizeMode="cover" />
                        <Text style={[styles.avatar, styles.coinsTypo]}>Avatar</Text>
                        <Text style={[styles.shyGirl, styles.shyGirlTypo]}>Shy Girl</Text>
                        <View style={[styles.wrapper, styles.wrapperBg]}>
                            <Text style={[styles.text, styles.textPosition]}>₹ 99</Text>
                        </View>
                    </View>
                    <View style={[styles.mathQuiz2, styles.mathLayout2]}>
                        <View style={styles.mathQuizChild} />
                        <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={styles.arrowUpRightUndefinedG} resizeMode="cover" />
                        <View style={styles.rectangleParent}>
                            <View style={[styles.frameChild, styles.wrapperBg]} />
                            <View style={styles.frameChildPosition1} />
                            <View style={styles.frameChildPosition} />
                            <Text style={[styles.getIn, styles.getInTypo]}>Get IN</Text>
                        </View>
                        <Text style={[styles.avatar, styles.coinsTypo]}>Avatar</Text>
                        <Text style={[styles.shyGirl, styles.shyGirlTypo]}>Rural Guy</Text>
                        <View style={[styles.wrapper, styles.wrapperBg]}>
                            <Text style={[styles.text2, styles.textPosition]}>₹ 149</Text>
                        </View>
                        <Image style={[styles.chatgptImageNov142025092, styles.chatgptLayout2]} resizeMode="cover" />
                        <View style={[styles.mathQuizInner, styles.groupChildLayout]} />
                    </View>
                    <View style={[styles.mathQuiz3, styles.mathLayout2]}>
                        <View style={styles.mathQuizChild} />
                        <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={styles.arrowUpRightUndefinedG} resizeMode="cover" />
                        <View style={styles.rectangleParent}>
                            <View style={[styles.frameChild, styles.wrapperBg]} />
                            <View style={styles.frameChildPosition1} />
                            <View style={styles.frameChildPosition} />
                            <Text style={[styles.getIn, styles.getInTypo]}>Get IN</Text>
                        </View>
                        <Text style={[styles.avatar, styles.coinsTypo]}>Avatar</Text>
                        <Text style={[styles.shyGirl, styles.shyGirlTypo]}>Exclusive Pack</Text>
                        <View style={[styles.wrapper, styles.wrapperBg]}>
                            <Text style={[styles.text2, styles.textPosition]}>₹ 499</Text>
                        </View>
                        <View style={[styles.chatgptImageNov14202509Parent, styles.chatgptPosition]}>
                            <Image style={[styles.chatgptImageNov142025093, styles.chatgptLayout2]} resizeMode="cover" />
                            <View style={[styles.groupChild, styles.groupChildLayout]} />
                        </View>
                        <Image style={[styles.chatgptImageOct13202511, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={[styles.chatgptImageNov142025094, styles.coinsPosition]} resizeMode="cover" />
                        <Text style={[styles.text4, styles.coinsTypo]}>+</Text>
                    </View>
                    <View style={[styles.mathQuiz4, styles.mathLayout1]}>
                        <View style={styles.mathQuizChild} />
                        <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={styles.arrowUpRightUndefinedG} resizeMode="cover" />
                        <View style={styles.rectangleParent}>
                            <View style={[styles.frameChild, styles.wrapperBg]} />
                            <View style={styles.frameChildPosition1} />
                            <View style={styles.frameChildPosition} />
                            <Text style={[styles.getIn, styles.getInTypo]}>Get IN</Text>
                        </View>
                        <Text style={[styles.avatar, styles.coinsTypo]}>Avatar</Text>
                        <Text style={[styles.shyGirl, styles.shyGirlTypo]}>Golden Boy</Text>
                        <View style={[styles.wrapper, styles.wrapperBg]}>
                            <Text style={[styles.text2, styles.textPosition]}>₹ 199</Text>
                        </View>
                        <Image style={[styles.chatgptImageNov142025095, styles.chatgptPosition]} resizeMode="cover" />
                    </View>
                    <View style={[styles.mathQuiz5, styles.mathLayout1]}>
                        <View style={styles.mathQuizChild} />
                        <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={styles.arrowUpRightUndefinedG} resizeMode="cover" />
                        <View style={styles.rectangleParent}>
                            <View style={[styles.frameChild, styles.wrapperBg]} />
                            <View style={styles.frameChildPosition1} />
                            <View style={styles.frameChildPosition} />
                            <Text style={[styles.getIn, styles.getInTypo]}>Get IN</Text>
                        </View>
                        <Text style={[styles.diceTheme, styles.coinsTypo]}>Dice Theme</Text>
                        <Text style={[styles.shyGirl, styles.shyGirlTypo]}>Fiery Theme</Text>
                        <View style={[styles.wrapper, styles.wrapperBg]}>
                            <Text style={[styles.text2, styles.textPosition]}>₹ 119</Text>
                        </View>
                        <Image style={[styles.chatgptImageNov142025096, styles.chatgptLayout3]} resizeMode="cover" />
                    </View>
                    <View style={[styles.mathQuiz6, styles.mathLayout1]}>
                        <View style={styles.mathQuizChild} />
                        <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={styles.arrowUpRightUndefinedG} resizeMode="cover" />
                        <View style={styles.rectangleParent}>
                            <View style={[styles.frameChild, styles.wrapperBg]} />
                            <View style={styles.frameChildPosition1} />
                            <View style={styles.frameChildPosition} />
                            <Text style={[styles.getIn, styles.getInTypo]}>Get IN</Text>
                        </View>
                        <Text style={[styles.diceTheme, styles.coinsTypo]}>Dice Theme</Text>
                        <Text style={[styles.shyGirl, styles.shyGirlTypo]}>Neon Theme</Text>
                        <View style={[styles.wrapper, styles.wrapperBg]}>
                            <Text style={[styles.text2, styles.textPosition]}>₹ 299</Text>
                        </View>
                        <Image style={[styles.chatgptImageNov142025096, styles.chatgptLayout3]} resizeMode="cover" />
                    </View>
                    <View style={[styles.mathQuiz7, styles.mathLayout]}>
                        <View style={styles.mathQuizChild} />
                        <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={styles.arrowUpRightUndefinedG} resizeMode="cover" />
                        <View style={styles.rectangleParent}>
                            <View style={[styles.frameChild, styles.wrapperBg]} />
                            <View style={styles.frameChildPosition1} />
                            <View style={styles.frameChildPosition} />
                            <Text style={[styles.getIn, styles.getInTypo]}>Get IN</Text>
                        </View>
                        <Text style={[styles.coins, styles.coinsPosition]}>500 Coins</Text>
                        <Text style={[styles.shyGirl, styles.shyGirlTypo]}>Coins</Text>
                        <View style={[styles.wrapper, styles.wrapperBg]}>
                            <Text style={[styles.text, styles.textPosition]}>₹ 49</Text>
                        </View>
                        <Image style={styles.chatgptImageOct132025112} resizeMode="cover" />
                    </View>
                    <View style={[styles.mathQuiz8, styles.mathLayout]}>
                        <View style={styles.mathQuizChild} />
                        <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={styles.arrowUpRightUndefinedG} resizeMode="cover" />
                        <View style={styles.rectangleParent}>
                            <View style={[styles.frameChild, styles.wrapperBg]} />
                            <View style={styles.frameChildPosition1} />
                            <View style={styles.frameChildPosition} />
                            <Text style={[styles.getIn, styles.getInTypo]}>Get IN</Text>
                        </View>
                        <Text style={[styles.coins3, styles.coinsTypo]}>1000 Coins</Text>
                        <Text style={[styles.shyGirl, styles.shyGirlTypo]}>Bag of Coins</Text>
                        <View style={[styles.wrapper, styles.wrapperBg]}>
                            <Text style={[styles.text, styles.textPosition]}>₹ 99</Text>
                        </View>
                        <Image style={[styles.chatgptImageOct132025113, styles.chatgptLayout1]} resizeMode="cover" />
                        <Image style={[styles.chatgptImageOct132025114, styles.chatgptLayout1]} resizeMode="cover" />
                        <Image style={[styles.chatgptImageOct132025115, styles.chatgptLayout]} resizeMode="cover" />
                    </View>
                    <View style={[styles.mathQuiz9, styles.mathLayout]}>
                        <View style={styles.mathQuizChild} />
                        <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                        <Image style={styles.arrowUpRightUndefinedG} resizeMode="cover" />
                        <View style={styles.rectangleParent}>
                            <View style={[styles.frameChild, styles.wrapperBg]} />
                            <View style={styles.frameChildPosition1} />
                            <View style={styles.frameChildPosition} />
                            <Text style={[styles.getIn, styles.getInTypo]}>Get IN</Text>
                        </View>
                        <Text style={[styles.coinChest, styles.coinsTypo]}>Coin Chest</Text>
                        <Text style={[styles.treasureHunt, styles.shyGirlTypo]}>Treasure Hunt</Text>
                        <View style={[styles.wrapper, styles.wrapperBg]}>
                            <Text style={[styles.text2, styles.textPosition]}>₹ 199</Text>
                        </View>
                        <Image style={[styles.chatgptImageOct132025116, styles.chatgptLayout]} resizeMode="cover" />
                        <Image style={[styles.chatgptImageOct132025117, styles.chatgptLayout]} resizeMode="cover" />
                        <Image style={[styles.chatgptImageOct132025118, styles.iconMobileSignalLayout]} resizeMode="cover" />
                        <Image style={styles.chatgptImageNov142025098} resizeMode="cover" />
                    </View>
                </View>
                <LinearGradient style={[styles.bg, styles.bgLayout]} locations={[0, 1]} colors={['#02121a', '#0d3648']} useAngle={true} angle={-90}>
                    <ScrollView style={styles.bgLayout} horizontal={true}>
                        <Image style={[styles.bgChild, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgItem, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgInner, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.groupIcon, styles.childLayout]} resizeMode="cover" />
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
                        <Text style={[styles.gameStore, styles.gameStoreTypo]}>Game Store</Text>
                        <Image style={[styles.arrowUpUndefinedGlyph, styles.undefinedLayout]} resizeMode="cover" />
                        <View style={[styles.walletUndefinedGlyphUnParent, styles.undefinedLayout]}>
                            <Image style={[styles.walletUndefinedGlyphUn, styles.undefinedLayout]} resizeMode="cover" />
                            <Text style={[styles.text11, styles.getInTypo]}>₹1,999</Text>
                        </View>
                        <View style={styles.groupView}>
                            <View style={[styles.groupItem, styles.groupLayout]} />
                            <View style={[styles.groupInner, styles.groupLayout]} />
                            <View style={[styles.groupChild2, styles.groupLayout]} />
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    gameStoreScreen: {
        flex: 1,
        backgroundColor: "#f4f6f6"
    },
    viewLayout: {
        width: "100%",
        overflow: "hidden"
    },
    mainBodyLayout: {
        width: 393,
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
        left: "50%"
    },
    iconMobileSignalLayout: {
        width: 18,
        position: "absolute"
    },
    bottomNavLayout: {
        height: 68,
        bottom: 0,
        width: 393,
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
    text4Clr: {
        color: "#008d9d",
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
    gameStoreTypo: {
        textAlign: "left",
        lineHeight: 24,
        fontSize: 20,
        position: "absolute"
    },
    mathLayout2: {
        height: 178,
        width: 113,
        borderWidth: 1,
        borderColor: "#eaeaea",
        borderRadius: 12,
        elevation: 4,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.06)",
        left: 17,
        borderStyle: "solid",
        backgroundColor: "#fff",
        position: "absolute",
        overflow: "hidden"
    },
    undefinedLayout: {
        height: 24,
        position: "absolute"
    },
    wrapperBg: {
        backgroundColor: "#008d9d",
        height: 32,
        position: "absolute"
    },
    getInTypo: {
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        lineHeight: 12,
        fontSize: 12,
        textAlign: "left",
        color: "#fff",
        position: "absolute"
    },
    chatgptPosition: {
        height: 60,
        top: 12,
        left: "50%",
        position: "absolute"
    },
    coinsTypo: {
        lineHeight: 20,
        fontFamily: "Roboto-Bold",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16
    },
    shyGirlTypo: {
        width: 94,
        color: "#646c6d",
        lineHeight: 18,
        fontSize: 14,
        marginLeft: -47.5,
        fontFamily: "Roboto-Bold",
        textAlign: "center",
        fontWeight: "600",
        left: "50%",
        position: "absolute"
    },
    textPosition: {
        marginTop: -9,
        lineHeight: 18,
        fontFamily: "Roboto-Bold",
        top: "50%",
        textAlign: "center",
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        left: "50%",
        position: "absolute"
    },
    chatgptLayout2: {
        width: 47,
        height: 60,
        left: "50%",
        position: "absolute"
    },
    groupChildLayout: {
        width: 7,
        height: 24,
        backgroundColor: "#ededed",
        position: "absolute"
    },
    coinsPosition: {
        marginLeft: -37.5,
        left: "50%",
        position: "absolute"
    },
    mathLayout1: {
        left: 140,
        height: 178,
        width: 113,
        borderWidth: 1,
        borderColor: "#eaeaea",
        borderRadius: 12,
        elevation: 4,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.06)",
        borderStyle: "solid",
        backgroundColor: "#fff",
        position: "absolute",
        overflow: "hidden"
    },
    chatgptLayout3: {
        width: 52,
        marginLeft: -26.5
    },
    mathLayout: {
        left: 263,
        height: 178,
        width: 113,
        borderWidth: 1,
        borderColor: "#eaeaea",
        borderRadius: 12,
        elevation: 4,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.06)",
        borderStyle: "solid",
        backgroundColor: "#fff",
        position: "absolute",
        overflow: "hidden"
    },
    chatgptLayout1: {
        width: 37,
        position: "absolute"
    },
    chatgptLayout: {
        height: 26,
        position: "absolute"
    },
    bgLayout: {
        backgroundColor: "transparent",
        maxWidth: 393,
        flexGrow: 0,
        width: "100%",
        flex: 1
    },
    childLayout: {
        height: 58,
        width: 28,
        top: 1,
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
    viewBg: {
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    view: {
        height: 830,
        overflow: "hidden",
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    statusbar: {
        backgroundColor: "#010e0f",
        height: 42,
        left: "50%",
        top: 0,
        marginLeft: -196.5
    },
    statusbar2: {
        height: "100%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        position: "absolute",
        overflow: "hidden"
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
        top: 1,
        left: 0,
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
        width: 17,
        position: "absolute"
    },
    iconMobileSignal: {
        marginLeft: -38.7,
        height: 12,
        top: 1,
        left: "50%"
    },
    mainBody: {
        top: 91,
        height: 739,
        left: 0
    },
    categories: {
        top: -26,
        boxShadow: "inset 0px 0px 2px rgba(0, 0, 0, 0.2)",
        borderColor: "#ebebeb",
        borderBottomWidth: 1,
        height: 44,
        display: "none",
        borderStyle: "solid",
        backgroundColor: "#fff",
        width: 393,
        left: "50%",
        marginLeft: -196.5,
        position: "absolute",
        overflow: "hidden"
    },
    bottomNav: {
        display: "none",
        left: "50%",
        marginLeft: -196.5
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
        left: 27,
        width: 21,
        height: 23,
        top: 15,
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
        left: 20,
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        color: "#008d9d",
        top: 44,
        textAlign: "center",
        fontWeight: "600"
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
    xItem: {
        left: 14,
        width: 39,
        height: 39,
        top: 14,
        position: "absolute"
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
    unlockEndlessFun: {
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        textAlign: "left",
        lineHeight: 24,
        fontSize: 20,
        left: 18,
        fontWeight: "600",
        top: 14
    },
    exclusiveCollectionsAnd: {
        top: 40,
        lineHeight: 16,
        fontFamily: "Roboto-Regular",
        color: "#4b5151",
        fontSize: 12,
        textAlign: "left",
        left: 18,
        position: "absolute"
    },
    mathQuiz: {
        top: 71
    },
    mathQuizChild: {
        width: 111,
        height: 72,
        backgroundColor: "#ededed",
        left: 0,
        top: 0,
        position: "absolute"
    },
    questionCircleUndefined: {
        top: 8,
        width: 24,
        height: 24,
        right: -237
    },
    arrowUpRightUndefinedG: {
        top: 52,
        borderRadius: 18,
        width: 32,
        height: 32,
        right: -237,
        display: "none",
        position: "absolute"
    },
    rectangleParent: {
        top: 46,
        borderRadius: 8,
        height: 34,
        width: 84,
        left: 265,
        display: "none",
        position: "absolute",
        overflow: "hidden"
    },
    frameChild: {
        boxShadow: "0px 2px 0px #0e4f56",
        elevation: 0,
        borderRadius: 6,
        width: 84,
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
        backgroundColor: "#f1f1f1",
        left: -4,
        top: -6,
        width: 7,
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
    chatgptImageNov14202509: {
        width: 52,
        marginLeft: -26.5
    },
    avatar: {
        top: 80,
        lineHeight: 20,
        color: "#272f2f",
        marginLeft: -24.5,
        left: "50%",
        position: "absolute"
    },
    shyGirl: {
        top: 104
    },
    wrapper: {
        marginLeft: -43.5,
        top: 132,
        boxShadow: "0px 1.4155844449996948px 1.42px rgba(0, 0, 0, 0.49)",
        elevation: 1.42,
        borderRadius: 7,
        width: 86,
        left: "50%"
    },
    text: {
        marginLeft: -15
    },
    mathQuiz2: {
        top: 257
    },
    text2: {
        marginLeft: -20
    },
    chatgptImageNov142025092: {
        marginLeft: -24.5,
        top: 12
    },
    mathQuizInner: {
        top: 27,
        left: 76
    },
    mathQuiz3: {
        top: 443
    },
    chatgptImageNov14202509Parent: {
        marginLeft: -8.5,
        width: 51
    },
    chatgptImageNov142025093: {
        marginLeft: -25.5,
        top: 0
    },
    groupChild: {
        left: 44,
        top: 15
    },
    chatgptImageOct13202511: {
        width: 24,
        height: 24,
        left: 20,
        top: 14
    },
    chatgptImageNov142025094: {
        height: 27,
        width: 26,
        top: 44,
        marginLeft: -37.5
    },
    text4: {
        marginLeft: -13.5,
        top: 31,
        color: "#008d9d",
        position: "absolute",
        left: "50%"
    },
    mathQuiz4: {
        top: 71
    },
    chatgptImageNov142025095: {
        marginLeft: -23.5,
        width: 45
    },
    mathQuiz5: {
        top: 257
    },
    diceTheme: {
        marginLeft: -44.5,
        top: 80,
        lineHeight: 20,
        color: "#272f2f",
        left: "50%",
        position: "absolute"
    },
    chatgptImageNov142025096: {
        height: 54,
        top: 13,
        left: "50%",
        position: "absolute"
    },
    mathQuiz6: {
        top: 443
    },
    mathQuiz7: {
        top: 71
    },
    coins: {
        lineHeight: 20,
        fontFamily: "Roboto-Bold",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
        top: 80,
        color: "#272f2f"
    },
    chatgptImageOct132025112: {
        width: 50,
        height: 50,
        left: 31,
        top: 15,
        position: "absolute"
    },
    mathQuiz8: {
        top: 257
    },
    coins3: {
        marginLeft: -42.5,
        top: 80,
        lineHeight: 20,
        color: "#272f2f",
        left: "50%",
        position: "absolute"
    },
    chatgptImageOct132025113: {
        height: 38,
        left: 31,
        top: 13
    },
    chatgptImageOct132025114: {
        height: 37,
        top: 16,
        left: 44
    },
    chatgptImageOct132025115: {
        top: 39,
        left: 37,
        width: 25
    },
    mathQuiz9: {
        top: 443
    },
    coinChest: {
        marginLeft: -40.5,
        top: 80,
        lineHeight: 20,
        color: "#272f2f",
        left: "50%",
        position: "absolute"
    },
    treasureHunt: {
        top: 106
    },
    chatgptImageOct132025116: {
        left: 12,
        width: 26,
        top: 14
    },
    chatgptImageOct132025117: {
        left: 21,
        top: 16,
        width: 26
    },
    chatgptImageOct132025118: {
        top: 32,
        left: 16,
        height: 18
    },
    chatgptImageNov142025098: {
        top: 17,
        left: 42,
        width: 63,
        height: 53,
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
    groupIcon: {
        left: 156
    },
    bgChild2: {
        left: 294
    },
    bgChild3: {
        left: 66
    },
    bgChild4: {
        left: 185
    },
    bgChild5: {
        left: 322
    },
    bgChild6: {
        left: 95
    },
    bgChild7: {
        left: 213
    },
    bgChild8: {
        left: 351
    },
    bgChild9: {
        left: 123
    },
    bgChild10: {
        left: 242
    },
    bgChild11: {
        left: 379
    },
    bgChild12: {
        left: 152
    },
    bgChild13: {
        left: 270
    },
    bgChild14: {
        left: 407
    },
    bgChild15: {
        left: 180
    },
    bgChild16: {
        left: -2
    },
    bgChild17: {
        left: 10
    },
    bgChild18: {
        left: 364
    },
    gameStore: {
        marginLeft: -58.5,
        fontWeight: "700",
        fontFamily: "OpenSans-Bold",
        top: 13,
        textAlign: "left",
        lineHeight: 24,
        fontSize: 20,
        color: "#fff",
        left: "50%"
    },
    arrowUpUndefinedGlyph: {
        top: 13,
        width: 24,
        height: 24,
        left: 18
    },
    walletUndefinedGlyphUnParent: {
        left: 306,
        width: 69,
        top: 13,
        display: "none"
    },
    walletUndefinedGlyphUn: {
        width: 24,
        height: 24,
        left: 0,
        top: 0
    },
    text11: {
        left: 28,
        top: 6
    },
    groupView: {
        top: 18,
        left: 348,
        height: 15,
        width: 29,
        display: "none",
        position: "absolute"
    },
    groupItem: {
        top: 0
    },
    groupInner: {
        top: 6
    },
    groupChild2: {
        top: 12
    }
});

export default GameStoreScreen;
