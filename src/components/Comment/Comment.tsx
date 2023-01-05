import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {timee} from '../../constants/functions';
import commentStyling from './CommentStyling';
import Reply from './Reply';
import HyperLink from 'react-native-hyperlink';

const Comment = ({commentData}) => {
  const [liked, setLiked] = useState(false);
  const {navigate} = useNavigation();
  const auth = useSelector((state: any) => state.Auth);
  const {likes, text, user, createdAt} = commentData;
  const t = timee(createdAt);
  const dispatch = useDispatch();

  const navigateToProfile = async () => {
    if (user._id === auth.user._id) {
      /* @ts-ignore */
      navigate('Home', {screen: 'you'});
      return;
    }
    /* @ts-ignore */
    navigate('Profile', {
      screen: 'PeerProfileScreen',
      params: {id: user._id, username: user.username},
    });
  };
  const onPressLike = () => {
    setLiked(!liked);
  };
  const renderReplies = replies => {
    return replies.map((reply, index) => (
      <View key={index}>
        {/* @ts-ignore */}
        <Reply reply={reply} />
      </View>
    ));
  };
  return (
    <View style={commentStyling.backgroundWhite}>
      <View style={commentStyling.mainWrapper}>
        <TouchableOpacity onPress={navigateToProfile}>
          <FastImage
            style={commentStyling.image}
            source={{uri: user.avatar.uri, priority: FastImage.priority.high}}
          />
        </TouchableOpacity>
        <View style={commentStyling.wrapper}>
          <View style={commentStyling.commentHeader}>
            <TouchableOpacity onPress={navigateToProfile}>
              <Text
                style={
                  commentStyling.commentOwner
                }>{`${user.firstName} ${user.lastName}`}</Text>
            </TouchableOpacity>
            <Text style={commentStyling.commentDate}>
              {t === 'Just now'
                ? 'Just now'
                : `${Math.round(
                    parseFloat(t.substring(0, t.length - 1)),
                  )}${t.substring(t.length - 1, t.length)}`}
            </Text>
          </View>
          <HyperLink linkStyle={{color: 'dodgerblue'}} linkDefault>
            <Text style={commentStyling.content}>{text}</Text>
          </HyperLink>
        </View>
      </View>
    </View>
  );
};

export default Comment;
