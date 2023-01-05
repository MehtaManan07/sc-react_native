import React, {useEffect} from 'react';
import {View, StatusBar, Alert, BackHandler, Linking} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {Theme} from './src/constants/appTheme';
import {store} from './src/store';
import Routes from './Routes';
import {linking} from './src/constants/Linking';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MixpanelProvider} from './src/constants/AnalyticsService';
import {currentVersion} from './src/utils';
import axios from 'axios';

export default () => {
  useEffect(() => {
    async function callVersion() {
      await checkVersion();
    }

    callVersion();
  }, []);

  const checkVersion = async () => {
    const storeUrl = 'https://play.google.com/store/apps/details?id=uno.verse';
    try {
      const response = await axios.get(
        'https://server.verse.uno/api/v1/app/version',
      );
      if (response.data.version !== currentVersion().version) {
        Alert.alert(
          'Please Update',
          'You will have to update your app to the latest version to continue using Verse',
          [
            {
              text: 'Update',
              onPress: () => {
                return Linking.openURL(storeUrl);
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {}
  };

  return (
    <MixpanelProvider>
      <PaperProvider
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
          },
        }}>
        <ReduxProvider store={store}>
          <SafeAreaProvider>
            <StatusBar
              animated={true}
              barStyle="dark-content"
              backgroundColor={Theme.colors.background}
            />
            <GestureHandlerRootView style={{flex: 1}}>
              {/* @ts-ignore */}
              <NavigationContainer linking={linking} theme={Theme}>
                <View style={{flex: 1}}>
                  <Routes />
                  <FlashMessage
                    position="top"
                    autoHide
                    duration={2000}
                    animated
                  />
                </View>
              </NavigationContainer>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ReduxProvider>
      </PaperProvider>
    </MixpanelProvider>
  );
};
