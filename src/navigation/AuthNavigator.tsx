import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AuthScreens} from '../screens/AuthScreens';
const Auth = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{headerShown: false}}>
      <Auth.Screen
        options={{headerShown: false}}
        name="WelcomeScreen"
        component={AuthScreens.WelcomeScreen}
      />
      <Auth.Screen
        options={{headerShown: false}}
        name="PhoneScreen"
        component={AuthScreens.PhoneScreen}
      />
      <Auth.Screen
        options={{headerShown: false}}
        name="OneTimePasswordScreen"
        component={AuthScreens.OTPScreen}
      />
      <Auth.Screen
        options={{headerShown: false}}
        name="NameScreen"
        component={AuthScreens.NameScreen}
      />
      <Auth.Screen
        options={{headerShown: false}}
        name="PersonalInfoScreen"
        component={AuthScreens.PersonalInfoScreen}
      />
      {/* <Auth.Screen
        options={{headerShown: false}}
        name="GoalsScreen"
        component={AuthScreens.GoalsScreen}
      /> */}
    </Auth.Navigator>
  );
};

export default AuthNavigator;
