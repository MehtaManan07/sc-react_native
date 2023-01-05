import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import AngleLeftIcon from '@iconscout/react-native-unicons/icons/uil-angle-left-b';
import CrossIcon from '@iconscout/react-native-unicons/icons/uil-times';
import {ProfileScreens} from '../screens/ProfileScreens';
const Profile = createStackNavigator();
const ProfileNavigator = () => {
  const styles = StyleSheet.create({
    saveButton: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
    },
  });
  return (
    <Profile.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerTransparent: false,
        headerTintColor: 'black',
        headerStyle: {
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Gilroy-Bold',
          fontSize: 22,
        },
      }}>
      <Profile.Screen
        options={{
          title: 'Settings',
          headerBackImage: () => <AngleLeftIcon size="30" color="#000" />,
        }}
        name="SettingsScreen"
        component={ProfileScreens.SettingsScreen}
      />
      <Profile.Screen
        options={{
          title: 'Edit Profile',
          headerBackImage: () => <CrossIcon size="30" color="#000" />,
        }}
        name="EditProfileScreen"
        component={ProfileScreens.EditProfileScreen}
      />
      <Profile.Screen
        options={{
          title: 'Educator Profile',
          headerBackImage: () => <AngleLeftIcon size="30" color="#000" />,
        }}
        name="EducatorProfileScreen"
        component={ProfileScreens.EducatorProfileScreen}
      />
      <Profile.Screen
        options={{
          title: '',
          headerBackImage: () => <AngleLeftIcon size="30" color="#000" />,
        }}
        name="PeerProfileScreen"
        component={ProfileScreens.PeerProfileScreen}
      />
      <Profile.Screen
        options={{
          title: '',
          headerBackImage: () => <AngleLeftIcon size="30" color="#000" />,
        }}
        name="FollowList"
        component={ProfileScreens.FollowList}
      />
      <Profile.Screen
        options={{
          title: 'Saved Posts',
          headerBackImage: () => <AngleLeftIcon size="30" color="#000" />,
        }}
        name="SavedPosts"
        component={ProfileScreens.SavedPostsScreen}
      />
    </Profile.Navigator>
  );
};

export default ProfileNavigator;
