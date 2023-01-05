import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {List} from 'react-native-paper';
import styles from './styles';
const FollowList = ({route, navigation}) => {
  // route.params.data.map(e => {
  //     console.log(e)
  // })
  return (
    <FlatList
      data={route.params.data}
      renderItem={({item}) => (
        <List.Section>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {
                screen: 'PeerProfileScreen',
                params: {id: item._id, username: item.username},
              })
            }>
            <List.Item
              title={item.username}
              description={`${item.firstName} ${item.lastName}`}
              titleStyle={styles.titleStyle}
              style={styles.listItem}
              left={() => (
                <FastImage
                  style={styles.avatar}
                  source={{
                    uri: item.avatar.uri,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}
            />
          </TouchableOpacity>
        </List.Section>
      )}
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}
    />
  );
};

export default FollowList;
