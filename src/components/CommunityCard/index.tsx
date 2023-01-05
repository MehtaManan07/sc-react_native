import React from 'react';
import {AppleCard} from 'react-native-apple-card-views';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';

export default function CommunityCard({community}) {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const navigateToCommunity = async () => {
    // @ts-ignore
    navigate('Community', {id: community._id});
  };
  return (
    <>
      {community.coverImage.uri && (
        <AppleCard
          smallTitle={`${community.createdBy.firstName} ${community.createdBy.lastName}`}
          largeTitle={`${community.name}`}
          footnoteText={`${community.members.length} Members`}
          footnoteTextStyle={styles.footnoteTextStyle}
          style={styles.container}
          resizeMode="cover"
          source={{uri: community.coverImage.uri}}
          backgroundStyle={styles.background}
          // @ts-ignore
          onPress={navigateToCommunity}
        />
      )}
    </>
  );
}
