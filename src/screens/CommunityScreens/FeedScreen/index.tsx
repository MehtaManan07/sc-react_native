import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {ActivityIndicator, FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import styles from './styles';
import Post from '../../../components/Post';

export default function FeedScreen({}) {
  const {navigate} = useNavigation();
  const post = useSelector((state: any) => state.Post);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        style={styles.listContainter}>
        {post.posts ? (
          post.posts.map((p, i) => {
            return <Post post={p} allowed key={i} />;
          })
        ) : (
          <ActivityIndicator animating color="#000" />
        )}
      </ScrollView>
      <FAB
        style={styles.fab}
        label={'Post'}
        icon="plus"
        color={'white'}
        // @ts-ignore
        onPress={() => navigate('Post', {screen: 'CreatePostScreen'})}
      />
    </SafeAreaView>
  );
}
