import React from 'react';
import {Text, View, Linking, TouchableOpacity} from 'react-native';
import {Card, Divider, Subheading, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import ClockIcon from '@iconscout/react-native-unicons/icons/uil-clock-five';
import LockIcon from '@iconscout/react-native-unicons/icons/uil-padlock';
import UnLockIcon from '@iconscout/react-native-unicons/icons/uil-lock-open-alt';
import OwnerIcon from '@iconscout/react-native-unicons/icons/uil-user-square';

import styles from './styles';
import {useSelector} from 'react-redux';
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function AboutScreen() {
  const {navigate} = useNavigation();
  const Community = useSelector((state: any) => state.Community);
  const {community} = Community;
  let d = new Date(community.createdAt);
  return (
    <View>
      <Card style={styles.cardStyles}>
        <Title style={styles.cardTitle}>Group Details</Title>
        <Subheading style={styles.listTitle}>Created</Subheading>
        <View style={styles.listContainer}>
          <ClockIcon size="20" color="#000" />
          <Text style={styles.listContent}>
            {monthNames[d.getMonth()]} {d.getFullYear()}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <Subheading style={styles.listTitle}>Owner</Subheading>
        <View style={styles.listContainer}>
          <OwnerIcon size="20" color="#000" />
          <TouchableOpacity
            onPress={() =>
              //  @ts-ignore
              navigate('Profile', {
                screen: 'PeerProfileScreen',
                params: {
                  id: community.createdBy._id,
                  username: community.createdBy.username,
                },
              })
            }>
            <Text style={styles.listContent}>
              {community.createdBy.firstName} {community.createdBy.lastName}
            </Text>
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
        <Subheading style={styles.listTitle}>Privacy Status</Subheading>
        <View style={styles.listContainer}>
          <UnLockIcon size="20" color="#000" />
          <Text style={styles.listContent}>Public</Text>
        </View>
      </Card>
      <Card style={styles.cardStyles}>
        <Title style={styles.cardTitle}>Resources</Title>
        <Text style={styles.listContent}>{community.guidelines}</Text>
        {community.createdBy.firstName === 'Nishant' && (
          <>
            <Divider style={styles.divider} />
            <Subheading
              style={{...styles.listTitle, color: 'dodgerblue'}}
              onPress={() =>
                Linking.openURL(
                  'https://www.youtube.com/channel/UCan6AI1ASU12XvVTom1WglQ',
                )
              }>
              🔥 YouTube Channel
            </Subheading>
            <Divider style={styles.divider} />
            <Subheading
              style={{...styles.listTitle, color: 'dodgerblue'}}
              onPress={() =>
                Linking.openURL('https://unacademy.com/@nishantjindal')
              }>
              ⭐ Unacademy Profile
            </Subheading>
          </>
        )}
      </Card>
    </View>
  );
}
