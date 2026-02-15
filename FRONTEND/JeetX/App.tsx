/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { requestUserPermission, getFCMToken, notificationListener } from './src/utils/notificationHelper';

function App(): React.JSX.Element {
  useEffect(() => {
    const setupNotifications = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        await getFCMToken();
      }
    };

    setupNotifications();
    const unsubscribe = notificationListener();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
