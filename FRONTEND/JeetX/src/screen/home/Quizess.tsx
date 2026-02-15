import * as React from "react";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image as RNImage, Pressable, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { getQuizCategories, QuizCategory } from "../../api/quizApi";

const Image = (props: any) => <View {...props} style={[{ backgroundColor: 'rgba(255,255,255,0.1)' }, props.style]} ><RNImage {...props} style={{ display: 'none' }} /></View>;

const Quizess = () => {
    const navigation = useNavigation<any>();
    const [categories, setCategories] = useState<QuizCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await getQuizCategories();
            if (response.success && response.data.length > 0) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
            // Alert.alert("Error", "Failed to load quiz categories");
        } finally {
            setLoading(false);
        }
    };

    const handleSubCategoryPress = (cat: QuizCategory) => {
        navigation.navigate('QuizEntry', {
            subCategoryId: cat.id,
            subCategoryName: cat.name
        });
    };

    const renderCard = (cat: QuizCategory) => {
        // Find specific styles or dynamic resources if needed. 
        // For now using generic styles and the icon_url from API.

        return (
            <Pressable
                key={cat.id}
                style={[styles.mathQuiz, styles.mathLayout]}
                onPress={() => handleSubCategoryPress(cat)}
            >
                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                <Text style={[styles.mathsQuiz, styles.quizzesFlexBox]}>{cat.name}</Text>
                <Text style={[styles.challengeYourReasoning, styles.yourTypo]} numberOfLines={2}>
                    {cat.description}
                </Text>

                {/* Icon Area */}
                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                    {cat.icon_url ? (
                        <RNImage
                            source={{ uri: cat.icon_url }}
                            style={[styles.chatgptImageJul16202502, { width: 40, height: 40, resizeMode: 'contain', left: 12, top: 12 }]}
                        />
                    ) : (
                        // Fallback generic icon or create specific fallbacks based on name
                        <Image style={styles.chatgptImageJul16202502} resizeMode="cover" />
                    )}
                </View>

                {/* Decorative circles/arrows */}
                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />

                {/* Get IN Button */}
                <View style={[styles.rectangleParent, styles.frameChildLayout, { display: 'flex' }]}>
                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                    <View style={styles.frameChildPosition1} />
                    <View style={styles.frameChildPosition} />
                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                </View>
            </Pressable>
        );
    };

    return (
        <SafeAreaView style={styles.viewBg}>
            <View style={[styles.view, styles.viewLayout]}>

                {/* Main Content Area */}
                <View style={styles.mainBody}>
                    <ScrollView style={[styles.contentBody, styles.chessListLayout]} contentContainerStyle={{ paddingBottom: 100 }}>
                        <View style={[styles.mathQuizParent, styles.body1Position]}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#008d9d" style={{ marginTop: 50 }} />
                            ) : (
                                categories.map(cat => renderCard(cat))
                            )}
                            {!loading && categories.length === 0 && (
                                <Text style={{ textAlign: 'center', marginTop: 20, color: '#728181' }}>No quizzes available.</Text>
                            )}
                        </View>
                    </ScrollView>
                </View>

                {/* Profile / Header Bar */}
                <LinearGradient style={styles.profilePointsbar} locations={[0, 1]} colors={['#02121a', '#0d3648']} useAngle={true} angle={-90}>
                    <Image style={[styles.profilePointsbarChild, styles.profileLayout]} resizeMode="cover" />
                    <View style={[styles.rectangleParent19, styles.rectangleParent19Layout]}>
                        <View style={styles.groupChild} />
                        <Image style={[styles.groupItem, styles.groupItemPosition]} resizeMode="cover" />
                        <Text style={styles.text}>12058 / 25000</Text>
                        <View style={styles.starParentPosition}>
                            <Image style={[styles.groupInner, styles.starParentPosition]} resizeMode="cover" />
                            <Text style={styles.text2}>12</Text>
                        </View>
                    </View>
                    <Image style={[styles.profilePointsbarItem, styles.profileLayout]} resizeMode="cover" />
                    <View style={[styles.frameGroup, styles.groupFlexBox]}>
                        <View style={[styles.groupParent, styles.groupFlexBox]}>
                            <Image style={styles.profileLayout} resizeMode="cover" />
                            <Image style={styles.frameChild61} resizeMode="cover" />
                        </View>
                        <View style={[styles.groupContainer, styles.groupFlexBox]}>
                            <View style={styles.walletUndefinedGlyphUnParent}>
                                <Image style={[styles.walletUndefinedGlyphUn, styles.undefinedLayout]} resizeMode="cover" />
                                <Text style={[styles.text3, styles.text3Position]}>₹1,999</Text>
                            </View>
                            <Image style={[styles.alertUndefinedGlyphUnd, styles.undefinedLayout]} resizeMode="cover" />
                        </View>
                    </View>
                    <Image style={[styles.vectorIcon4, styles.vectorIconLayout]} resizeMode="cover" />
                    <View style={[styles.profilePointsbarInner, styles.statusbarPosition]}>
                        <View style={styles.frameParent2}>
                            <LinearGradient style={[styles.ellipseParent, styles.parentLayout]} locations={[0, 0.43, 0.55, 1]} colors={['#e65050', '#b45050', '#34348e', '#4040bc']} useAngle={true} angle={90}>
                                <Image style={[styles.frameChild62, styles.frameChild62Layout]} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul1320250324, styles.chatgptLayout1]} resizeMode="cover" />
                                <View style={[styles.winBigInParent, styles.createLayout]}>
                                    <Text style={[styles.winBigIn, styles.winLayout]}>WIN BIG IN</Text>
                                    <Text style={[styles.ultimateTournament, styles.trendingGamesText1]}>Ultimate Tournament</Text>
                                </View>
                                <View style={[styles.timeParent, styles.parentFlexBox]}>
                                    <Text style={[styles.time2, styles.getInTypo]}>Time</Text>
                                    <Text style={[styles.am, styles.amTypo]}>5:30 AM</Text>
                                </View>
                                <View style={styles.peopleTeamUndefinedGlypParent}>
                                    <Image style={styles.peopleTeamUndefinedGlyp} resizeMode="cover" />
                                    <Text style={[styles.text4, styles.amTypo]}>2500+</Text>
                                </View>
                                <View style={[styles.prizePoolParent, styles.frameChild63Position]}>
                                    <Text style={[styles.time2, styles.getInTypo]}>Prize Pool</Text>
                                    <Text style={[styles.am, styles.amTypo]}>1 Lac</Text>
                                </View>
                            </LinearGradient>
                            <LinearGradient style={[styles.chatgptImageJul13202506Parent, styles.parentLayout]} locations={[0, 0, 0.55, 1]} colors={['#302a2a', '#3c3333', '#090936', '#4f4fd7']} useAngle={true} angle={92.53}>
                                <Image style={[styles.chatgptImageJul13202506, styles.chatgptLayout]} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul132025062, styles.chatgptLayout]} resizeMode="cover" />
                                <View style={[styles.frameChild63, styles.frameChild63Position]} />
                                <Image style={[styles.chatgptImageJul7202510, styles.chatgptLayout1]} resizeMode="cover" />
                                <Text style={[styles.trendingGames, styles.trendingGamesText1]}>Trending Games</Text>
                                <Image style={[styles.chatgptImageJul132025063, styles.frameChild62Layout]} resizeMode="cover" />
                                <Image style={styles.chatgptImageJul132025064} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul132025065, styles.frameChild63Position]} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul132025066, styles.rectangleParent19Layout]} resizeMode="cover" />
                                <Text style={[styles.winBigPrizes, styles.winLayout]}>WIN BIG Prizes</Text>
                                <Text style={[styles.playWithFriends, styles.winLayout]}>Play With Friends Online</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    frameContainer29Content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 21
    },
    quizess: {
        flex: 1,
        backgroundColor: "#f4f6f6"
    },
    viewLayout: {
        width: "100%",
        overflow: "hidden"
    },
    chessListLayout: {
        maxWidth: 393,
        width: 393,
        position: "absolute",
        flex: 1
    },
    body1Position: {
        width: 361,
        gap: 8,
        top: 12,
        position: "absolute"
    },
    mathLayout: {
        borderWidth: 1,
        height: 94
    },
    categoriesBg: {
        backgroundColor: "#fff",
        borderStyle: "solid"
    },
    quizzesFlexBox: {
        textAlign: "left",
        lineHeight: 20
    },
    yourTypo: {
        color: "#646c6d",
        lineHeight: 16,
        fontSize: 12,
        textAlign: "left",
        left: 88,
        position: "absolute"
    },
    chatgptParentLayout: {
        height: 64,
        position: "absolute"
    },
    undefinedLayout: {
        width: 24,
        height: 24
    },
    arrowLayout: {
        width: 32,
        borderRadius: 18,
        top: 52,
        height: 32,
        right: 14,
        position: "absolute"
    },
    frameChildLayout: {
        width: 84,
        position: "absolute"
    },
    amTypo1: {
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800"
    },
    chatgptImageJul162025023Layout: {
        width: 59,
        position: "absolute"
    },
    gameLayout: {
        width: 60,
        position: "absolute"
    },
    flatPosition: {
        width: 63,
        left: 0,
        position: "absolute"
    },
    ludoClr: {
        color: "#728181",
        textAlign: "left",
        lineHeight: 20
    },
    chatgptPosition: {
        height: 54,
        width: 56,
        left: 18,
        top: 19,
        position: "absolute"
    },
    createLayout: {
        height: 47,
        position: "absolute"
    },
    frameParentPosition: {
        top: 4,
        position: "absolute"
    },
    text3Position: {
        top: 6,
        position: "absolute"
    },
    instanceChildPosition: {
        top: 3,
        position: "absolute"
    },
    vectorIconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden"
    },
    bottomNavPosition: {
        height: 68,
        bottom: 0,
        width: 393,
        left: 0,
        position: "absolute"
    },
    eventsLayout: {
        width: 76,
        height: 68,
        backgroundColor: "#fff",
        position: "absolute",
        overflow: "hidden"
    },
    timeTypo: {
        textAlign: "center",
        fontWeight: "600",
        position: "absolute"
    },
    groupItemPosition: {
        left: 27,
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
    statusbarPosition: {
        marginLeft: -196.5,
        left: "50%",
        width: 393,
        position: "absolute"
    },
    parentFlexBox1: {
        gap: 6,
        flexDirection: "row"
    },
    text4Typo: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "700"
    },
    batteryEndIconLayout: {
        height: 4,
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
        left: "50%",
        top: 1,
        position: "absolute"
    },
    profileLayout: {
        height: 40,
        width: 40
    },
    rectangleParent19Layout: {
        height: 36,
        position: "absolute"
    },
    starParentPosition: {
        width: 36,
        height: 36,
        top: 0,
        left: 0,
        position: "absolute"
    },
    groupFlexBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    parentLayout: {
        width: 359,
        borderColor: "#ac5e07",
        borderRadius: 23,
        height: 90,
        backgroundColor: "transparent",
        top: 0,
        borderWidth: 1,
        borderStyle: "solid",
        position: "absolute",
        overflow: "hidden"
    },
    frameChild62Layout: {
        height: 104,
        position: "absolute"
    },
    chatgptLayout1: {
        width: 114,
        position: "absolute"
    },
    winLayout: {
        lineHeight: 13,
        color: "#fff",
        textAlign: "left",
        position: "absolute"
    },
    trendingGamesText1: {
        textShadowColor: "rgba(0, 0, 0, 0.12)",
        textShadowRadius: 0,
        textAlign: "center",
        color: "#fff",
        position: "absolute"
    },
    parentFlexBox: {
        alignItems: "flex-end",
        left: 16
    },
    getInTypo: {
        lineHeight: 12,
        color: "#fff",
        fontSize: 12,
        textAlign: "left"
    },
    amTypo: {
        fontSize: 13,
        lineHeight: 13,
        color: "#fff",
        textAlign: "left"
    },
    frameChild63Position: {
        top: 62,
        position: "absolute"
    },
    chatgptLayout: {
        width: 46,
        height: 46,
        position: "absolute"
    },
    viewBg: {
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    view: {
        height: 1130,
        overflow: "hidden",
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    mainBody: {
        top: 209,
        height: 921,
        width: 393,
        left: 0,
        position: "absolute"
    },
    contentBody: {
        top: 44,
        left: 0
    },
    mathQuizParent: {
        gap: 8,
        left: 16
    },
    mathQuiz: {
        elevation: 4,
        borderRadius: 12,
        borderColor: "#eaeaea",
        borderStyle: "solid",
        alignSelf: "stretch",
        overflow: "hidden"
    },
    mathQuizChild: {
        left: -1,
        borderRadius: 10,
        borderColor: "rgba(217, 217, 217, 0.6)",
        width: 363,
        top: -1,
        borderWidth: 1,
        height: 94,
        position: "absolute"
    },
    mathsQuiz: {
        color: "#272f2f",
        textAlign: "left",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        lineHeight: 20,
        fontSize: 15,
        left: 88,
        top: 14,
        position: "absolute"
    },
    challengeYourReasoning: {
        top: 38,
        width: 257,
        fontFamily: "OpenSans-Regular"
    },
    chatgptImageJul13202503Parent: {
        width: 64,
        left: 14,
        top: 14
    },
    chatgptImageJul13202503: {
        backgroundColor: "rgba(174, 189, 189, 0.2)",
        borderRadius: 8,
        top: 0,
        width: 64,
        left: 0
    },
    chatgptImageJul16202502: {
        left: 3,
        width: 58,
        height: 60,
        top: 2,
        position: "absolute"
    },
    questionCircleUndefined: {
        height: 24,
        right: 14,
        width: 24,
        position: "absolute",
        top: 8
    },
    arrowUpRightUndefinedG: {
        display: "none",
        height: 32
    },
    rectangleParent: {
        top: 46,
        left: 265,
        height: 34,
        display: "none",
        borderRadius: 8,
        overflow: "hidden"
    },
    frameChild: {
        elevation: 0,
        borderRadius: 6,
        backgroundColor: "#008d9d",
        height: 32,
        top: 0,
        left: 0
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
        left: 22,
        color: "#fff",
        lineHeight: 12,
        fontSize: 12,
        textAlign: "left",
        top: 10,
        fontWeight: "800",
        position: "absolute"
    },
    chatgptImageJul162025023: {
        height: 55,
        left: 17,
        width: 59,
        top: 18
    },
    musicFlatIconForMusicQuiz: {
        height: 62,
        left: 2,
        top: 2
    },
    politicsFlatColoredIcon: {
        height: 62,
        top: 0
    },
    chatgptImageJul13202503Parent2: {
        borderRadius: 8,
        top: 0,
        width: 64,
        left: 0,
        overflow: "hidden"
    },
    createAFlatIllustrationFor: {
        height: 63,
        top: 1
    },
    createAProgrammingTestFlat: {
        height: 59,
        left: 2,
        top: 2
    },
    body1: {
        marginLeft: 270.5,
        left: "50%",
        gap: 8
    },
    cricket: {
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        fontWeight: "600",
        position: "absolute",
        left: 88,
        color: "#728181",
        top: 14
    },
    createAFlatIllustrationOf: {
        width: 54,
        left: 19,
        top: 14
    },
    chatgptImageJul162025024: {
        display: "none"
    },
    createAFlatIllustrationOf2: {
        top: 24,
        width: 52,
        left: 19
    },
    ellipseIcon: {
        top: 63,
        height: 5,
        width: 52,
        left: 19,
        position: "absolute"
    },
    kabbadiGameFlatIllustration: {
        top: 25,
        height: 50,
        width: 64,
        left: 14,
        position: "absolute"
    },
    esportsGameFlatIllustration: {
        height: 53,
        left: 2,
        top: 2
    },
    createAStocksFlatIllustrat: {
        width: 61,
        left: 2,
        height: 55
    },
    mathsQuiz2: {
        lineHeight: 22,
        fontSize: 18,
        textAlign: "left",
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        left: 88,
        top: 14,
        position: "absolute"
    },
    testYourLogic2: {
        fontFamily: "OpenSans-SemiBold",
        width: 214,
        top: 40,
        fontWeight: "600"
    },
    questionCircleUndefined14: {
        height: 24,
        right: 14,
        width: 24,
        position: "absolute",
        top: 12
    },
    arrowUpRightUndefinedG14: {
        height: 32
    },
    puzzleList: {
        left: 918,
        gap: 8
    },
    createAFlatIllustrationOf3: {
        top: 22,
        left: 20,
        width: 52
    },
    chatgptImageJul13202503Parent8: {
        borderRadius: 8,
        width: 64,
        left: 14,
        top: 14,
        overflow: "hidden"
    },
    createAWordPuzzleGameFla: {
        top: -4,
        left: 4,
        height: 75
    },
    createAPicturePuzzleGameF: {
        height: 58,
        borderRadius: 8,
        width: 64,
        left: 0
    },
    createASequencePuzzleGame: {
        height: 46,
        top: 9,
        width: 60,
        left: 2,
        position: "absolute"
    },
    chessList: {
        left: 1369,
        top: 12
    },
    createAClassicChessFlatIl: {
        height: 56,
        top: 18,
        width: 56,
        left: 18,
        borderRadius: 8,
        position: "absolute"
    },
    chatgptImageJul13202503Parent12: {
        top: 0,
        width: 64,
        left: 0
    },
    createABulletChessGameFla: {
        height: 62,
        top: 0,
        width: 64,
        left: 0,
        position: "absolute"
    },
    chessTournamentFlatIllustra: {
        left: -2,
        width: 68,
        height: 62
    },
    byRsrGames: {
        top: 440,
        left: 249,
        color: "#a4a4a4",
        opacity: 0.4,
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        fontWeight: "600",
        position: "absolute",
        lineHeight: 20,
        textAlign: "left"
    },
    chessListChild: {
        height: "18.83%",
        width: "58.85%",
        top: "73.54%",
        right: "36.56%",
        bottom: "7.63%",
        left: "4.58%",
        opacity: 0.4
    },
    unionIcon: {
    },
    leaderboard: {
        marginTop: -34,
        marginLeft: -192.5,
        top: "50%",
        left: "50%"
    },
    leaderboard2: {
        color: "#8d9f9f",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        textAlign: "center",
        top: 44,
        left: 2
    },
    leaderboardChild: {
        top: 15,
        width: 21,
        height: 23
    },
    events: {
        left: 80,
        top: 0
    },
    events2: {
        color: "#8d9f9f",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        textAlign: "center",
        top: 44,
        left: 19
    },
    vectorIcon: {
        height: "23.53%",
        width: "32.89%",
        top: "27.94%",
        right: "32.89%",
        bottom: "48.53%",
        left: "34.21%"
    },
    profile: {
        left: 317,
        top: 0
    },
    profile2: {
        color: "#8d9f9f",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        textAlign: "center",
        top: 44,
        left: 20
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
        left: 13,
        color: "#8d9f9f",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        textAlign: "center",
        top: 44
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
        top: 0,
        left: 0
    },
    xInner: {
        width: 39,
        height: 39,
        left: 14,
        top: 14,
        position: "absolute"
    },
    instanceChild: {
        left: 1,
        width: 37,
        height: 34
    },
    categories: {
        borderColor: "#ebebeb",
        borderBottomWidth: 1,
        height: 44,
        top: 0,
        backgroundColor: "#fff",
        borderStyle: "solid",
        overflow: "hidden"
    },
    frameParent: {
        marginLeft: -181.5,
        flexGrow: 0,
        maxWidth: 363,
        left: "50%",
        width: 363,
        flex: 1,
        top: 4
    },
    frameWrapper: {
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    appsUndefinedGlyphUndeParent: {
        alignItems: "center"
    },
    appsUndefinedGlyphUnde: {
        display: "none",
        height: 24
    },
    quizzes: {
        color: "#008d9d",
        fontSize: 16,
        textAlign: "left",
        lineHeight: 20
    },
    appsUndefinedGlyphUndeGroup: {
        alignItems: "center",
        alignSelf: "stretch"
    },
    ludo: {
        fontSize: 16,
        fontFamily: "OpenSans-Regular"
    },
    categoriesChild: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        width: 78,
        top: 40,
        backgroundColor: "#008d9d",
        left: 16
    },
    statusbar: {
        backgroundColor: "#010e0f",
        height: 42,
        top: -1
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
        fontSize: 16,
        width: 54,
        top: 1,
        color: "#fff",
        left: 0
    },
    rightSide: {
        marginLeft: 92.5,
        width: 77,
        height: 13,
        left: "50%",
        top: 19,
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
        top: "50%",
        left: 0
    },
    batteryEndIcon: {
        marginTop: -1.5,
        right: 0,
        width: 1,
        top: "50%",
        opacity: 0.4
    },
    fillIcon: {
        marginTop: -4.5,
        right: 10,
        borderRadius: 2,
        height: 9,
        top: "50%",
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
    profilePointsbar: {
        height: 168,
        backgroundColor: "transparent",
        top: 41,
        width: 393,
        left: 0,
        position: "absolute",
        overflow: "hidden"
    },
    profilePointsbarChild: {
        left: 18,
        top: 8,
        position: "absolute"
    },
    rectangleParent19: {
        left: 70,
        width: 125,
        display: "none",
        top: 14
    },
    groupChild: {
        left: 8,
        borderRadius: 3,
        backgroundColor: "#998181",
        borderColor: "#eb9e21",
        borderWidth: 0.9,
        width: 117,
        height: 20,
        top: 8,
        borderStyle: "solid",
        position: "absolute"
    },
    groupItem: {
        width: 50,
        height: 19,
        top: 9,
        left: 27
    },
    text: {
        left: 39,
        lineHeight: 11,
        textShadowRadius: 0,
        textShadowOffset: {
            width: 0,
            height: 0.8623188734054565
        },
        textShadowColor: "#000",
        top: 13,
        fontSize: 11,
        color: "#fff",
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        textAlign: "left",
        position: "absolute"
    },
    groupInner: {
        borderRadius: 1
    },
    text2: {
        left: 9,
        letterSpacing: 0.23,
        fontWeight: "900",
        fontFamily: "Montserrat-Black",
        textShadowRadius: 0.69,
        textShadowOffset: {
            width: 0,
            height: 0.8623188734054565
        },
        textShadowColor: "#000",
        fontSize: 18,
        color: "#fff",
        top: 10,
        lineHeight: 16,
        textAlign: "left",
        position: "absolute"
    },
    profilePointsbarItem: {
        left: 335,
        display: "none",
        top: 12,
        position: "absolute"
    },
    frameGroup: {
        width: 357,
        justifyContent: "space-between",
        gap: 20,
        alignItems: "center",
        left: 18,
        top: 8,
        position: "absolute"
    },
    groupParent: {
        alignItems: "center",
        gap: 8
    },
    frameChild61: {
        height: 25,
        width: 57
    },
    groupContainer: {
        gap: 12,
        alignItems: "center"
    },
    walletUndefinedGlyphUnParent: {
        width: 69,
        height: 24
    },
    walletUndefinedGlyphUn: {
        height: 24,
        top: 0,
        left: 0,
        position: "absolute"
    },
    text3: {
        left: 28,
        color: "#fff",
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        lineHeight: 12,
        fontSize: 12,
        textAlign: "left"
    },
    alertUndefinedGlyphUnd: {
        height: 24
    },
    vectorIcon4: {
        height: "13.1%",
        width: "4.58%",
        top: "10.12%",
        right: "88.04%",
        bottom: "76.79%",
        left: "7.38%"
    },
    profilePointsbarInner: {
        top: 56,
        height: 112,
        overflow: "hidden"
    },
    frameParent2: {
        width: 360,
        height: 90,
        top: 6,
        left: 17,
        position: "absolute"
    },
    ellipseParent: {
        left: 0
    },
    frameChild62: {
        top: 45,
        left: 105,
        width: 153
    },
    chatgptImageJul1320250324: {
        marginLeft: -54.5,
        height: 114,
        left: "50%",
        top: 0
    },
    winBigInParent: {
        top: 17,
        left: 237,
        width: 118
    },
    winBigIn: {
        left: 33,
        fontSize: 9,
        lineHeight: 13,
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        top: 0
    },
    ultimateTournament: {
        lineHeight: 14,
        fontFamily: "Nosifer Caps",
        width: 118,
        top: 19,
        fontSize: 12,
        textShadowColor: "rgba(0, 0, 0, 0.12)",
        left: 0
    },
    timeParent: {
        top: 41,
        alignItems: "flex-end",
        gap: 6,
        flexDirection: "row",
        position: "absolute"
    },
    time2: {
        fontStyle: "italic",
        fontWeight: "500",
        fontFamily: "Montserrat-MediumItalic",
        color: "#fff"
    },
    am: {
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800"
    },
    peopleTeamUndefinedGlypParent: {
        top: 13,
        gap: 6,
        alignItems: "center",
        flexDirection: "row",
        left: 16,
        position: "absolute"
    },
    peopleTeamUndefinedGlyp: {
        width: 20,
        height: 20
    },
    text4: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "700"
    },
    prizePoolParent: {
        alignItems: "flex-end",
        left: 16,
        gap: 6,
        flexDirection: "row"
    },
    chatgptImageJul13202506Parent: {
        left: 377
    },
    chatgptImageJul13202506: {
        left: 291,
        opacity: 0.84,
        top: 2
    },
    chatgptImageJul132025062: {
        top: 31,
        left: 23
    },
    frameChild63: {
        width: 101,
        alignItems: "flex-end",
        left: 16,
        height: 13
    },
    chatgptImageJul7202510: {
        left: 126,
        height: 97,
        top: 1
    },
    trendingGames: {
        left: 145,
        fontSize: 24,
        lineHeight: 30,
        fontFamily: "Pixelify Sans",
        top: 8,
        fontWeight: "600"
    },
    chatgptImageJul132025063: {
        top: 70,
        left: 278,
        width: 110
    },
    chatgptImageJul132025064: {
        top: 21,
        left: 122,
        width: 19,
        opacity: 0.68,
        height: 20,
        position: "absolute"
    },
    chatgptImageJul132025065: {
        left: 155,
        width: 29,
        height: 30
    },
    chatgptImageJul132025066: {
        top: 89,
        left: 116,
        width: 37
    },
    winBigPrizes: {
        left: 203,
        fontSize: 9,
        lineHeight: 13,
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        top: 44
    },
    playWithFriends: {
        top: 59,
        left: 171,
        fontSize: 10,
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800"
    }
});

export default Quizess;
