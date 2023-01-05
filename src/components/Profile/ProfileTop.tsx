import React, {useEffect, useRef, useCallback, useState} from 'react';
import {SafeAreaView, TouchableOpacity, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ProfileButton from '../Buttons/ProfileButton';
import {SVGIcon} from '../SVGIcon';
import ProfileMenuBottomSheet from './ProfileMenuBottomSheet';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {followUser, unfollowUser} from '../../store/Actions/UserActions';
import BottomSheet from '@gorhom/bottom-sheet';

interface Props {
  styles: any;
  profile: any;
  inlineStyle: any;
  followLoading?: any;
}
const ProfileTop = ({styles, profile, inlineStyle, followLoading}: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const onPressHandler = () => {
    handleSnapPress(0);
  };

  const {user} = useSelector((state: any) => state.Auth);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const followFunction = async () => {
    await dispatch(followUser(profile._id));
  };
  const unFollowFunction = async () => {
    await dispatch(unfollowUser(profile._id));
  };
  const navigateToEditScreen = () => {
    // @ts-ignore
    navigate('Profile', {
      screen: 'EditProfileScreen',
    });
  };
  const navigateToFollowList = () => {
    // @ts-ignore
    navigate('Profile', {
      screen: 'FollowList',
      params: {
        followers: user.followers,
        following: user.following,
        username: user.username,
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoWrapper}>
        <TouchableOpacity style={styles.avatarWrapper}>
          <FastImage
            style={styles.mainAvatar}
            source={{
              uri: profile.avatar.uri,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <View style={styles.extraInfoWrapper}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              0
            </Text>
            <Text>Karma</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToFollowList}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              {profile.followers && profile.followers.length}
            </Text>
            <Text>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              {profile.following && profile.following.length}
            </Text>
            <Text>Following</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bioWrapper}>
        <Text style={styles.text}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={{...styles.text, fontSize: 13, color: '#8c8c8c'}}>@{profile.username}</Text>
        {/* Verified Batch SVG */}
        {/* <SVGIcon fill={'#000'} height={'16'} type="verified" width={'16'} /> */}
        <Text style={profile.bio && styles.bioText}>{profile.bio}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {user._id === profile._id ? (
          <ProfileButton
            text="Edit Profile"
            submitHandler={navigateToEditScreen}
          />
        ) : profile.followers.includes(user._id) ? (
          <ProfileButton
            text="Unfollow"
            submitHandler={unFollowFunction}
            loading={followLoading}
          />
        ) : (
          <ProfileButton
            text="Follow"
            submitHandler={followFunction}
            loading={followLoading}
          />
        )}
        {/* <ProfileMenuButton onPress={onPressHandler} /> */}
      </View>
      <ProfileMenuBottomSheet figure={3} sheetRef={sheetRef} />
    </SafeAreaView>
  );
};

export default ProfileTop;
