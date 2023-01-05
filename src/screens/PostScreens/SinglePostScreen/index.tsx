import React, {useEffect, useRef, useCallback, useState} from 'react';
import {Dimensions, ScrollView, TouchableOpacity, View} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Post from '../../../components/Post';
import PostBottomSheet from '../../../components/Post/PostBottomSheet';
import {getSinglePost, newComment} from '../../../store/Actions/PostActions';
import {EMPTY_SINGLE_POST} from '../../../store/types';
import {Button, Divider, Colors, ActivityIndicator} from 'react-native-paper';
import Comment from '../../../components/Comment/Comment';
import NewCommentInput from '../../../components/Comment/NewCommentInput';
import FastImage from 'react-native-fast-image';
import {SVGIcon} from '../../../components/SVGIcon';
import BottomSheet from '@gorhom/bottom-sheet';
import {showMessage} from 'react-native-flash-message';
import styles from './styles';

const SinglePostScreen = () => {
  const dispatch = useDispatch();
  const {setOptions} = useNavigation();
  const width = Dimensions.get('screen').width;
  const route = useRoute();
  const [text, setText] = useState('');
  const {post, commLoading, loading} = useSelector((state: any) => state.Post);
  const {user} = useSelector((state: any) => state.Auth);
  const getPost = async () => {
    //   @ts-ignore
    await dispatch(getSinglePost(route.params.id));
  };
  const sheetRef = useRef<BottomSheet>(null);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  console.log({loading}, '\n');
  const onAddComment = async () => {
    if (text === '') {
      showMessage({message: 'Comment cannot be empty', type: 'danger'});
      return;
    }
    console.log({p: route.params});
    await dispatch(
      newComment(
        // @ts-ignore
        {post: route.params.id, fbToken: post.author.firebaseToken, text},
        showMessage,
        setText,
      ),
    );
    setText('');
  };
  useEffect(() => {
    console.log(route.params);
    setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => handleSnapPress(0)}
          style={styles.menuButton}>
          {/* @ts-ignore */}
          <SVGIcon height={18} type="kebab" width={18} />
        </TouchableOpacity>
      ),
    });
    getPost();
    return () => {
      dispatch({type: EMPTY_SINGLE_POST});
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <ScrollView>
        {/* @ts-ignore */}
        {route.params.post ? (
          <>
            {/* @ts-ignore */}
            <Post allowed={true} post={route.params.post} single />
            <Divider style={{marginTop: 2, backgroundColor: '#bfbfbf'}} />
            {post.comments ? (
              <>
                {post.comments.map((comment, index) => (
                  <View>
                    <Comment commentData={comment} key={index} />
                  </View>
                ))}
              </>
            ) : (
              <>
                {post.comments && post.comments.length > 0 ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      marginTop: 130,
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      source={require('../../../assets/images/human-dog.png')}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        width: width / 2,
                        height: width / 2,
                      }}
                    />
                    <Button disabled>No Comments Yet</Button>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator animating color={Colors.blue300} />
                  </View>
                )}
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </ScrollView>
      <NewCommentInput
        loading={commLoading}
        onPress={onAddComment}
        setText={setText}
        text={text}
      />
      <PostBottomSheet
        // @ts-ignore
        figure={route.params.authorId === user._id ? 5 : 3}
        sheetRef={sheetRef}
        // @ts-ignore
        authorId={route.params.authorId}
        post={post}
        user={user}
      />
    </View>
  );
};

export default SinglePostScreen;
