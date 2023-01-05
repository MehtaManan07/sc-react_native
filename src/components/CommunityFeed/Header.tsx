import React, {FC, memo, useMemo} from 'react';
import {Text, View, ViewProps, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {headerStyles} from './HeaderStyles';
import {Button} from 'react-native-paper';
import AngleLeftIcon from '@iconscout/react-native-unicons/icons/uil-angle-left-b';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import JoinCommunityButton from '../Buttons/JoinCommunityButton';
import {
  joinCommunity,
  leaveCommunity,
} from '../../store/Actions/CommunityActions';

type Props = Pick<ViewProps, 'style'> & {
  photo: string;
  name: string;
  bio: string;
};

const Header = () => {
  const containerStyle = useMemo(() => [headerStyles.container], []);
  const comm = useSelector((state: any) => state.Community);
  const {user} = useSelector((state: any) => state.Auth);
  const dispatch = useDispatch();
  const joinComm = async () => {
    await dispatch(joinCommunity(community._id));
  };
  const leaveComm = async () => {
    await dispatch(leaveCommunity(community._id));
  };
  const {community, loading, joinLoading} = comm;
  const {goBack, navigate} = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => goBack()}>
        <AngleLeftIcon style={headerStyles.backButton} size="30" color="#000" />
      </TouchableOpacity>
      {!loading && community ? (
        <View style={containerStyle}>
          <FastImage
            style={headerStyles.photo}
            source={{
              uri: community && community.coverImage.uri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={headerStyles.infoContainer}>
            <Text style={headerStyles.name}>{community.name}</Text>
            <View style={headerStyles.flexRow}>
              <Text style={headerStyles.stats}>{community.members.length}</Text>
              <Text style={headerStyles.statsacomp}>Members</Text>
            </View>
            {community.createdBy === user._id ? (
              <JoinCommunityButton
                headerStyles={headerStyles}
                loading={joinLoading}
                text="Settings"
                // @ts-ignore
                onPress={() => navigate('Community')}
              />
            ) : community.members.includes(user._id) ? (
              <JoinCommunityButton
                headerStyles={headerStyles}
                loading={joinLoading}
                text="Joined"
                onPress={leaveComm}
              />
            ) : (
              <JoinCommunityButton
                headerStyles={headerStyles}
                loading={joinLoading}
                text="Join"
                onPress={joinComm}
              />
            )}
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default memo(Header);
