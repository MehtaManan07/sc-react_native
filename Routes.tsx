import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import HomeNavigator from './src/navigation/HomeNavigator';
import CommunityNavigator from './src/navigation/CommunityNavigator';
import ProfileNavigator from './src/navigation/ProfileNavigator';
import Splash from './src/screens/Splash';
import PostNavigator from './src/navigation/PostNavigator';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
const RootStack = createStackNavigator();
const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    dumping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Routes = () => {
  const {user} = useSelector((state: any) => state.Auth);
  const {navigate} = useNavigation();
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     showNotifee(remoteMessage, 'onMessage')
  //   });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     showNotifee(remoteMessage, 'background')
  //   });
  //   // show the message to the user or use it to update to your local store
  //   return unsubscribe;
  // }, []);
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      // @ts-ignore
      const nav = JSON.parse(remoteMessage.data.navigate);
      // @ts-ignore
      navigate(nav.screen, nav.options);
      console.log('Notification caused app to open from background state:', {
        remoteMessage: remoteMessage.notification?.android,
        a: remoteMessage.notification?.body,
        b: remoteMessage.data,
        r: remoteMessage,
      });

      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', {
            remoteMessage,
          });
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
      initialRouteName="Splash">
      {/* change initial route to Splash on production */}
      {user ? (
        <>
          <RootStack.Screen component={HomeNavigator} name="Home" />
          <RootStack.Screen component={CommunityNavigator} name="Community" />
          <RootStack.Screen component={ProfileNavigator} name="Profile" />
          <RootStack.Screen component={PostNavigator} name="Post" />
        </>
      ) : (
        <>
          <RootStack.Screen component={Splash} name="Splash" />
          <RootStack.Screen component={AuthNavigator} name="Auth" />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default Routes;
