import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostContent from './PostContent';

interface Post {
  allowed: Boolean;
  post: any;
  single: Boolean;
}
const Post = ({allowed, post, single = false}: Post) => {
  const {navigate} = useNavigation();
  const navigateToCommunity = async () => {
    // @ts-ignore
    navigate('Community', {id: post.community._id});
  };
  // callbacks
  const navigateToComments = async (allowed: Boolean) => {
    if (allowed) {
      // await dispatch(
      //   commentsForPost(post._id, post.author.firebaseToken, navigate),
      // );
      // @ts-ignore
      navigate('Post', {
        screen: 'SinglePostScreen',
        params: {id: post._id, fbToken: post.author.firebaseToken, authorId: post.author._id, post},
      });
    }
  };

  return (
    <View style={{...styles.post, marginTop: single ? 3 : 8}}>
      <PostHeader
        styles={styles}
        single={single}
        post={post}
        navigateToCommunity={navigateToCommunity}
      />
      <PostContent styles={styles} post={post} allowed={allowed} />
      <PostFooter
        post={post}
        styles={styles}
        navigateToComments={() => navigateToComments(allowed)}
      />
    </View>
  );
};
export default Post;
