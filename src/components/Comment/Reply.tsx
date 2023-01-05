import React from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';
import HyperLink from 'react-native-hyperlink';
import commentStyling from './CommentStyling';

const Reply = ({reply}) => {
  const onPress = () => {
  };
  return (
    <View>
      <View style={commentStyling.mainWrapper}>
        <Image
          style={commentStyling.replyImage}
          source={{uri: reply.ownerAvatar}}
        />
        <View style={commentStyling.wrapper}>
          <View style={commentStyling.commentHeader}>
            <Text style={commentStyling.commentOwner}>{reply.ownerName}</Text>
            <Text style={commentStyling.commentDate}>{reply.date}</Text>
          </View>
               <HyperLink linkStyle={{ color: 'dodgerblue' }} linkDefault> <Text style={commentStyling.content}>{reply.content}</Text>      </HyperLink>
        </View>
      </View>
      <View style={commentStyling.replyFooter}>
        <TouchableHighlight onPress={onPress}>
          <Text style={commentStyling.footerElement}>Like</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={onPress}>
          <Text style={commentStyling.footerElement}>Reply</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default Reply;
