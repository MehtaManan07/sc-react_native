import React from 'react';
import {SafeAreaView} from 'react-native';
import Post from '../Post';
import SkeletonView from '../Post/SkeletonView';
import {styles as homeStyles} from '../../screens/HomeScreens/HomeFeedScreen/styles';

const ProfileBottom = ({posts}) => {
  return (
    <SafeAreaView style={homeStyles.container}>
      {posts ? (
        posts.map((post, i) => {
          return <Post post={post} key={i} allowed />;
        })
      ) : (
        <SkeletonView />
      )}
    </SafeAreaView>
  );
};

export default ProfileBottom;
