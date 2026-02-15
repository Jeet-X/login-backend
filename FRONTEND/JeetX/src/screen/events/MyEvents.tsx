import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { getQuizHistory } from '../../api/quizApi';

const { width } = Dimensions.get('window');

// Mock Data for Live/Upcoming
const MOCK_EVENTS_DATA = {
    Live: [
        { id: '1', title: 'Jumble Words', time: '02m:00s', subTime: '1:37AM', players: '66/100', prize: '40k - 400k', fee: '60', status: 'Join', icon: 'font', color: '#f59e0b' },
        { id: '2', title: 'Sacred Chess', time: '03m:29s', subTime: '1:37AM', players: '100/100', prize: '40k - 400k', fee: 'Full', status: 'Full', icon: 'delicious', color: '#ef4444' },
        { id: '3', title: 'World Map Find', time: '12m:00s', subTime: '1:37AM', players: '51/100', prize: '40k - 400k', fee: '50', status: 'Join', icon: 'globe', color: '#10b981' },
        { id: '4', title: 'Fantasy Realm', time: '14m:08s', subTime: '1:37AM', players: '100/100', prize: '40k - 400k', fee: 'Full', status: 'Full', icon: 'shield', color: '#8b5cf6' },
        { id: '5', title: 'Secure Place', time: '24m:09s', subTime: '1:37AM', players: '72/100', prize: '40k - 400k', fee: '90', status: 'Join', icon: 'lock', color: '#f97316' },
        { id: '6', title: 'Sacred Chess', time: '1hr:2m', subTime: '1:37AM', players: '12/100', prize: '40k - 400k', fee: '40', status: 'Join', icon: 'delicious', color: '#10b981' },
    ],
    Upcoming: [
        { id: '1', title: 'Jumble Words', time: '02m:00s', subTime: '1:37AM', players: '66/100', prize: '40k - 400k', fee: '60', status: 'Join', icon: 'font', color: '#f59e0b' },
        { id: '2', title: 'Sacred Chess', time: '03m:29s', subTime: '1:37AM', players: '100/100', prize: '40k - 400k', fee: 'Full', status: 'Full', icon: 'delicious', color: '#ef4444' },
        { id: '3', title: 'World Map Find', time: '12m:00s', subTime: '1:37AM', players: '51/100', prize: '40k - 400k', fee: '50', status: 'Join', icon: 'globe', color: '#10b981' },
    ]
};

