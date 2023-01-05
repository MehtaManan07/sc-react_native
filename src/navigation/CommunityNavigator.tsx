import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {FAB} from 'react-native-paper';
import Header from './../components/CommunityFeed/Header';
import {useSelector, useDispatch} from 'react-redux';
import AboutScreen from '../screens/CommunityScreens/AboutScreen';
import Post from '../components/Post';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getCommunitiy} from '../store/Actions/CommunityActions';
import {getCommunityPosts} from '../store/Actions/PostActions';
import Spinner from '../components/Spinner';
import {EMPTY_COMMUNITY} from '../store/types';

const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;
const HeaderHeight = 200;

const App = () => {
  const {posts, otherPosts, loading} = useSelector(
    (state: any) => state.Post,
  );
  const comm = useSelector((state: any) => state.Community);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  /**
   * stats
   */
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tab1', title: 'Feed'},
    {key: 'tab2', title: 'About'},
  ]);
  const [canScroll, setCanScroll] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * ref
   */
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);
  /**
   * PanResponder for header
   */
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (evt, gestureState) => {
        syncScrollOffset();
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        // @ts-ignore
        headerScrollY.setValue(scrollY._value);
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        listRefArr.current.forEach((item: any) => {
          if (item.key !== routes[_tabIndex.current].key) {
            return;
          }
          if (item.value) {
            item.value.scrollToOffset({
              offset: -gestureState.dy + headerScrollStart.current,
              animated: false,
            });
          }
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // @ts-ignore
        headerScrollStart.current = scrollY._value;
      },
    }),
  ).current;

  /**
   * PanResponder for list in tab scene
   */
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    }),
  ).current;
  const [postPadding, setPostPadding] = useState(HeaderHeight + TabBarHeight);
  /**
   * effect
   */
  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({value}) => {
      listRefArr.current.forEach((item: any) => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      if (value < 180) {
        setPostPadding(HeaderHeight + TabBarHeight);
      }
      if (value > 180) {
        setPostPadding(parseInt('40.2112'));
      }
    });
  }, [scrollY, tabIndex]);
  const fetchData = async (ref: Boolean = false) => {
    // @ts-ignore
    await dispatch(getCommunityPosts(route.params.id));
    if (!ref) {
      // @ts-ignore
      await dispatch(getCommunitiy(route.params.id));
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchData(true).then(() => setRefreshing(false));
  };
  useEffect(() => {
    fetchData();
    return () => {
      dispatch({type: EMPTY_COMMUNITY});
    };
  }, []);

  /**
   *  helper functions
   */
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach((item: any) => {
      if (item.key !== curRouteKey) {
        // @ts-ignore
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              // @ts-ignore
              offset: scrollY._value,
              animated: false,
            });
            // @ts-ignore
            listOffset.current[item.key] = scrollY._value;
          }
          // @ts-ignore
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  /**
   * render Helper
   */
  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[styles.header, {transform: [{translateY: y}]}]}>
        <Header />
      </Animated.View>
    );
  };

  const renderLabel = ({route, focused}) => {
    return (
      <Text style={[styles.label, {opacity: focused ? 1 : 0.5}]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({route}) => {
    const focused = route.key === routes[tabIndex].key;
    return (
      <>
        {route.key === 'tab1' ? (
          <>
            <Animated.FlatList
              style={{marginTop: 0}}
              {...listPanResponder.panHandlers}
              numColumns={1}
              ref={(ref: any) => {
                if (ref) {
                  const found = listRefArr.current.find(
                    (e: any) => e.key === route.key,
                  );
                  if (!found) {
                    listRefArr.current.push({
                      // @ts-ignore
                      key: route.key,
                      // @ts-ignore
                      value: ref,
                    });
                  }
                }
              }}
              // @ts-ignore
              onScroll={
                focused
                  ? Animated.event(
                      [
                        {
                          nativeEvent: {contentOffset: {y: scrollY}},
                        },
                      ],
                      {useNativeDriver: true},
                    )
                  : null
              }
              onMomentumScrollBegin={onMomentumScrollBegin}
              onScrollEndDrag={onScrollEndDrag}
              onMomentumScrollEnd={onMomentumScrollEnd}
              ItemSeparatorComponent={() => <View style={{height: 0}} />}
              ListHeaderComponent={() => <View style={{height: 0}} />}
              contentContainerStyle={{
                paddingTop: HeaderHeight + TabBarHeight,
                paddingHorizontal: 0,
              }}
              showsHorizontalScrollIndicator={false}
              data={otherPosts}
              refreshing={refreshing}
              onRefresh={onRefresh}
              renderItem={({item}) => <Post post={item} allowed single={false} />}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
            <FAB
              style={{
                position: 'absolute',
                marginRight: 16,
                marginBottom: 26,
                right: 0,
                bottom: 0,
                backgroundColor: '#D6E1FD',
              }}
              label={'Post'}
              icon="plus"
              color={'#10194A'}
              onPress={() =>
                // @ts-ignore
                navigate('Post', {
                  screen: 'CreatePostScreen',
                  params: {
                    from: 'Community',
                    community: otherPosts[0].community,
                  },
                })
              }
            />
          </>
        ) : (
          <Animated.ScrollView
            style={styles.aboutContainer}
            {...listPanResponder.panHandlers}
            // @ts-ignore
            onScroll={
              focused
                ? Animated.event(
                    [
                      {
                        nativeEvent: {contentOffset: {y: scrollY}},
                      },
                    ],
                    {useNativeDriver: true},
                  )
                : null
            }
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            contentContainerStyle={{
              paddingTop: postPadding, // 40,
              paddingHorizontal: 0,
            }}
            showsHorizontalScrollIndicator={false}>
            <AboutScreen />
          </Animated.ScrollView>
        )}
      </>
    );
  };

  const renderTabBar = props => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transform: [{translateY: y}],
          width: '100%',
        }}>
        <TabBar
          {...props}
          onTabPress={({route, preventDefault}) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onSwipeStart={() => setCanScroll(false)}
        onSwipeEnd={() => setCanScroll(true)}
        swipeEnabled={false}
        onIndexChange={id => {
          _tabIndex.current = id;
          setIndex(id);
        }}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: windowWidth,
        }}
      />
    );
  };

  return (
    <>
      {comm.community && otherPosts.length > 0 ? (
        <View style={styles.container}>
          {renderTabView()}
          {renderHeader()}
        </View>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  aboutContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    height: HeaderHeight,
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#FFF',
  },
  label: {fontSize: 14, fontFamily: 'Inter-Bold', color: 'black'},
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#FFF',
    height: TabBarHeight,
  },
  indicator: {backgroundColor: 'black', borderBottomWidth: 3},
});

export default App;
