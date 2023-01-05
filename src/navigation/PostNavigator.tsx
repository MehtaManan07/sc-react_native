import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CrossIcon from '@iconscout/react-native-unicons/icons/uil-times';

import SinglePostScreen from '../screens/PostScreens/SinglePostScreen';
import CreatePostScreen from '../screens/HomeScreens/CreatePostScreen';
import GoalsScreen from '../screens/HomeScreens/GoalsScreen';
import {Modal} from 'react-native-paper';
const PostStack = createStackNavigator();

const PostNavigator = () => {
  return (
    <PostStack.Navigator
      initialRouteName="SinglePostScreen"
      screenOptions={{
        headerTransparent: false,
        presentation: 'modal',
        animationEnabled: true,
        headerStyle: {
          elevation: 0,
        },
        headerBackImage: () => <CrossIcon size="28" color="#000" />,
        headerTintColor: 'black',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Gilroy-Bold',
          fontSize: 20,
        },
      }}>
      <PostStack.Screen
        name="SinglePostScreen"
        options={{
          title: '',
        }}
        component={SinglePostScreen}
      />
      <PostStack.Screen
        name="CreatePostScreen"
        options={{
          title: '',
        }}
        component={CreatePostScreen}
      />
      <PostStack.Screen
        name="GoalsScreen"
        options={{
          title: '',
          headerShown: false,
        }}
        component={GoalsScreen}
      />
    </PostStack.Navigator>
  );
};

export default PostNavigator;
