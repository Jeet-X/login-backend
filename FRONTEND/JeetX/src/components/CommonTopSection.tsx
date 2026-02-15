import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const tabs = ['Quizzes', 'Ludo', 'Puzzles', 'Chess'];

const CommonTopSection = ({ activeTab, onTabPress }) => {
  return (
    <View>
      {/* Banner */}
      <Image
        source={require('../assets/banner.png')} // replace with your banner
        style={styles.banner}
      />

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab} onPress={() => onTabPress(tab)}>
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTab
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CommonTopSection;

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  tabText: {
    color: '#64748b',
    fontWeight: '500',
  },
  activeTab: {
    color: '#0ea5e9',
    borderBottomWidth: 2,
    borderBottomColor: '#0ea5e9',
    paddingBottom: 4,
  },
});