const MyEvents = () => {
    const [activeTab, setActiveTab] = useState<'Live' | 'Upcoming' | 'MyEvents'>('Live');
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (activeTab === 'MyEvents') {
            fetchHistory();
        }
    }, [activeTab]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await getQuizHistory();
            if (response.success && response.data) {
                // The response.data might be the array or object with history array.
                // Based on the log provided by user:
                // "data": [ ... ] (It is an array directly in data field)
                const data = response.data;
                if (Array.isArray(data)) {
                    setHistoryData(data);
                }
            }
        } catch (error) {
            console.error("Fetch history failed", error);
        } finally {
            setLoading(false);
        }
    };

    const getTabLabel = (tab: string) => {
        switch (tab) {
            case 'Live': return 'Live Events';
            case 'Upcoming': return 'Upcoming Events';
            case 'MyEvents': return 'My Events';
            default: return '';
        }
    };

    const renderEventCard = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                <FontAwesome name={item.icon} size={26} color={item.color} />
            </View>

            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <View style={styles.timeRow}>
                    <Text style={styles.timerText}>{item.time}</Text>
                    <Text style={styles.subTimerText}> - {item.subTime}</Text>
                </View>

                <View style={styles.prizeContainer}>
                    <View style={styles.prizeBadge}>
                        <FontAwesome name="trophy" size={11} color="#ca8a04" style={{ marginRight: 4 }} />
                        <Text style={styles.prizeLabel}>Win </Text>
                        <Text style={styles.prizeValue}>{item.prize}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.rightSection}>
                <View style={styles.rightTopRow}>
                    <View style={styles.playersBadge}>
                        <FontAwesome name="users" size={10} color="#64748b" style={{ marginRight: 4 }} />
                        <Text style={styles.playersText}>{item.players}</Text>
                    </View>
                    <TouchableOpacity style={{ marginLeft: 8 }}>
                        <FontAwesome name="share" size={12} color="#94a3b8" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    disabled={item.status === 'Full'}
                    activeOpacity={0.8}
                >
                    {item.status === 'Full' ? (
                        <View style={[styles.actionButton, styles.fullButton]}>
                            <Text style={styles.fullButtonText}>Full</Text>
                        </View>
                    ) : (
                        <LinearGradient
                            colors={['#008d9d', '#00707c']}
                            style={styles.actionButton}
                        >
                            <View style={styles.coinIcon} />
                            <Text style={styles.buttonText}>{item.fee} Join</Text>
                        </LinearGradient>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderHistoryCard = ({ item }: { item: any }) => {
        const dateObj = new Date(item.created_at);
        const date = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isTournament = item.mode === 'TOURNAMENT';
        const statusColor = item.status === 'COMPLETED' ? '#10b981' : '#f59e0b';
        // Use Tournament Name if available and mode is Tournament, else Sub Category Name
        const title = (isTournament && item.tournament_name) ? item.tournament_name : item.sub_category_name || 'Quiz Match';

        return (
            <View style={styles.card}>
                <View style={[styles.iconContainer, { backgroundColor: isTournament ? '#8b5cf615' : '#0ea5e915' }]}>
                    <FontAwesome name={isTournament ? 'trophy' : 'gamepad'} size={24} color={isTournament ? '#8b5cf6' : '#0ea5e9'} />
                </View>

                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
                    <View style={styles.timeRow}>
                        <FontAwesome name="calendar" size={10} color="#94a3b8" style={{ marginRight: 4 }} />
                        <Text style={styles.subTimerText}>{date}</Text>
                    </View>
                    <View style={styles.prizeBadge}>
                        <Text style={[styles.prizeLabel, { fontSize: 11, color: isTournament ? '#8b5cf6' : '#0ea5e9', fontWeight: 'bold' }]}>
                            {item.mode}
                        </Text>
                        <Text style={[styles.prizeLabel, { fontSize: 11, color: '#64748b', marginLeft: 8 }]}>
                            Score: <Text style={{ fontWeight: 'bold', color: '#334155' }}>{item.score}</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.rightSection}>
                    <View style={{ alignItems: 'flex-end', marginBottom: 6 }}>
                        <Text style={[styles.playersText, { fontSize: 11 }]}>Entry: {item.entry_coins} Coins</Text>
                    </View>

                    <View style={[styles.actionButton, { backgroundColor: '#f8fafc', paddingVertical: 4, minWidth: 80, borderColor: statusColor, borderWidth: 1 }]}>
                        <Text style={[styles.buttonText, { color: statusColor, fontSize: 10 }]}>{item.status}</Text>
                    </View>

                    {item.coins_won > 0 && (
                        <Text style={{ fontSize: 10, color: '#ca8a04', fontWeight: 'bold', marginTop: 4 }}>Won +{item.coins_won}</Text>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

            {/* Header Background Block */}
            <View style={styles.headerBackground}>
                {/* SafeAreaView with explicit top edge and padding */}
                <SafeAreaView edges={['top']} style={{ paddingTop: Platform.OS === 'android' ? 10 : 0 }}>
                    {/* Tabs */}
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity onPress={() => setActiveTab('Live')} style={styles.tab}>
                            <Text
                                style={[styles.tabText, activeTab === 'Live' ? styles.activeTabText : styles.inactiveTabText]}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                            >
                                Live Events
                            </Text>
                            {activeTab === 'Live' && <View style={styles.activeTabIndicator} />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveTab('Upcoming')} style={styles.tab}>
                            <Text
                                style={[styles.tabText, activeTab === 'Upcoming' ? styles.activeTabText : styles.inactiveTabText]}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                            >
                                Upcoming Events
                            </Text>
                            {activeTab === 'Upcoming' && <View style={styles.activeTabIndicator} />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveTab('MyEvents')} style={styles.tab}>
                            <Text
                                style={[styles.tabText, activeTab === 'MyEvents' ? styles.activeTabText : styles.inactiveTabText]}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                            >
                                My Events
                            </Text>
                            {activeTab === 'MyEvents' && <View style={styles.activeTabIndicator} />}
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </View>

            {/* Page Title & Filter Row */}
            <View style={styles.titleRow}>
                <View style={styles.titleLeft}>
                    <FontAwesome name="trophy" size={18} color="#b45309" style={{ marginRight: 8 }} />
                    <Text style={styles.pageTitle}>{getTabLabel(activeTab)}</Text>
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <FontAwesome name="filter" size={12} color="#334155" style={{ marginRight: 6 }} />
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            {activeTab === 'MyEvents' && loading && historyData.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#008d9d" />
                </View>
            ) : (
                <FlatList
                    data={activeTab === 'MyEvents' ? historyData : (MOCK_EVENTS_DATA as any)[activeTab]}
                    renderItem={activeTab === 'MyEvents' ? renderHistoryCard : renderEventCard}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ color: '#94a3b8' }}>No events found.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9',
    },
    headerBackground: {
        backgroundColor: '#0f172a',
        paddingBottom: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        zIndex: 10,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 0,
        marginBottom: 8,
    },
    tab: {
        paddingVertical: 12,
        alignItems: 'center',
        flex: 1,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    activeTabText: {
        color: '#ffffff',
        marginBottom: 6,
    },
    inactiveTabText: {
        color: '#94a3b8',
        marginBottom: 6,
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: 0,
        width: '60%',
        height: 6,
        backgroundColor: '#f1f5f9',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#f1f5f9',
    },
    titleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    filterText: {
        color: '#334155',
        fontSize: 13,
        fontWeight: '600',
    },
    listContent: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 8,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        letterSpacing: 0.2,
        marginBottom: 4,
    },
    rightSection: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        minHeight: 50,
    },
    rightTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    playersBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playersText: {
        fontSize: 10,
        color: '#64748b',
        fontWeight: '600',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    timerText: {
        color: '#ef4444',
        fontWeight: '700',
        fontSize: 12,
    },
    subTimerText: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: '500',
    },
    prizeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    prizeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    prizeLabel: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
    prizeValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0ea5e9',
    },
    actionButton: {
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        minWidth: 70,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fullButton: {
        backgroundColor: '#e2e8f0',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 12,
    },
    fullButtonText: {
        color: '#94a3b8',
        fontWeight: '700',
        fontSize: 12,
    },
    coinIcon: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#fbbf24',
        marginRight: 6,
        borderWidth: 1.5,
        borderColor: '#ffffff',
    }
});

export default MyEvents;
