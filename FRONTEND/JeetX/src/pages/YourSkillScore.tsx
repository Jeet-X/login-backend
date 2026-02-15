import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Mock Data for Skills
const SKILLS_DATA = [
    {
        id: '1',
        title: 'Maths Quiz Championship',
        score: 76,
        level: 'Pro',
        icon: 'calculator',
        iconColor: '#f97316',
        progress: 0.76
    },
    {
        id: '2',
        title: 'Puzzle Championship',
        score: 92,
        level: 'Expert',
        icon: 'puzzle-piece', // FontAwesome name
        iconColor: '#ef4444', // Red-ish
        progress: 0.92
    },
    {
        id: '3',
        title: 'Chess Championship',
        score: 56,
        level: 'Intermediate',
        icon: 'gamepad', // No chess icon in generic FontAwesome, using gamepad as placeholder
        iconColor: '#84cc16', // Greenish
        progress: 0.56
    },
];

const YourSkillScore = () => {
    const navigation = useNavigation();

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesome name="arrow-left" size={20} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Skill Score</Text>
            <View style={{ width: 24 }} />
        </View>
    );

    const renderUserCard = () => (
        <View style={styles.userCardContainer}>
            <LinearGradient
                colors={['#ffffff', '#fff7ed']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.userCard}
            >
                <View style={styles.userInfoRow}>
                    <View style={styles.avatarContainer}>
                        {/* Placeholder for the Hooded Avatar */}
                        <View style={styles.avatarPlaceholder}>
                            <FontAwesome name="user-secret" size={30} color="#000" />
                        </View>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>Rajvardhan Singh Rajput</Text>
                        <Text style={styles.prizeText}>
                            Total Prize Won <Text style={styles.prizeAmount}>₹18,000</Text>
                        </Text>

                        {/* Progress Bar Section */}
                        <View style={styles.progressSection}>
                            <View style={styles.progressBarBackground}>
                                <LinearGradient
                                    colors={['#f59e0b', '#d97706']}
                                    style={[styles.progressBarFill, { width: '70%' }]}
                                />
                            </View>
                            <View style={styles.rankIconContainer}>
                                <FontAwesome name="trophy" size={12} color="#b45309" />
                            </View>
                            <Text style={styles.pointsText}>10,000 P</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
            {/* Gradient Border Line effect at bottom of card if needed, or shadow handles it */}
        </View>
    );

    const renderSkillItem = ({ item }: { item: any }) => (
        <View style={styles.skillCard}>
            <View style={[styles.iconBox, { backgroundColor: item.iconColor + '15' }]}>
                <FontAwesome name={item.icon} size={20} color={item.iconColor} />
            </View>
            <View style={styles.skillContent}>
                <Text style={styles.skillTitle}>{item.title}</Text>

                {/* Segmented Progress Bar */}
                <View style={styles.skillProgressContainer}>
                    <View style={styles.skillProgressBarBg}>
                        <LinearGradient
                            colors={['#f59e0b', '#ea580c']}
                            style={[styles.skillProgressBarFill, { width: `${item.progress * 100}%` }]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.skillRightSide}>
                <Text style={styles.levelText}>{item.level}</Text>
                <View style={styles.scoreRow}>
                    <FontAwesome name="fire" size={12} color="#f97316" style={{ marginRight: 4 }} />
                    <Text style={styles.scoreText}>{item.score}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#02121a" />

            {/* Dark Header Background */}
            <View style={styles.darkHeaderBg}>
                <SafeAreaView edges={['top']}>
                    {renderHeader()}
                </SafeAreaView>
                {/* Extra space for the floating card overlap */}
                <View style={{ height: 60 }} />
            </View>

            <View style={styles.contentContainer}>
                {/* Floating User Card */}
                <View style={styles.floatingCardWrapper}>
                    {renderUserCard()}
                </View>

                <View style={styles.listHeaderRow}>
                    <Text style={styles.listTitle}>Skill Score</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={SKILLS_DATA}
                    renderItem={renderSkillItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>KEEP IT UP !</Text>
                            <Text style={styles.footerSubText}>NEW CHALLENGES AWAIT</Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    darkHeaderBg: {
        backgroundColor: '#02121a',
        paddingBottom: 20,
        zIndex: 1,
    },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        fontFamily: 'Montserrat-Bold',
    },
    contentContainer: {
        flex: 1,
        marginTop: -60, // Pull up to overlap header
        zIndex: 2,
    },
    floatingCardWrapper: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    userCardContainer: { // Copied style from RecentlyPlayed
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: '#ffffff',
    },
    userCard: { // Copied style
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#fff7ed',
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 16,
    },
    avatarPlaceholder: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#f59e0b',
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 4,
        fontFamily: 'Montserrat-Bold',
    },
    prizeText: {
        fontSize: 11,
        color: '#64748b',
        marginBottom: 8,
        fontStyle: 'italic',
        fontWeight: '500',
    },
    prizeAmount: {
        color: '#d97706',
        fontWeight: '700',
        fontStyle: 'normal',
    },
    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBarBackground: {
        flex: 1,
        height: 6,
        backgroundColor: '#e2e8f0',
        borderRadius: 3,
        marginRight: 8,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    rankIconContainer: {
        position: 'absolute',
        left: 0,
        top: -12,
        display: 'none',
    },
    pointsText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#ea580c',
    },
    listHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
        fontFamily: 'Montserrat-Bold',
    },
    viewAllText: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    skillCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    skillContent: {
        flex: 1,
        justifyContent: 'center',
    },
    skillTitle: {
        fontSize: 13, // Slightly smaller to fit progress bar
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 8,
        fontFamily: 'OpenSans-Bold',
    },
    skillProgressContainer: {
        width: '90%',
    },
    skillProgressBarBg: {
        height: 8,
        backgroundColor: '#f1f5f9',
        borderRadius: 4,
        overflow: 'hidden',
    },
    skillProgressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    skillRightSide: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 48,
    },
    levelText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#64748b',
        fontStyle: 'italic',
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#ea580c',
    },
    footer: {
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 40,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#cbd5e1',
        letterSpacing: 1,
        fontFamily: 'Montserrat-ExtraBold',
    },
    footerSubText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#cbd5e1',
        letterSpacing: 1,
        marginTop: 2,
        fontStyle: 'italic',
        fontFamily: 'Montserrat-ExtraBoldItalic',
    },
});

export default YourSkillScore;
