import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ProfileTop from '../../../components/Profile/ProfileTop';
import Spinner from '../../../components/Spinner';
import {styles} from '../../HomeScreens/ProfileScreen/styles';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../../store/Actions/UserActions';
import {useRoute, useNavigation, useIsFocused} from '@react-navigation/core';
import {EMPTY_PROFILE, EMPTY_POSTS} from '../../../store/types';
import ProfileBottom from '../../../components/Profile/ProfileBottom';
import {getMyPosts} from '../../../store/Actions/PostActions';

const inlineStyle = StyleSheet.create({
  text: {...styles.text, fontSize: 20},
  tag: {...styles.text, color: '#333', fontSize: 14},
  label: {...styles.text, ...styles.subText},
});
const PeerProfileScreen = () => {
  const {profile, loading, followLoading} = useSelector(
    (state: any) => state.User,
  );
  const focused = useIsFocused();
  const post = useSelector((state: any) => state.Post);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const loadProfile = async () => {
    // @ts-ignore
    await dispatch(getProfile(route.params.id));
    // @ts-ignore
    await dispatch(getMyPosts(route.params.id));
  };
  React.useEffect(() => {
    if(focused){
      // @ts-ignore
      navigation.setOptions({title: route.params.username});
      loadProfile();
    }
    return () => {
      dispatch({type: EMPTY_PROFILE});
      dispatch({type: EMPTY_POSTS});
      navigation.setOptions({title: ''});
    };
  }, [focused])

  return (
    <>
      {!loading && profile ? (
        <>
          <ScrollView
            overScrollMode={'never'}
            showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <ProfileTop
                inlineStyle={inlineStyle}
                styles={styles}
                profile={profile}
                followLoading={followLoading}
              />
              <ProfileBottom posts={post.otherPosts} />
            </View>
          </ScrollView>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PeerProfileScreen;
