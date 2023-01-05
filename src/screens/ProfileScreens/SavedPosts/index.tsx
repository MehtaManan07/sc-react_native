import React, {useState, useEffect} from 'react';
import { FlatList, View, SafeAreaView} from 'react-native';
import Post from '../../../components/Post';
import SkeletonView from '../../../components/Post/SkeletonView';
import axios from '../../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import styles from './styles'

const index = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useSelector((state: any) => state.Auth);
  const fetchPosts = async () => {
    const token = await AsyncStorage.getItem('verseJWTtoken');
    console.log(token);
    axios
      .get(`/api/v1/posts/saved/${user._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(({ data }) => {
        //   @ts-ignore
        setPosts(data.data.savedPosts);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  const onRefresh = () => {};
  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({item}) => (
            <>
              <Post post={item} allowed single={false} />
            </>
          )}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          refreshing={refreshing}
          onRefresh={onRefresh}
          //   @ts-ignore
          keyExtractor={item => item._id.toString()}
        />
      ) : (
        <SkeletonView />
      )}
    </SafeAreaView>
  );
};

export default index;

