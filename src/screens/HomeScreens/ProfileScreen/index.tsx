import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {getProfile} from '../../../store/Actions/UserActions';
import Spinner from '../../../components/Spinner';
import ProfileTop from '../../../components/Profile/ProfileTop';
import ProfileBottom from '../../../components/Profile/ProfileBottom';
import { getMyPosts } from '../../../store/Actions/PostActions';

export default function ProfileScreen() {
  const {navigate, goBack} = useNavigation();
  const auth = useSelector((state: any) => state.Auth);
  const post = useSelector((state: any) => state.Post);
  const dispatch = useDispatch();
  const focused = useIsFocused()
  const {user} = auth;

  const loadProfile = async () => {
    await dispatch(getMyPosts(user._id))
  };
  const inlineStyle = StyleSheet.create({
    text: {...styles.text, fontSize: 20},
    tag: {...styles.text, color: '#333', fontSize: 14},
    label: {...styles.text, ...styles.subText},
  });
  useEffect(() => {
    if(focused){
      loadProfile();
    }
  }, [focused]);

  return (
    <>
      {!auth.loading && auth.user ? (
        <>
          <ScrollView
            overScrollMode={'never'}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}>
            <View style={{}}>
              <ProfileTop
                inlineStyle={inlineStyle}
                styles={styles}
                profile={user}
              />
              <ProfileBottom posts={post.otherPosts} />
            </View>
          </ScrollView>
        </>
      ) : (
        <Spinner />
      )}
      <View></View>
    </>
  );
}
