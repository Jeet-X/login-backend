import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ViewStyle,
} from 'react-native';

interface GameCardProps {
    title: string;
    timeLeft: string;
    endTime: string;
    players: string;
    prize: string;
    icon: any;
    isFull?: boolean;
    onPress?: () => void;
    style?: ViewStyle;
}

const GameCard: React.FC<GameCardProps> = ({
    title,
    timeLeft,
    endTime,
    players,
    prize,
    icon,
    isFull = false,
    onPress,
    style,
}) => {
    return (
        <View style={[styles.card, style]}>
            {/* Icon */}
            <View style={styles.iconContainer}>
                <Image source={icon} style={styles.icon} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.players}>{players}</Text>
                </View>

                <Text style={styles.timer}>
                    <Text style={styles.timerHighlight}>{timeLeft}</Text> • {endTime}
                </Text>

                <View style={styles.prizeRow}>
                    <Text style={styles.prizeText}>🏆 Win </Text>
                    <Text style={styles.prizeAmount}>{prize}</Text>
                </View>
            </View>
            <View style={styles.actionWrapper}>
                {/* Action */}
                <TouchableOpacity
                    disabled={isFull}
                    onPress={onPress}
                    activeOpacity={0.85}
                    style={[
                        styles.joinButtonWrapper,
                        isFull && styles.fullButtonWrapper,
                    ]}
                >
                    {!isFull && (
                        <View style={styles.coinWrapper}>
                            <Image
                                source={require('../assets/coin.png')}
                                style={styles.coinIcon}
                            />
                        </View>
                    )}

                    <Text
                        style={[
                            styles.joinText,
                            isFull && styles.fullText,
                        ]}
                    >
                        {isFull ? 'Full' : `Join`}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GameCard;
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'flex-start', // 🔥 NOT center
    },

    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: '#F3F6FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    icon: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
    },

    content: {
        flex: 1,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1F2A2A',
        fontFamily: 'Montserrat-Bold',
    },

    players: {
        fontSize: 11,
        color: '#7A7F80',
        fontFamily: 'Montserrat-Medium',
    },
    actionWrapper: {
        marginTop: 10, // aligns button perfectly with prize row
    },
    timer: {
        fontSize: 11,
        marginTop: 4,
        color: '#7A7F80',
        fontFamily: 'Montserrat-Regular',
    },

    timerHighlight: {
        color: '#FF6B00',
        fontWeight: '700',
    },

    prizeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },

    prizeText: {
        fontSize: 11,
        color: '#7A7F80',
    },

    prizeAmount: {
        fontSize: 11,
        fontWeight: '700',
        color: '#1E88E5',
    },

    button: {
        height: 34,
        minWidth: 72,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',   // 🔥 KEY FIX
        gap: 6,                 // spacing between coin & text
        marginLeft: 10,
    },


    joinButton: {
        backgroundColor: '#EAF2FF',
    },

    fullButton: {
        backgroundColor: '#E0E0E0',
    },

    buttonText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2563EB',
    },

    fullButtonText: {
        color: '#9E9E9E',
    },
    joinButtonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,                 // EXACT height from image
        paddingHorizontal: 14,
        borderRadius: 16,
        backgroundColor: '#0E8A9E', // EXACT teal
    },

    fullButtonWrapper: {
        backgroundColor: '#E5E7EB',
    },

    coinWrapper: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#FACC15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },

    coinIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
    },

    joinText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
        lineHeight: 14,            // 🔥 fixes vertical centering
    },

    fullText: {
        color: '#9CA3AF',
    },

});
