import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {List, Colors} from 'react-native-paper';
import DeleteDialog from '../DeleteDialog';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../constants/api';
import {showMessage} from 'react-native-flash-message';

const PostBottomSheet = ({sheetRef, figure, authorId, user, post}) => {
  const [visible, setVisible] = React.useState(false);
  const {navigate} = useNavigation();
  const [type, setType] = React.useState('report');
  const snapPoints = useMemo(() => [`${figure}3%`], []);
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const backdropComponent = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  const deletePress = () => {
    setType('delete');
    setVisible(true);
    // setModalVisible(true);
  };
  const reportPress = () => {
    setType('report');
    setVisible(true);
  };
  const customShare = async () => {
    try {
      const res = await Share.open({
        message: `Hey there! Check out this post on Verse from ${post.author.firstName} ${post.author.lastName}\n`,
        title: 'Share this post',
        url: `https://verse.uno/post/${post._id}/${post.author._id}`,
      });
      console.log({res});
      handleClosePress();
    } catch (error) {
      console.log('err => ', error);
      handleClosePress();
    }
  };
  const navigateToEditPost = () => {
    const params = {
      from: 'single',
      message: post.description,
      id: post._id,
      image: post.image,
      community: {
        id: post.community._id,
        _id: post.community._id,
        name: post.community.name,
      },
    };
    // @ts-ignore
    navigate('CreatePostScreen', params);
    handleClosePress();
  };
  const savePress = async () => {
    const token = await AsyncStorage.getItem('verseJWTtoken');
    axios
      .get(`/api/v1/posts/save/${post._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res: any) => {
        if (res.data.success) {
          showMessage({message: 'Post saved successfully', type: 'success'});
          handleClosePress();
        }
      })
      .catch((err: any) => {
        console.log(err.response);
      });
  };
  console.log(post._id, post.image);
  return (
    <>
      <DeleteDialog
        text={type}
        setVisible={setVisible}
        visible={visible}
        id={post._id}
        single
      />
      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose
        backdropComponent={backdropComponent}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}>
        <List.Section>
          <List.Item
            left={() => (
              <List.Icon
                color={Colors.blue500}
                icon="bookmark"
                style={styles.image}
              />
            )}
            title="Save this Post"
            description="Save the post for later reference"
            onPress={savePress}
          />
          <List.Item
            left={() => (
              <List.Icon
                color={Colors.blue500}
                icon="share"
                style={styles.image}
              />
            )}
            title="Share Post"
            description="Share this post with others"
            onPress={customShare}
          />
          <List.Item
            left={() => (
              <List.Icon
                color={Colors.red800}
                icon="flag"
                style={styles.image}
              />
            )}
            title="Report Post"
            description="If it goes against community guidelines"
            onPress={reportPress}
          />
          {/*  @ts-ignore */}
          {post && user._id === authorId && (
            <List.Item
              left={() => (
                <List.Icon
                  color={Colors.blue500}
                  icon="pencil"
                  style={styles.image}
                />
              )}
              title="Edit Post"
              description="Have second thoughts? Go ahead"
              onPress={navigateToEditPost}
            />
          )}
          {/*  @ts-ignore */}
          {post && user._id === authorId && (
            <List.Item
              left={() => (
                <List.Icon
                  color={Colors.black}
                  icon="delete"
                  style={styles.image}
                />
              )}
              title="Delete Post"
              description="This action is permanent"
              onPress={deletePress}
            />
          )}
        </List.Section>
      </BottomSheet>
    </>
  );
};

export default PostBottomSheet;

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
  },
});
