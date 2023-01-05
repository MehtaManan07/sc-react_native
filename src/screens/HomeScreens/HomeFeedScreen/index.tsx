import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import Post from '../../../components/Post';
import {styles} from './styles';
import SkeletonView from '../../../components/Post/SkeletonView';
import {getNames} from '../../../store/Actions/CommunityActions';
import {getPosts} from '../../../store/Actions/PostActions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateuser} from '../../../store/Actions/AuthActions';

export default function HomeFeedScreen({}) {
  const {navigate} = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const post = useSelector((state: any) => state.Post);
  const auth = useSelector((state: any) => state.Auth);
  const fetchNames = async () => {
    await dispatch(getNames());
  };
  const fetchPosts = async () => {
    // &community[in]=${auth.user.communities}
    await dispatch(
      getPosts(
        `page=${page}&limit=50&populate_community=name&populate_author=username,avatar,firebaseToken,firstName,lastName`,
      ),
    );
  };
  const manageFirebaseToken = async () => {
    messaging()
      .getToken()
      .then(async firebaseToken => {
        await AsyncStorage.setItem('firebaseTokenVerse', firebaseToken);
        // console.log(firebaseToken, auth.user.firebaseToken, firebaseToken === auth.user.firebaseToken)
        if (auth.user.firebaseToken !== firebaseToken) {
          await dispatch(updateuser({firebaseToken}, auth.user._id, false));
          console.log('reached manageFirebaseToken');
        }
      });
  };
  useEffect(() => {
    fetchNames();
    fetchPosts();
    manageFirebaseToken();
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNames();
    fetchPosts().then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {post.posts ? (
        <FlatList
          data={post.posts}
          renderItem={({item}) => (
            <>
              <Post post={item} allowed single={false} />
            </>
          )}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          style={styles.listContainter}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={item => item._id.toString()}
        />
      ) : (
        <SkeletonView />
      )}
      <FAB
        style={styles.fab}
        label={'Post'}
        icon="plus"
        color={'#10194A'}
        onPress={() =>
          // @ts-ignore
          navigate('Post', {screen: 'CreatePostScreen', params: {from: 'Home'}})
        }
      />
    </SafeAreaView>
  );
}
