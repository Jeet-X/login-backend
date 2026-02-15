
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const LEADERBOARD_DATA = [
    { id: '1', rank: 1, name: 'Kirtarth...', points: '11000', prize: '₹18,000', icon: 'user-secret', color: '#1F2937' },
    { id: '2', rank: 2, name: 'Radhika', points: '10000', prize: '₹15,000', icon: 'female', color: '#F472B6' },
    { id: '3', rank: 3, name: 'Satyam', points: '9000', prize: '₹10,000', icon: 'user-ninja', color: '#92400E' },
    { id: '4', rank: 4, name: 'PK', points: '5000', prize: '₹6,101.01', icon: 'user', color: '#FCA5A5' },
    { id: '5', rank: 4, name: 'Radhe ..', points: '4500', prize: '₹5,740', icon: 'user', color: '#93C5FD' },
    { id: '6', rank: 4, name: 'Player1', points: '3700', prize: '₹5,700', icon: 'user-secret', color: '#8B5CF6' },
    { id: '7', rank: 4, name: 'S8ajb', points: '3500', prize: '₹5,500', icon: 'user-secret', color: '#7C3AED' },
    { id: '8', rank: 4, name: '<Termi>', points: '3800', prize: '₹5,000', icon: 'user', color: '#FEF08A' },
];

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState('Weekly');

    const renderLeaderboardItem = ({ item }: { item: any }) => {
        let bgColors = ['#ffffff', '#ffffff'];
        let badgeText = '#fbbf24';
        let badgeBorder = 'transparent';

        if (item.rank === 1) {
            bgColors = ['#FFFACD', '#FCD34D']; // LemonChiffon -> Gold
            badgeText = '#FCD34D';
            badgeBorder = '#FCD34D';
        } else if (item.rank === 2) {
            bgColors = ['#F3F4F6', '#D1D5DB']; // Silver
            badgeText = '#FFFFFF';
            badgeBorder = '#E5E7EB';
        } else if (item.rank === 3) {
            bgColors = ['#FFF5E1', '#FFB74D']; // Bronze
            badgeText = '#FDBA74';
            badgeBorder = '#FDBA74';
        }

        const isTop3 = item.rank <= 3;

        return (
            <LinearGradient
                colors={bgColors}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.card}
            >
                {/* Left Side: Avatar */}
                <View style={styles.leftSection}>
                    <View style={styles.avatarContainer}>
                        <View style={[styles.avatarPlaceholder, { backgroundColor: item.color }]}>
                            <FontAwesome name={item.icon} size={28} color="#ffffff" />
                        </View>

                        {/* Rank Badge for all or just top 3? Screenshot implies badge style for top 3 mainly, but others have #4 text. */}
                        {isTop3 && (
                            <View style={[styles.rankBadge, { borderColor: badgeBorder }]}>
                                <Text style={[styles.rankBadgeText, { color: badgeText }]}>
                                    {item.rank === 1 ? '1st' : item.rank === 2 ? '2nd' : '3rd'}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Right Side: Info Grid */}
                <View style={styles.infoWrapper}>
                    {/* Name & Rank */}
                    <View style={styles.columnName}>
                        <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.rankText}>#{item.rank}</Text>
                    </View>

                    {/* Points */}
                    <View style={styles.columnPoints}>
                        <Text style={styles.labelStats}>Points</Text>
                        <Text style={styles.valueStats}>{item.points}</Text>
                    </View>

                    {/* Prize */}
                    <View style={styles.columnPrize}>
                        <Text style={styles.labelStats}>Total Prize Won</Text>
                        <Text style={styles.valueStats}>{item.prize}</Text>
                    </View>
                </View>
            </LinearGradient>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#02121a" />

            {/* Header Area */}
            <View style={styles.headerContainer}>
                <SafeAreaView edges={['top']} style={styles.safeArea}>
                    <View style={styles.tabsContainer}>
                        {['Daily', 'Weekly', 'Monthly'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={styles.tabButton}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === tab ? styles.activeTabText : styles.inactiveTabText
                                ]}>
                                    {tab}
                                </Text>
                                {activeTab === tab && <View style={styles.activeTabIndicator} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </SafeAreaView>
            </View>

            {/* Content Area */}
            <View style={styles.contentContainer}>
                {/* Filter Header Row */}
                <View style={styles.filterRow}>
                    <View style={styles.rankingTitleContainer}>
                        <FontAwesome name="trophy" size={16} color="#fbbf24" style={{ marginRight: 8 }} />
                        <Text style={styles.playersRankingTitle}>Players Ranking</Text>
                    </View>
                    <TouchableOpacity style={styles.filterBtn}>
                        <FontAwesome name="filter" size={14} color="#334155" style={{ marginRight: 6 }} />
                        <Text style={styles.filterBtnText}>Filter</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={LEADERBOARD_DATA}
                    renderItem={renderLeaderboardItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    headerContainer: {
        backgroundColor: '#02121a', // Dark header
        paddingBottom: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        zIndex: 10,
    },
    safeArea: {
        backgroundColor: '#02121a',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 0,
    },
    tabButton: {
        paddingVertical: 12,
        paddingHorizontal: 4,
        alignItems: 'center',
        flex: 1,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.3,
        fontFamily: 'Montserrat-SemiBold',
    },
    activeTabText: {
        color: '#ffffff',
        fontFamily: 'Montserrat-Bold',
        marginBottom: 6, // Push text up slightly for indicator
    },
    inactiveTabText: {
        color: '#94a3b8',
        marginBottom: 6,
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: 0,
        width: '80%',
        height: 6,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#f8fafc',
    },
    rankingTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playersRankingTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-ExtraBold',
        fontWeight: '800',
        color: '#1e293b',
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    filterBtnText: {
        fontFamily: 'OpenSans-Regular',
        fontWeight: '600',
        color: '#334155',
        fontSize: 14,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        // Shadow
        shadowColor: '#94a3b8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    leftSection: {
        marginRight: 14,
    },
    avatarContainer: {
        width: 54,
        height: 54,
        position: 'relative',
    },
    avatarPlaceholder: {
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffffff', // White border around avatar
    },
    rankBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        minWidth: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        backgroundColor: '#000000', // Black background for all top 3
    },
    rankBadgeText: {
        fontSize: 10,
        fontFamily: 'Montserrat-ExtraBold',
        fontWeight: '800',
    },
    infoWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    columnName: {
        flex: 1.5,
        justifyContent: 'center',
        paddingRight: 4,
    },
    nameText: {
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    rankText: {
        fontSize: 14,
        color: '#334155',
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
    },
    columnPoints: {
        flex: 1,
        alignItems: 'center',
    },
    columnPrize: {
        flex: 1.3,
        alignItems: 'flex-end',
    },
    labelStats: {
        fontSize: 10,
        color: '#64748b',
        fontFamily: 'OpenSans-Regular',
        fontWeight: '500',
        marginBottom: 2,
        fontStyle: 'italic',
    },
    valueStats: {
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        color: '#0f172a',
    },
});

export default Leaderboard;
