import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import FollowList from '.';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const route = useRoute();
  //   @ts-ignore
  const {username, followers, following} = route.params;
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({title: `${username}`});
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarBounces: true,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'Inter-Bold',
          textTransform: 'capitalize',
        },
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 3,
        },
        tabBarItemStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 3,
        },
      }}>
      <Tab.Screen
        name="Followers"
        component={FollowList}
        options={{tabBarLabel: 'Followers'}}
        //   @ts-ignore
        initialParams={{data: route.params.followers}}
      />
      <Tab.Screen
        name="Following"
        component={FollowList}
        options={{tabBarLabel: 'Following'}}
        //   @ts-ignore
        initialParams={{data: route.params.following}}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
