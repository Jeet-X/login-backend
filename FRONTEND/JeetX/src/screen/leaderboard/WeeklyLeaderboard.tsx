import * as React from "react";
import { ScrollView, StyleSheet, Text, View, Image as RNImage } from "react-native";

const Image = (props: any) => <View {...props} style={[{ backgroundColor: 'rgba(255,255,255,0.1)' }, props.style]} ><RNImage {...props} style={{ display: 'none' }} /></View>;
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const WeeklyLeaderboard = () => {

    return (
        <SafeAreaView style={styles.viewBg}>
            <View style={[styles.view, styles.viewLayout]}>
                <LinearGradient style={[styles.bg, styles.bgFlexBox]} locations={[0, 1]} colors={['#02121a', '#0d3648']} useAngle={true} angle={-90}>
                    <ScrollView style={[styles.scrollview, styles.bgFlexBox]} horizontal={true}>
                        <Image style={[styles.bgChild, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgItem, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.bgInner, styles.childLayout]} resizeMode="cover" />
                        <Image style={[styles.groupIcon, styles.childLayout]} resizeMode="cover" />
                        <Image style={styles.bgChild2} resizeMode="cover" />
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
                        <ScrollView style={[styles.frameParent, styles.mainBodyPosition]} horizontal={true} contentContainerStyle={styles.frameContainerContent}>
                            <View style={styles.frameWrapper}>
                                <View style={styles.appsFlexBox}>
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Text style={styles.daily}>Daily</Text>
                                </View>
                            </View>
                            <View style={styles.frameWrapper}>
                                <View style={[styles.appsUndefinedGlyphUndeGroup, styles.appsFlexBox]}>
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Text style={[styles.weeklyLeaderboard2, styles.monthlyTypo]}>Weekly Leaderboard</Text>
                                </View>
                            </View>
                            <View style={styles.frameWrapper}>
                                <View style={[styles.appsUndefinedGlyphUndeGroup, styles.appsFlexBox]}>
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Image style={styles.appsUndefinedGlyphUnde} resizeMode="cover" />
                                    <Text style={[styles.monthly, styles.monthlyTypo]}>Monthly</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </ScrollView>
                </LinearGradient>

                <View style={[styles.mainBody, styles.mainBodyPosition]}>

                    <View style={[styles.st, styles.stLayout]}>
                        <View style={styles.stChild} />
                        <LinearGradient style={[styles.stItem, styles.stItemPosition]} locations={[0, 1]} colors={['#fff', '#eca814']} useAngle={true} angle={-90} />
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.groupParent, styles.groupParentLayout]}>
                            <Image style={[styles.groupChild, styles.groupParentLayout]} resizeMode="cover" />
                            <Text style={styles.st2}>1st</Text>
                            <Image style={[styles.maskGroupIcon, styles.maskGroupIconPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Kirtarth...</Text>
                            <Text style={[styles.text, styles.textTypo]}>#1</Text>
                        </View>
                        <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                            <Text style={[styles.points, styles.pointsTypo]}>Points</Text>
                            <Text style={[styles.text, styles.textTypo]}>11000</Text>
                        </View>
                        <View style={[styles.totalPrizeWonParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Total Prize Won</Text>
                            <Text style={[styles.text, styles.textTypo]}>₹18,000</Text>
                        </View>
                    </View>
                    <View style={[styles.st3, styles.stLayout]}>
                        <View style={styles.stChild} />
                        <LinearGradient style={[styles.stItem, styles.stItemPosition]} locations={[0, 1]} colors={['#fff', '#a7a7a7']} useAngle={true} angle={-90} />
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Radhika</Text>
                            <Text style={[styles.text, styles.textTypo]}>#2</Text>
                        </View>
                        <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                            <Text style={[styles.points, styles.pointsTypo]}>Points</Text>
                            <Text style={[styles.text, styles.textTypo]}>10000</Text>
                        </View>
                        <View style={[styles.totalPrizeWonParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Total Prize Won</Text>
                            <Text style={[styles.text, styles.textTypo]}>₹15,000</Text>
                        </View>
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.groupParent, styles.groupParentLayout]}>
                            <Image style={[styles.groupChild, styles.groupParentLayout]} resizeMode="cover" />
                            <Text style={[styles.nd, styles.ndTypo]}>2nd</Text>
                            <Image style={[styles.maskGroupIcon, styles.maskGroupIconPosition]} resizeMode="cover" />
                        </View>
                    </View>
                    <View style={[styles.st4, styles.stLayout]}>
                        <View style={styles.stChild} />
                        <LinearGradient style={[styles.stItem, styles.stItemPosition]} locations={[0, 1]} colors={['#fff', '#85520f']} useAngle={true} angle={-90} />
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Satyam</Text>
                            <Text style={[styles.text, styles.textTypo]}>#3</Text>
                        </View>
                        <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                            <Text style={[styles.points, styles.pointsTypo]}>Points</Text>
                            <Text style={[styles.text, styles.textTypo]}>9000</Text>
                        </View>
                        <View style={[styles.totalPrizeWonParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Total Prize Won</Text>
                            <Text style={[styles.text, styles.textTypo]}>₹10,000</Text>
                        </View>
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.groupParent, styles.groupParentLayout]}>
                            <Image style={[styles.groupChild, styles.groupParentLayout]} resizeMode="cover" />
                            <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                            <Image style={[styles.maskGroupIcon, styles.maskGroupIconPosition]} resizeMode="cover" />
                        </View>
                    </View>
                    <View style={[styles.st5, styles.st5Border]}>
                        <View style={styles.stChild} />
                        <View style={[styles.stChild9, styles.stItemPosition]} />
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.groupParent2, styles.groupParentLayout]}>
                            <Image style={[styles.groupChild, styles.groupParentLayout]} resizeMode="cover" />
                            <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                            <Image style={[styles.maskGroupIcon, styles.maskGroupIconPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>PK</Text>
                            <Text style={[styles.text, styles.textTypo]}>#4</Text>
                        </View>
                        <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                            <Text style={[styles.points, styles.pointsTypo]}>Points</Text>
                            <Text style={[styles.text, styles.textTypo]}>5000</Text>
                        </View>
                        <View style={[styles.totalPrizeWonParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Total Prize Won</Text>
                            <Text style={[styles.text, styles.textTypo]}>₹6,101.01</Text>
                        </View>
                    </View>
                    <Image style={[styles.mainBodyChild, styles.maskGroupIconPosition]} resizeMode="cover" />
                    <View style={[styles.st6, styles.st5Border]}>
                        <View style={styles.stChild} />
                        <View style={[styles.stChild9, styles.stItemPosition]} />
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.groupParent2, styles.groupParentLayout]}>
                            <Image style={[styles.groupChild, styles.groupParentLayout]} resizeMode="cover" />
                            <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                            <Image style={[styles.maskGroupIcon, styles.maskGroupIconPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Radhe ..</Text>
                            <Text style={[styles.text, styles.textTypo]}>#4</Text>
                        </View>
                        <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                            <Text style={[styles.points, styles.pointsTypo]}>Points</Text>
                            <Text style={[styles.text, styles.textTypo]}>4500</Text>
                        </View>
                        <View style={[styles.totalPrizeWonParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Total Prize Won</Text>
                            <Text style={[styles.text, styles.textTypo]}>₹5,740</Text>
                        </View>
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                    </View>
                    <View style={[styles.st7, styles.st5Border]}>
                        <View style={styles.stChild} />
                        <View style={[styles.stChild9, styles.stItemPosition]} />
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.groupParent2, styles.groupParentLayout]}>
                            <Image style={[styles.groupChild, styles.groupParentLayout]} resizeMode="cover" />
                            <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                            <Image style={[styles.maskGroupIcon, styles.maskGroupIconPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Player1</Text>
                            <Text style={[styles.text, styles.textTypo]}>#4</Text>
                        </View>
                        <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                            <Text style={[styles.points, styles.pointsTypo]}>Points</Text>
                            <Text style={[styles.text, styles.textTypo]}>3700</Text>
                        </View>
                        <View style={[styles.totalPrizeWonParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Total Prize Won</Text>
                            <Text style={[styles.text, styles.textTypo]}>₹5,700</Text>
                        </View>
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                    </View>
                    <View style={[styles.st8, styles.st5Border]}>
                        <View style={styles.stChild} />
                        <View style={[styles.stChild9, styles.stItemPosition]} />
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.groupParent2, styles.groupParentLayout]}>
                            <Image style={[styles.groupChild, styles.groupParentLayout]} resizeMode="cover" />
                            <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                            <Image style={[styles.maskGroupIcon, styles.maskGroupIconPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>S8ajb</Text>
                            <Text style={[styles.text, styles.textTypo]}>#4</Text>
                        </View>
                        <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                            <Text style={[styles.points, styles.pointsTypo]}>Points</Text>
                            <Text style={[styles.text, styles.textTypo]}>3500</Text>
                        </View>
                        <View style={[styles.totalPrizeWonParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Total Prize Won</Text>
                            <Text style={[styles.text, styles.textTypo]}>₹5,500</Text>
                        </View>
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                    </View>
                    <View style={[styles.st9, styles.st5Border]}>
                        <View style={styles.stChild} />
                        <View style={[styles.stChild9, styles.stItemPosition]} />
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                        <View style={[styles.groupParent2, styles.groupParentLayout]}>
                            <Image style={[styles.groupChild, styles.groupParentLayout]} resizeMode="cover" />
                            <Text style={[styles.rd, styles.ndTypo]}>3rd</Text>
                            <Image style={[styles.maskGroupIcon, styles.maskGroupIconPosition]} resizeMode="cover" />
                        </View>
                        <View style={[styles.kirtarthParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>{`<Termi>`}</Text>
                            <Text style={[styles.text, styles.textTypo]}>#4</Text>
                        </View>
                        <View style={[styles.pointsParent, styles.parentSpaceBlock]}>
                            <Text style={[styles.points, styles.pointsTypo]}>Points</Text>
                            <Text style={[styles.text, styles.textTypo]}>3800</Text>
                        </View>
                        <View style={[styles.totalPrizeWonParent, styles.parentSpaceBlock]}>
                            <Text style={styles.pointsTypo}>Total Prize Won</Text>
                            <Text style={[styles.text, styles.textTypo]}>₹5,000</Text>
                        </View>
                        <Image style={[styles.stInner, styles.stInnerLayout]} resizeMode="cover" />
                    </View>
                    <View style={styles.categories}>
                        <View style={styles.filterParent}>
                            <Text style={[styles.filter, styles.filterPosition]}>Filter</Text>
                            <Image style={[styles.filterUndefinedGlyphUn, styles.filterPosition]} resizeMode="cover" />
                        </View>
                        <Text style={[styles.playersRanking, styles.textTypo]}>Players Ranking</Text>
                        <Image style={[styles.chatgptImageJul27202504, styles.groupParentLayout]} resizeMode="cover" />
                    </View>
                </View>
                <View style={styles.child} />
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
    weeklyLeaderboard: {
        flex: 1,
        backgroundColor: "#f4f6f6"
    },
    viewLayout: {
        overflow: "hidden",
        width: "100%"
    },
    bgFlexBox: {
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
    mainBodyPosition: {
        width: 393,
        left: 0,
        position: "absolute"
    },
    appsFlexBox: {
        gap: 6,
        alignItems: "center",
        flexDirection: "row"
    },
    monthlyTypo: {
        fontFamily: "OpenSans-Regular",
        textAlign: "left",
        lineHeight: 20
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
    bottomNavPosition: {
        height: 68,
        bottom: 0,
        width: 393,
        left: 0,
        position: "absolute"
    },
    eventsLayout: {
        width: 76,
        backgroundColor: "#fff",
        height: 68,
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
    stLayout: {
        height: 66,
        width: 363,
        borderWidth: 1,
        borderRadius: 12,
        elevation: 4,

        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
        left: 15,
        borderStyle: "solid",
        position: "absolute",
        overflow: "hidden"
    },
    stItemPosition: {
        height: 64,
        left: -1,
        top: 0,
        position: "absolute"
    },
    stInnerLayout: {
        height: 48,
        width: 48
    },
    groupParentLayout: {
        height: 26,
        position: "absolute"
    },
    maskGroupIconPosition: {
        left: 28,
        position: "absolute"
    },
    parentSpaceBlock: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        marginTop: -26,
        gap: 6,
        top: "50%",
        position: "absolute"
    },
    textTypo: {
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        textAlign: "left"
    },
    pointsTypo: {
        color: "#646c6d",
        fontFamily: "Roboto-BoldItalic",
        fontStyle: "italic",
        lineHeight: 16,
        fontSize: 12,
        fontWeight: "600",
        textAlign: "left"
    },
    ndTypo: {
        fontSize: 8,
        top: 9,
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        lineHeight: 8,
        color: "#fff",
        textAlign: "left",
        position: "absolute"
    },
    st5Border: {
        borderColor: "#eaeaea",
        height: 66,
        width: 363,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 12,
        left: 15,
        position: "absolute",
        overflow: "hidden"
    },
    filterPosition: {
        top: 10,
        position: "absolute"
    },
    viewBg: {
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    view: {
        height: 830,
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    bg: {
        top: 41,
        backgroundColor: "transparent",
        left: 0,
        position: "absolute",
        width: "100%",
        maxWidth: 393,
        flexGrow: 0
    },
    scrollview: {
        backgroundColor: "transparent",
        width: "100%",
        maxWidth: 393,
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
        left: 294,
        height: 58,
        width: 28,
        top: 1,
        position: "absolute"
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
        flex: 1
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
        fontFamily: "Montserrat-Bold",
        textAlign: "left",
        lineHeight: 20,
        color: "#728181",
        fontSize: 14
    },
    appsUndefinedGlyphUndeGroup: {
        alignSelf: "stretch"
    },
    weeklyLeaderboard2: {
        color: "#f4f6f6",
        fontSize: 16,
        fontFamily: "OpenSans-Regular"
    },
    monthly: {
        fontFamily: "OpenSans-Regular",
        color: "#728181",
        fontSize: 14
    },
    statusbar: {
        backgroundColor: "#010e0f",
        height: 42,
        left: "50%",
        top: 0,
        marginLeft: -196.5,
        width: 393,
        position: "absolute"
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
        fontWeight: "600",
        width: 54,
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
        height: 730
    },
    unionIcon: {
        elevation: 10,
        shadowColor: "rgba(0, 0, 0, 0.16)",
        shadowOffset: { width: 0, height: -1 },
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    leaderboard: {
        marginTop: -34,
        marginLeft: -192.5,
        left: "50%",
        top: "50%"
    },
    leaderboard2: {
        color: "#008d9d",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        top: 44,
        left: 2,
        textAlign: "center",
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
        top: 3,
        left: 1,
        elevation: 2,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: -2.5, height: -2.5 },
        shadowRadius: 1.78,
        shadowOpacity: 1,
        width: 37,
        height: 34,
        position: "absolute"
    },
    st: {
        top: 63,
        borderColor: "#d98600"
    },
    stChild: {
        top: -1,
        borderRadius: 10,
        borderColor: "#b55252",
        left: -1,
        height: 66,
        width: 363,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#fff",
        position: "absolute"
    },
    stItem: {
        width: 144,
        backgroundColor: "transparent"
    },
    stInner: {
        left: 12,
        top: 8,
        height: 48,
        width: 48,
        position: "absolute"
    },
    groupParent: {
        width: 26,
        height: 26,
        left: 44,
        top: 6
    },
    groupChild: {
        width: 26,
        height: 26,
        top: 0,
        left: 0
    },
    st2: {
        fontSize: 10,
        lineHeight: 10,
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        left: 6,
        top: 8,
        color: "#fff",
        textAlign: "left",
        position: "absolute"
    },
    maskGroupIcon: {
        top: 2,
        width: 41,
        height: 41,
        display: "none"
    },
    kirtarthParent: {
        left: 88
    },
    text: {
        fontSize: 15,
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        lineHeight: 20
    },
    pointsParent: {
        left: 170
    },
    points: {
        alignSelf: "stretch"
    },
    totalPrizeWonParent: {
        left: 255
    },
    st3: {
        top: 135,
        borderColor: "#c5c5c5"
    },
    nd: {
        left: 5
    },
    st4: {
        top: 207,
        borderColor: "#ac8e66"
    },
    rd: {
        left: 6,
        fontSize: 8,
        top: 9
    },
    st5: {
        top: 279
    },
    stChild9: {
        width: 112
    },
    groupParent2: {
        width: 26,
        height: 26,
        left: 44,
        top: 6,
        display: "none"
    },
    mainBodyChild: {
        top: 286,
        height: 48,
        width: 48
    },
    st6: {
        top: 351
    },
    st7: {
        top: 423
    },
    st8: {
        top: 495
    },
    st9: {
        top: 567
    },
    categories: {
        boxShadow: "inset 0px 0px 2px rgba(0, 0, 0, 0.2)",
        borderColor: "#ebebeb",
        borderBottomWidth: 1,
        height: 52,
        borderStyle: "solid",
        backgroundColor: "#fff",
        left: "50%",
        top: 0,
        marginLeft: -196.5,
        width: 393,
        position: "absolute",
        overflow: "hidden"
    },
    filterParent: {
        borderRadius: 6,
        borderColor: "#e9e9e9",
        width: 89,
        height: 40,
        top: 6,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#fff",
        left: 294,
        position: "absolute"
    },
    filter: {
        left: 40,
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        textAlign: "left",
        fontSize: 15,
        lineHeight: 20
    },
    filterUndefinedGlyphUn: {
        width: 20,
        left: 14,
        height: 20
    },
    playersRanking: {
        left: 48,
        fontSize: 20,
        lineHeight: 24,
        top: 14,
        position: "absolute"
    },
    chatgptImageJul27202504: {
        top: 13,
        left: 18,
        width: 22
    },
    child: {
        marginLeft: -92.5,
        top: 93,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        width: 170,
        height: 7,
        backgroundColor: "#fff",
        left: "50%",
        position: "absolute"
    }
});

export default WeeklyLeaderboard;
