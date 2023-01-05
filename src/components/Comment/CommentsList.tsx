import React, {Component, useRef, useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import Comment from './Comment';
import commentListStyling from './commentListStyling';

const CommentsList = ({data, onAddComment, currentUser, topMargin}) => {
  const flatList = useRef<FlatList>(null);

  return (
    <View style={commentListStyling.mainContainer}>
      <FlatList
        style={{marginTop: topMargin}}
        ref={flatList}
        onContentSizeChange={() =>
          null !== flatList.current ? flatList.current.scrollToEnd() : null
        }
        extraData={{data, onAddComment, currentUser, topMargin}}
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <>
            <Comment commentData={item} />
          </>
        )}
      />
    </View>
  );
};

export default CommentsList;
