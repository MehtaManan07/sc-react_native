import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import CommentIcon from '@iconscout/react-native-unicons/icons/uil-comment-alt-lines';
import {useSelector, useDispatch} from 'react-redux';
import {LikePost, UnLikePost} from '../../store/Actions/PostActions';
import {SVGIcon} from '../SVGIcon';
import Share from 'react-native-share';
// alt voting
import ShareIcon from '@iconscout/react-native-unicons/icons/uil-share-alt';

interface Post {
  styles: any;
  navigateToComments: any;
  post?: any;
}
const PostFooter = ({styles, navigateToComments, post}: Post) => {
  const {user} = useSelector((state: any) => state.Auth);
  const dispatch = useDispatch();
  const inlineStyle = {
    ...styles.reactionText,
    color: '#001d3d',
  };
  const customShare = async () => {
    try {
      const res = await Share.open({
        message: `Hey there! Check out this post from ${post.author.firstName} ${post.author.lastName} on Verse\n`,
        title: 'Share this post',
        url: `https://verse.uno/post/${post._id}/${post.author._id}`,
      });
      console.log({res});
    } catch (error) {
      console.log('err => ', error);
    }
  };

  return (
    <View style={styles.postFooter}>
      <View style={styles.voteContainer}>
        {post.upvotes.includes(user._id) ? (
          <TouchableOpacity
            style={styles.upVoteIcon}
            onPress={async () => {
              await dispatch(UnLikePost(post._id));
            }}>
            <SVGIcon fill={'#000'} height={'26'} type="liked" width={'26'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.upVoteIcon}
            onPress={async () => {
              await dispatch(LikePost(post._id));
            }}>
            <SVGIcon fill={'#000'} height={'26'} type="like" width={'26'} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            ...styles.reactionText,
            color: post.upvotes.includes(user._id) ? '#e8304a' : '#000',
          }}>
          {post.upvotes.length}
        </Text>
      </View>
      <TouchableOpacity style={styles.commentIcon} onPress={navigateToComments}>
        <CommentIcon size="22" color="#001d3d" />
        <Text style={inlineStyle}>{post.commentCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={customShare} style={styles.shareIcon}>
        <ShareIcon size="20" color="#081c15" />
      </TouchableOpacity>
    </View>
  );
};

export default PostFooter;
