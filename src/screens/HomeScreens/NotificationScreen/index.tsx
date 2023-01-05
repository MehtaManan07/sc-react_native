import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {timee} from '../../../constants/functions';
import axios from '../../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useSelector((state: any) => state.Auth);
  const [refreshed, setRefreshed] = useState(false);
  const [noti, setNoti] = useState([]);
  const {navigate} = useNavigation();
  const fetchNotifications = async () => {
    const token = await AsyncStorage.getItem('verseJWTtoken');
    axios
      .get('/api/v1/users/notifications', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(({data}) => {
        setRefreshed(true);
        // @ts-ignore
        setNoti(data.data);
      });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNotifications().then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {user.notifications.length > 0 || noti.length > 0 ? (
        <View style={styles.listGroup}>
          <FlatList
            data={!refreshed ? user.notifications : noti}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({item}) => {
              const nav = JSON.parse(item.navigate);
              const t = timee(item.createdAt);
              return (
                // @ts-ignore
                <List.Item
                  // @ts-ignore
                  onPress={() => navigate(nav.screen, nav.options)}
                  title={item.message}
                  description={
                    t === 'Just now'
                      ? 'Just now'
                      : `${Math.round(
                          parseFloat(t.substring(0, t.length - 1)),
                        )}${t.substring(t.length - 1, t.length)}`
                  }
                  titleStyle={styles.titleStyle}
                  style={styles.listItem}
                  left={() => (
                    <FastImage
                      style={styles.avatar}
                      source={{
                        uri: item.from.avatar.uri,
                        priority: FastImage.priority.high,
                      }}
                    />
                  )}
                />
              );
            }}
          />
        </View>
      ) : (
        <>
          <View style={styles.announcementContainer}>
            <Text style={styles.heroText}>Hey {user.firstName}!</Text>
            <Text style={styles.supportingText}>
              You don't have any Notifications yet
            </Text>
          </View>
          <FastImage
            source={require('../../../assets/images/man-writing-book.png')}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 400,
              height: 400,
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}
