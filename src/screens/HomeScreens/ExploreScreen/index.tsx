import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import CommunityCard from '../../../components/CommunityCard';
import {getCommunities} from '../../../store/Actions/CommunityActions';
import {useIsFocused} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

export default function ExploreScreen() {
  const dispatch = useDispatch();
  const community = useSelector((state: any) => state.Community);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
  const fetchCommunities = async () => {
    await dispatch(getCommunities('populate_createdBy=firstName,lastName'));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchCommunities().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, []);
  const onFocusAlert = () =>
    showMessage({
      message: 'Searching for educators is arriving soon 🙂',
      duration: 1500,
      type: 'default',
      backgroundColor: '#5a189a',
      color: '#FFF',
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          onIconPress={onFocusAlert}
          onFocus={onFocusAlert}
          placeholder="Explore Educators"
          onChangeText={query => setSearchQuery(query)}
          placeholderTextColor="gray"
          style={styles.searchbar}
          value={searchQuery}
        />
      </View>
      {community.communities ? (
        <FlatList
          data={community.communities}
          renderItem={({item}) => (
            <>
              <CommunityCard community={item} />
            </>
          )}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={styles.viewContainer}
          keyExtractor={item => item._id.toString()}
        />
      ) : (
        <ActivityIndicator animating color="#000" />
      )}
    </SafeAreaView>
  );
}
