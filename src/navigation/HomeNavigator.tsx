import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {HomeScreens} from '../screens/HomeScreens';
import {BottomTabs} from '../components/BottomTabs';
import {Theme} from '../constants/appTheme';
import {useNavigation} from '@react-navigation/native';
import DropDownIcon from '@iconscout/react-native-unicons/icons/uil-angle-down';
import SettingIcon from '@iconscout/react-native-unicons/icons/uil-setting';

const Tab = createBottomTabNavigator();
const HomeNavigator = () => {
  const {navigate, goBack} = useNavigation();
  const submitHandler = () => {
    // @ts-ignore
    navigate('Profile');
  };
  const goalOnPress = () => {
    // @ts-ignore
    navigate('Post', {screen: 'GoalsScreen', params: {from: 'Home'}});
  };

  const styles = StyleSheet.create({
    homeFeedScreenHeaderRight: {
      alignItems: 'center',
      marginRight: 16,
      alignSelf: 'flex-end',
      flexDirection: 'row',
    },
    homeFeedScreenHeaderRightText: {
      fontFamily: 'Gilroy-Bold',
      color: '#007f5f',
      fontSize: 24,
      marginLeft: 6,
    },
    profileFeedScreenHeaderRight: {
      alignItems: 'center',
      marginRight: 16,
      alignSelf: 'flex-end',
      flexDirection: 'row',
    },
    headerStyle: {
      fontFamily: 'Gilroy-Bold',
      fontSize: 24,
    },
  });
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabs {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.background,
          elevation: 0,
        },
        headerTransparent: false,
        headerTintColor: Theme.colors.text,
        headerTitleAlign: 'left',
        headerTitleStyle: styles.headerStyle,
      }}>
      <Tab.Screen
        component={HomeScreens.HomeFeedScreen}
        name="home"
        options={{
          title: 'Welcome 👋',
          headerRight: props => (
            <TouchableOpacity
              style={styles.homeFeedScreenHeaderRight}
              onPress={goalOnPress}>
              <DropDownIcon size="28" color="#081c15" />
              <Text style={styles.homeFeedScreenHeaderRightText}>IITJEE</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreens.ExploreScreen}
        name={'explore'}
        options={{
          title: 'Explore',
          headerShown: false,
        }}
      />

      <Tab.Screen
        component={HomeScreens.NotificationScreen}
        name={'notifications'}
        options={{
          title: 'Activity',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        component={HomeScreens.ProfileScreen}
        name={'you'}
        options={{
          title: 'Profile',
          headerTitleAlign: 'center',
          headerRight: props => (
            <TouchableOpacity
              style={styles.profileFeedScreenHeaderRight}
              onPress={submitHandler}>
              <SettingIcon size="24" color="#081c15" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
