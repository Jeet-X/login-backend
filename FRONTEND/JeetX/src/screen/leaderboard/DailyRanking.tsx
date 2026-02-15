import * as React from "react";
import { ScrollView, StyleSheet, Text, View, Image as RNImage } from "react-native";

const Image = (props: any) => <View {...props} style={[{ backgroundColor: 'rgba(255,255,255,0.1)' }, props.style]} ><RNImage {...props} style={{ display: 'none' }} /></View>;
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const DailyRanking = () => {

    return (
        <SafeAreaView style={styles.viewBg}>
            <View style={[styles.view, styles.viewLayout]}>
                <LinearGradient style={[styles.bg, styles.scrollviewFlexBox]} locations={[0, 1]} colors={['#02121a', '#0d3648']} useAngle={true} angle={-90}>
                    <ScrollView style={[styles.scrollview, styles.scrollviewFlexBox]} horizontal={true}>
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
                        <ScrollView style={[styles.frameParent, styles.mainBodyLayout]} horizontal={true} contentContainerStyle={styles.frameContainerContent}>
                            <View style={styles.frameWrapper}>
                                <View style={styles.appsFlexBox}>
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Text style={[styles.daily, styles.dailyTypo]}>Daily</Text>
                                </View>
                            </View>
                            <View style={styles.frameWrapper}>
                                <View style={[styles.appsUndefinedGlyphUndeGroup, styles.appsFlexBox]}>
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Text style={[styles.weeklyLeaderboard, styles.daily2Clr]}>Weekly Leaderboard</Text>
                                </View>
                            </View>
                            <View style={styles.frameWrapper}>
                                <View style={[styles.appsUndefinedGlyphUndeGroup, styles.appsFlexBox]}>
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Text style={[styles.monthly, styles.dailyTypo]}>Monthly</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </ScrollView>
                </LinearGradient>

                <View style={[styles.mainBody, styles.mainBodyLayout]}>
                    <View style={[styles.top3, styles.top3Border]}>
                        <LinearGradient style={[styles.top3Child, styles.top3ChildBorder]} locations={[0, 1]} colors={['#fff', 'rgba(236, 168, 20, 0.13)']} useAngle={true} angle={-88.34} />
                        <Text style={[styles.kirtarthPandey, styles.kirtarthTypo]}>Kirtarth Pandey</Text>
                        <Text style={[styles.kirtarthPandey2, styles.kirtarthTypo]}>Kirtarth Pandey</Text>
                        <Text style={[styles.radhikaSingh, styles.kirtarthTypo]}>Radhika Singh</Text>
                        <Text style={[styles.p, styles.pTypo]}>10,000 P</Text>
                        <Text style={[styles.p2, styles.pTypo]}>2,000 P</Text>
                        <Text style={[styles.p3, styles.pTypo]}>8,000 P</Text>
                        <View style={styles.groupParent}>
                            <Image style={styles.groupChild} resizeMode="cover" />
                            <View style={[styles.groupContainer, styles.groupLayout]}>
                                <Image style={[styles.groupItem, styles.groupLayout]} resizeMode="cover" />
                                <Text style={[styles.st, styles.stTypo]}>1st</Text>
                                <Image style={[styles.maskGroupIcon, styles.frameGroupLayout]} resizeMode="cover" />
                            </View>
                        </View>
                        <Image style={[styles.chatgptImageJul27202506, styles.chatgptLayout1]} resizeMode="cover" />
                        <Image style={[styles.chatgptImageJul272025062, styles.chatgptLayout1]} resizeMode="cover" />
                        <Image style={[styles.chatgptImageJul272025063, styles.chatgptLayout1]} resizeMode="cover" />
                        <View style={[styles.frameGroup, styles.frameGroupLayout]}>
                            <Image style={[styles.groupInner, styles.innerLayout]} resizeMode="cover" />
                            <View style={[styles.groupView, styles.groupParentLayout]}>
                                <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                                <Text style={[styles.nd, styles.ndTypo]}>2nd</Text>
                                <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                            </View>
                        </View>
                        <View style={[styles.frameParent2, styles.frameGroupLayout]}>
                            <Image style={[styles.groupInner, styles.innerLayout]} resizeMode="cover" />
                            <View style={[styles.groupView, styles.groupParentLayout]}>
                                <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                                <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                                <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                            </View>
                        </View>
                        <Image style={[styles.chatgptImageJul272025064, styles.chatgptLayout]} resizeMode="cover" />
                        <Image style={[styles.chatgptImageJul272025065, styles.chatgptLayout]} resizeMode="cover" />
                    </View>
                    <View style={[styles.stParent, styles.stParentPosition]}>
                        <View style={[styles.st2, styles.st2Layout]}>
                            <View style={[styles.stChild, styles.st10Layout]} />
                            <LinearGradient style={[styles.stItem, styles.stItemPosition]} locations={[0, 1]} colors={['rgba(255, 255, 255, 0.42)', 'rgba(236, 168, 20, 0.42)']} useAngle={true} angle={-90} />
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <View style={[styles.groupParent3, styles.groupParentPosition]}>
                                <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                                <Text style={[styles.st3, styles.st3Position]}>1st</Text>
                                <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                            </View>
                            <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                                <Text style={styles.kirtarthTypo}>Kirtarth...</Text>
                                <Text style={[styles.text, styles.textTypo]}>#1</Text>
                            </View>
                            <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                                <Text style={[styles.points, styles.kirtarthTypo]}>Points</Text>
                                <Text style={[styles.text, styles.textTypo]}>11000</Text>
                            </View>
                            <View style={[styles.totalPrizeWonParent, styles.totalParentPosition]}>
                                <Text style={[styles.totalPrizeWon, styles.kirtarthTypo]}>Total Prize Won</Text>
                                <Text style={[styles.text3, styles.text3Position]}>18,000</Text>
                                <Image style={[styles.chatgptImageOct2202511, styles.text3Position]} resizeMode="cover" />
                            </View>
                        </View>
                        <View style={[styles.st4, styles.st2Layout]}>
                            <View style={[styles.stChild, styles.st10Layout]} />
                            <LinearGradient style={[styles.stItem, styles.stItemPosition]} locations={[0, 1]} colors={['rgba(255, 255, 255, 0.68)', 'rgba(167, 167, 167, 0.68)']} useAngle={true} angle={-90} />
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                                <Text style={styles.kirtarthTypo}>Radhika</Text>
                                <Text style={[styles.text, styles.textTypo]}>#2</Text>
                            </View>
                            <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                                <Text style={[styles.points, styles.kirtarthTypo]}>Points</Text>
                                <Text style={[styles.text, styles.textTypo]}>10000</Text>
                            </View>
                            <View style={[styles.totalPrizeWonParent, styles.totalParentPosition]}>
                                <Text style={[styles.totalPrizeWon, styles.kirtarthTypo]}>Total Prize Won</Text>
                                <Text style={[styles.text6, styles.text6Position]}>15,000</Text>
                                <Image style={[styles.chatgptImageOct22025112, styles.text6Position]} resizeMode="cover" />
                            </View>
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <View style={[styles.groupParent3, styles.groupParentPosition]}>
                                <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                                <Text style={[styles.nd, styles.ndTypo]}>2nd</Text>
                                <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                            </View>
                        </View>
                        <View style={[styles.st5, styles.st2Layout]}>
                            <View style={[styles.stChild, styles.st10Layout]} />
                            <LinearGradient style={[styles.stItem, styles.stItemPosition]} locations={[0, 1]} colors={['rgba(255, 255, 255, 0.54)', 'rgba(183, 118, 32, 0.54)']} useAngle={true} angle={-90} />
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                                <Text style={styles.kirtarthTypo}>Satyam</Text>
                                <Text style={[styles.text, styles.textTypo]}>#3</Text>
                            </View>
                            <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                                <Text style={[styles.points, styles.kirtarthTypo]}>Points</Text>
                                <Text style={[styles.text, styles.textTypo]}>9000</Text>
                            </View>
                            <View style={[styles.totalPrizeWonParent, styles.totalParentPosition]}>
                                <Text style={[styles.totalPrizeWon, styles.kirtarthTypo]}>Total Prize Won</Text>
                                <Text style={[styles.text3, styles.text3Position]}>10,000</Text>
                                <Image style={[styles.chatgptImageOct2202511, styles.text3Position]} resizeMode="cover" />
                            </View>
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <View style={[styles.groupParent3, styles.groupParentPosition]}>
                                <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                                <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                                <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                            </View>
                        </View>
                        <View style={[styles.st6, styles.st6Border]}>
                            <View style={[styles.stChild, styles.st10Layout]} />
                            <View style={[styles.stChild10, styles.stItemPosition]} />
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <View style={[styles.groupParent6, styles.groupParentPosition]}>
                                <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                                <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                                <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                            </View>
                            <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                                <Text style={styles.kirtarthTypo}>PK</Text>
                                <Text style={[styles.text, styles.textTypo]}>#4</Text>
                            </View>
                            <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                                <Text style={[styles.points, styles.kirtarthTypo]}>Points</Text>
                                <Text style={[styles.text, styles.textTypo]}>5000</Text>
                            </View>
                            <View style={[styles.totalPrizeWonParent, styles.totalParentPosition]}>
                                <Text style={[styles.totalPrizeWon, styles.kirtarthTypo]}>Total Prize Won</Text>
                                <Text style={[styles.text3, styles.text3Position]}>6,000</Text>
                                <Image style={[styles.chatgptImageOct2202511, styles.text3Position]} resizeMode="cover" />
                            </View>
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                        </View>
                        <View style={[styles.st6, styles.st6Border]}>
                            <View style={[styles.stChild, styles.st10Layout]} />
                            <View style={[styles.stChild10, styles.stItemPosition]} />
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <View style={[styles.groupParent6, styles.groupParentPosition]}>
                                <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                                <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                                <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                            </View>
                            <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                                <Text style={styles.kirtarthTypo}>Radhe ..</Text>
                                <Text style={[styles.text, styles.textTypo]}>#4</Text>
                            </View>
                            <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                                <Text style={[styles.points, styles.kirtarthTypo]}>Points</Text>
                                <Text style={[styles.text, styles.textTypo]}>4500</Text>
                            </View>
                            <View style={[styles.totalPrizeWonParent, styles.totalParentPosition]}>
                                <Text style={[styles.totalPrizeWon, styles.kirtarthTypo]}>Total Prize Won</Text>
                                <Text style={[styles.text3, styles.text3Position]}>5,740</Text>
                                <Image style={[styles.chatgptImageOct2202511, styles.text3Position]} resizeMode="cover" />
                            </View>
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                        </View>
                        <View style={[styles.st6, styles.st6Border]}>
                            <View style={[styles.stChild, styles.st10Layout]} />
                            <View style={[styles.stChild10, styles.stItemPosition]} />
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <View style={[styles.groupParent6, styles.groupParentPosition]}>
                                <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                                <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                                <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                            </View>
                            <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                                <Text style={styles.kirtarthTypo}>Player1</Text>
                                <Text style={[styles.text, styles.textTypo]}>#4</Text>
                            </View>
                            <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                                <Text style={[styles.points, styles.kirtarthTypo]}>Points</Text>
                                <Text style={[styles.text, styles.textTypo]}>3700</Text>
                            </View>
                            <View style={[styles.totalPrizeWonParent, styles.totalParentPosition]}>
                                <Text style={[styles.totalPrizeWon, styles.kirtarthTypo]}>Total Prize Won</Text>
                                <Text style={[styles.text3, styles.text3Position]}>5,700</Text>
                                <Image style={[styles.chatgptImageOct2202511, styles.text3Position]} resizeMode="cover" />
                            </View>
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                        </View>
                        <View style={[styles.st6, styles.st6Border]}>
                            <View style={[styles.stChild, styles.st10Layout]} />
                            <View style={[styles.stChild10, styles.stItemPosition]} />
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                            <View style={[styles.groupParent6, styles.groupParentPosition]}>
                                <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                                <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                                <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                            </View>
                            <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                                <Text style={styles.kirtarthTypo}>S8ajb</Text>
                                <Text style={[styles.text, styles.textTypo]}>#4</Text>
                            </View>
                            <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                                <Text style={[styles.points, styles.kirtarthTypo]}>Points</Text>
                                <Text style={[styles.text, styles.textTypo]}>3500</Text>
                            </View>
                            <View style={[styles.totalPrizeWonParent, styles.totalParentPosition]}>
                                <Text style={[styles.totalPrizeWon, styles.kirtarthTypo]}>Total Prize Won</Text>
                                <Text style={[styles.text3, styles.text3Position]}>5,500</Text>
                                <Image style={[styles.chatgptImageOct2202511, styles.text3Position]} resizeMode="cover" />
                            </View>
                            <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                        </View>
                    </View>
                    <View style={[styles.st10, styles.st6Border]}>
                        <View style={[styles.stChild, styles.st10Layout]} />
                        <View style={[styles.stChild10, styles.stItemPosition]} />
                        <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                        <View style={[styles.groupParent6, styles.groupParentPosition]}>
                            <Image style={[styles.groupChild2, styles.groupParentLayout]} resizeMode="cover" />
                            <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                            <Image style={[styles.maskGroupIcon2, styles.groupPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                            <Text style={styles.kirtarthTypo}>{`<Termi>`}</Text>
                            <Text style={[styles.text, styles.textTypo]}>#4</Text>
                        </View>
                        <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                            <Text style={[styles.points, styles.kirtarthTypo]}>Points</Text>
                            <Text style={[styles.text, styles.textTypo]}>3800</Text>
                        </View>
                        <View style={[styles.totalPrizeWonParent6, styles.totalParentPosition]}>
                            <Text style={styles.kirtarthTypo}>Total Prize Won</Text>
                            <Text style={[styles.text, styles.textTypo]}>₹5,000</Text>
                        </View>
                        <Image style={[styles.stInner, styles.st3Position]} resizeMode="cover" />
                    </View>

                    <View style={[styles.categories, styles.top3ChildBorder]}>
                        <View style={[styles.filterParent, styles.groupParentPosition]}>
                            <Text style={[styles.filter, styles.filterPosition]}>Filter</Text>
                            <Image style={[styles.filterUndefinedGlyphUn, styles.filterPosition]} resizeMode="cover" />
                        </View>
                        <Text style={[styles.dailyRanking2, styles.textTypo]}>Daily Ranking</Text>
                        <Image style={[styles.chatgptImageJul272025066, styles.stParentPosition]} resizeMode="cover" />
                    </View>
                </View>
                <View style={[styles.child, styles.childPosition]} />
                <LinearGradient style={[styles.bg2, styles.scrollviewFlexBox]} locations={[0, 1]} colors={['#02121a', '#0d3648']} useAngle={true} angle={-90}>
                    <ScrollView style={[styles.scrollview2, styles.scrollviewFlexBox]} horizontal={true}>
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
                        <ScrollView style={[styles.frameParent, styles.mainBodyLayout]} horizontal={true} contentContainerStyle={styles.frameContainer34Content}>
                            <View style={styles.frameWrapper}>
                                <View style={styles.appsFlexBox}>
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Text style={[styles.daily2, styles.daily2Typo]}>Daily</Text>
                                </View>
                            </View>
                            <View style={styles.frameWrapper}>
                                <View style={[styles.appsUndefinedGlyphUndeGroup, styles.appsFlexBox]}>
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Text style={[styles.weekly, styles.daily2Typo]}>{`Weekly `}</Text>
                                </View>
                            </View>
                            <View style={styles.frameWrapper}>
                                <View style={[styles.appsUndefinedGlyphUndeGroup, styles.appsFlexBox]}>
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Text style={[styles.weekly, styles.daily2Typo]}>Monthly</Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={[styles.bgChild40, styles.childPosition]} />
                    </ScrollView>
                </LinearGradient>
            </View>
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    frameContainerContent: {
        flexDirection: "row",
        paddingHorizontal: 0,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    frameContainer34Content: {
        flexDirection: "row",
        paddingHorizontal: 0,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        gap: 39
    },
    dailyRanking: {
        flex: 1,
        backgroundColor: "#f4f6f6"
    },
    viewLayout: {
        overflow: "hidden",
        width: "100%"
    },
    scrollviewFlexBox: {
        maxWidth: 393,
        flexGrow: 0,
        flex: 1
    },
    childLayout: {
        height: 58,
        width: 28,
        top: 1,
        position: "absolute"
    },
    mainBodyLayout: {
        width: 393,
        position: "absolute"
    },
    dailyTypo: {
        textAlign: "left",
        lineHeight: 20,
        color: "#728181",
        fontSize: 14
    },
    appsFlexBox: {
        gap: 6,
        alignItems: "center",
        flexDirection: "row"
    },
    daily2Clr: {
        color: "#f4f6f6",
        fontSize: 16
    },
    leftSideLayout: {
        height: 21,
        width: 54,
        left: "50%",
        position: "absolute"
    },
    rightSidePosition: {
        height: 13,
        left: "50%",
        position: "absolute"
    },
    iconPosition: {
        height: 12,
        left: "50%",
        top: 1,
        position: "absolute"
    },
    top3Border: {
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#fff"
    },
    top3ChildBorder: {
        borderColor: "#ebebeb",
        borderStyle: "solid",
        position: "absolute"
    },
    kirtarthTypo: {
        color: "#646c6d",
        fontFamily: "Roboto-BoldItalic",
        fontStyle: "italic",
        lineHeight: 16,
        fontSize: 12,
        fontWeight: "600",
        textAlign: "left"
    },
    pTypo: {
        color: "#e06200",
        top: 113,
        fontFamily: "Roboto-BoldItalic",
        fontStyle: "italic",
        lineHeight: 16,
        fontSize: 12,
        left: "50%",
        fontWeight: "600",
        textAlign: "left",
        position: "absolute"
    },
    groupLayout: {
        height: 37,
        width: 37
    },
    stTypo: {
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        color: "#fff",
        textAlign: "left"
    },
    frameGroupLayout: {
        width: 58,
        position: "absolute"
    },
    chatgptLayout1: {
        width: 20,
        height: 20
    },
    innerLayout: {
        height: 48,
        width: 48
    },
    groupParentLayout: {
        height: 26,
        width: 26
    },
    ndTypo: {
        lineHeight: 8,
        fontSize: 8,
        top: 9,
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        color: "#fff",
        textAlign: "left",
        position: "absolute"
    },
    groupPosition: {
        top: 2,
        position: "absolute"
    },
    chatgptLayout: {
        height: 90,
        width: 90,
        top: -29,
        position: "absolute"
    },
    stParentPosition: {
        left: 16,
        position: "absolute"
    },
    st2Layout: {
        borderRadius: 12,

        height: 66,
        borderWidth: 1,
        borderStyle: "solid",
        elevation: 4,
        alignSelf: "stretch",
        overflow: "hidden"
    },
    st10Layout: {
        width: 363,
        position: "absolute"
    },
    stItemPosition: {
        height: 64,
        left: -1,
        top: 0,
        position: "absolute"
    },
    st3Position: {
        top: 8,
        position: "absolute"
    },
    groupParentPosition: {
        top: 6,
        position: "absolute"
    },
    parentSpaceBlock: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        gap: 6
    },
    textTypo: {
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        textAlign: "left"
    },
    totalParentPosition: {
        left: 255,
        marginTop: -26,
        top: "50%",
        position: "absolute"
    },
    text3Position: {
        top: 26,
        position: "absolute"
    },
    text6Position: {
        top: 25,
        position: "absolute"
    },
    st6Border: {
        borderColor: "#eaeaea",
        borderRadius: 12,
        height: 66,
        borderWidth: 1,
        borderStyle: "solid",
        overflow: "hidden"
    },
    bottomNavPosition: {
        bottom: 0,
        height: 68,
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
    events2Typo: {
        color: "#8d9f9f",
        fontSize: 11,
        top: 44,
        lineHeight: 8,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
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
    filterPosition: {
        top: 10,
        position: "absolute"
    },
    childPosition: {
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        backgroundColor: "#fff",
        left: "50%",
        position: "absolute"
    },
    daily2Typo: {
        fontFamily: "OpenSans-Regular",
        textAlign: "left",
        lineHeight: 20
    },
    viewBg: {
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    view: {
        height: 873,
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    bg: {
        backgroundColor: "transparent",
        top: 41,
        left: 0,
        position: "absolute",
        width: "100%",
        flexGrow: 0
    },
    scrollview: {
        backgroundColor: "transparent",
        width: "100%",
        flexGrow: 0
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
    frameParent: {
        marginTop: -21.5,
        top: "50%",
        maxWidth: 393,
        flexGrow: 0,
        flex: 1,
        left: 0
    },
    frameWrapper: {
        paddingHorizontal: 14,
        paddingVertical: 8
    },
    appsUndefinedGlyphUnde: {
        height: 24,
        width: 24,
        display: "none"
    },
    daily: {
        fontWeight: "700",
        fontFamily: "Montserrat-Bold"
    },
    appsUndefinedGlyphUndeGroup: {
        alignSelf: "stretch"
    },
    weeklyLeaderboard: {
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        color: "#f4f6f6",
        fontSize: 16,
        textAlign: "left",
        lineHeight: 20
    },
    monthly: {
        fontWeight: "500",
        fontFamily: "Montserrat-Medium"
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
        position: "absolute"
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
        width: 54,
        fontWeight: "600",
        fontSize: 16,
        top: 1,
        left: 0,
        position: "absolute"
    },
    rightSide: {
        marginLeft: 92.5,
        top: 19,
        width: 77
    },
    statusbarBattery: {
        marginLeft: 11.3,
        width: 27,
        top: 0
    },
    outlineIcon: {
        marginTop: -6.5,
        right: 2,
        borderRadius: 4,
        opacity: 0.35,
        maxWidth: "100%",
        height: 13,
        top: "50%",
        left: 0,
        position: "absolute",
        overflow: "hidden"
    },
    batteryEndIcon: {
        marginTop: -1.5,
        right: 0,
        width: 1,
        opacity: 0.4,
        height: 4,
        top: "50%",
        position: "absolute"
    },
    fillIcon: {
        marginTop: -4.5,
        right: 10,
        borderRadius: 2,
        height: 9,
        left: 2,
        maxWidth: "100%",
        top: "50%",
        position: "absolute",
        overflow: "hidden"
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
        top: 100,
        height: 773,
        left: 0
    },
    top3: {
        top: 51,

        borderColor: "#e2d5b8",
        height: 154,
        borderBottomLeftRadius: 56,
        borderBottomRightRadius: 56,
        elevation: 4,
        borderWidth: 1,
        borderStyle: "solid",
        width: 393,
        left: 0,
        position: "absolute",
        overflow: "hidden"
    },
    top3Child: {
        width: 395,
        height: 156,
        left: -1,
        top: -1,
        borderColor: "#ebebeb",
        borderWidth: 1,
        borderBottomLeftRadius: 56,
        borderBottomRightRadius: 56,
        backgroundColor: "transparent"
    },
    kirtarthPandey: {
        marginLeft: -48.5,
        top: 97,
        fontFamily: "Roboto-BoldItalic",
        fontStyle: "italic",
        lineHeight: 16,
        fontSize: 12,
        left: "50%",
        position: "absolute"
    },
    kirtarthPandey2: {
        marginLeft: 76.5,
        top: 97,
        fontFamily: "Roboto-BoldItalic",
        fontStyle: "italic",
        lineHeight: 16,
        fontSize: 12,
        left: "50%",
        position: "absolute"
    },
    radhikaSingh: {
        marginLeft: -166.5,
        top: 97,
        fontFamily: "Roboto-BoldItalic",
        fontStyle: "italic",
        lineHeight: 16,
        fontSize: 12,
        left: "50%",
        position: "absolute"
    },
    p: {
        marginLeft: -20.5
    },
    p2: {
        marginLeft: 108.5
    },
    p3: {
        marginLeft: -138.5
    },
    groupParent: {
        top: 20,
        width: 82,
        height: 71,
        left: 155,
        position: "absolute"
    },
    groupChild: {
        width: 68,
        height: 68,
        top: 3,
        left: 0,
        position: "absolute"
    },
    groupContainer: {
        left: 45,
        top: 0,
        position: "absolute"
    },
    groupItem: {
        top: 0,
        left: 0,
        position: "absolute"
    },
    st: {
        top: 11,
        left: 8,
        lineHeight: 14,
        fontSize: 14,
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        position: "absolute"
    },
    maskGroupIcon: {
        left: 40,
        top: 3,
        width: 58,
        display: "none",
        height: 58
    },
    chatgptImageJul27202506: {
        top: 111,
        width: 20,
        position: "absolute",
        left: 155
    },
    chatgptImageJul272025062: {
        left: 284,
        top: 111,
        width: 20,
        position: "absolute"
    },
    chatgptImageJul272025063: {
        left: 37,
        top: 111,
        width: 20,
        position: "absolute"
    },
    frameGroup: {
        height: 50,
        left: 44,
        top: 41
    },
    groupInner: {
        top: 2,
        position: "absolute",
        left: 0
    },
    groupView: {
        left: 32,
        top: 0,
        position: "absolute"
    },
    groupChild2: {
        top: 0,
        left: 0,
        position: "absolute"
    },
    nd: {
        left: 5
    },
    maskGroupIcon2: {
        width: 41,
        height: 41,
        left: 28,
        display: "none"
    },
    frameParent2: {
        left: 290,
        height: 50,
        top: 41
    },
    rd: {
        left: 6
    },
    chatgptImageJul272025064: {
        left: -26
    },
    chatgptImageJul272025065: {
        left: 331
    },
    stParent: {
        top: 221,
        width: 361,
        gap: 8
    },
    st2: {
        borderColor: "#d98600"
    },
    stChild: {
        borderRadius: 10,
        borderColor: "#b55252",
        height: 66,
        width: 363,
        left: -1,
        top: -1,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#fff"
    },
    stItem: {
        width: 144,
        backgroundColor: "transparent"
    },
    stInner: {
        left: 12,
        height: 48,
        width: 48
    },
    groupParent3: {
        height: 26,
        width: 26,
        left: 44
    },
    st3: {
        fontSize: 10,
        lineHeight: 10,
        left: 6,
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        color: "#fff",
        textAlign: "left"
    },
    kirtarthParent: {
        left: 88,
        marginTop: -26,
        paddingHorizontal: 6,
        top: "50%",
        position: "absolute"
    },
    text: {
        fontSize: 15,
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        lineHeight: 20
    },
    pointsParent: {
        left: 170,
        marginTop: -26,
        paddingHorizontal: 6,
        top: "50%",
        position: "absolute"
    },
    points: {
        alignSelf: "stretch"
    },
    totalPrizeWonParent: {
        width: 94,
        height: 50
    },
    totalPrizeWon: {
        top: 4,
        left: 6,
        position: "absolute"
    },
    text3: {
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        textAlign: "left",
        fontSize: 15,
        lineHeight: 20,
        left: 28
    },
    chatgptImageOct2202511: {
        left: 6,
        width: 20,
        height: 20
    },
    st4: {
        borderColor: "#c5c5c5"
    },
    text6: {
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        textAlign: "left",
        fontSize: 15,
        lineHeight: 20,
        left: 28
    },
    chatgptImageOct22025112: {
        left: 6,
        width: 20,
        height: 20
    },
    st5: {
        borderColor: "#ac8e66"
    },
    st6: {
        alignSelf: "stretch"
    },
    stChild10: {
        width: 112
    },
    groupParent6: {
        height: 26,
        width: 26,
        left: 44,
        display: "none"
    },
    st10: {
        top: 687,
        left: 15,
        width: 363,
        position: "absolute",
        display: "none"
    },
    totalPrizeWonParent6: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        gap: 6
    },
    unionIcon: {

    },
    leaderboard: {
        marginTop: -34,
        marginLeft: -192.5,
        left: "50%",
        top: "50%"
    },
    leaderboard2: {
        color: "#008d9d",
        fontSize: 11,
        top: 44,
        lineHeight: 8,
        left: 2,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        position: "absolute"
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

        height: 34,
        width: 37,
        top: 3,
        position: "absolute"
    },
    categories: {

        borderBottomWidth: 1,
        height: 52,
        borderColor: "#ebebeb",
        backgroundColor: "#fff",
        left: "50%",
        top: 0,
        marginLeft: -196.5,
        width: 393,
        overflow: "hidden"
    },
    filterParent: {
        borderRadius: 6,
        borderColor: "#e9e9e9",
        width: 89,
        height: 40,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#fff",
        left: 294
    },
    filter: {
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        textAlign: "left",
        fontSize: 15,
        lineHeight: 20,
        left: 40
    },
    filterUndefinedGlyphUn: {
        left: 14,
        width: 20,
        height: 20
    },
    dailyRanking2: {
        left: 59,
        fontSize: 20,
        lineHeight: 24,
        top: 14,
        position: "absolute"
    },
    chatgptImageJul272025066: {
        top: 7,
        height: 37,
        width: 37
    },
    child: {
        marginLeft: -101.5,
        top: 93,
        width: 179,
        height: 7
    },
    bg2: {
        top: 42,
        left: "50%",
        marginLeft: -196.5,
        backgroundColor: "transparent",
        position: "absolute",
        width: "100%",
        flexGrow: 0
    },
    scrollview2: {
        marginLeft: -196.5,
        backgroundColor: "transparent",
        width: "100%",
        flexGrow: 0
    },
    daily2: {
        color: "#f4f6f6",
        fontSize: 16,
        fontFamily: "OpenSans-Regular"
    },
    weekly: {
        fontFamily: "OpenSans-Regular",
        color: "#728181",
        fontSize: 14
    },
    bgChild40: {
        marginLeft: -154.5,
        top: 55,
        width: 78,
        height: 4
    }
});

export default DailyRanking;
