import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Modal, Portal, Button, Chip, List, Appbar} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from './styles';
import ImageModal from '../../../components/Profile/ImageModal';
import {newPost, updatePost} from '../../../store/Actions/PostActions';

export default function CreatePostBottomSheetContent({}) {
  const {user} = useSelector((state: any) => state.Auth);
  const {loading} = useSelector((state: any) => state.Post);
  const {communityNames} = useSelector((state: any) => state.Community);
  const dispatch = useDispatch();
  const route = useRoute();
  const {goBack, setOptions} = useNavigation();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [community, setCommunity] = useState({
    _id: null,
    name: 'Select a community',
    id: null,
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [uri, setUri] = useState(null);

  // snackbar
  const submitHandler = () => {
    const data = new FormData();
    if (community.name === 'Select a community') {
      showMessage({
        message: 'Please Select a community',
        type: 'danger',
        backgroundColor: '#f13a59',
        color: '#FFF',
      });
      return;
    }
    // @ts-ignore
    const values = {description: message, community: community._id};
    if (imageData && uri) {
      data.append('file', imageData);
    }
    for (let item in values) {
      data.append(item, values[item]);
    }
    // @ts-ignore
    const {id, from} = route.params;
    if (from === `single`) {
      dispatch(updatePost(data, showMessage, goBack, id));
      // console.log(JSON.stringify(data))
    } else {
      dispatch(newPost(data, showMessage, goBack));
    }
  };
  useEffect(() => {
    // @ts-ignore
    const {from, image, message, community} = route.params;
    setOptions({title: from === 'single' ? 'Edit Post' : 'Create Post'});
    if (from !== 'Home') {
      setCommunity(community);
      if (from === 'single') {
        setMessage(message);
        if (image) {
          setUri(image.uri);
        }
      }
    }
  }, []);
  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainerStyle}>
          <Text style={styles.modalCommunityTitle}>Select Community</Text>
          <View style={styles.listGroup}>
            <FlatList
              data={communityNames}
              renderItem={({item}) => (
                <RNBounceable
                  bounceEffect={0.8}
                  onPress={() => {
                    setCommunity(item);
                    setVisible(false);
                  }}>
                  <List.Item
                    // @ts-ignore
                    title={`${item.name}`}
                    titleStyle={styles.communityTitleStyle}
                    style={styles.communityListItem}
                  />
                </RNBounceable>
              )}
              // @ts-ignore
              keyExtractor={item => item._id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Modal>
      </Portal>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.customListView}>
          <Image
            style={styles.avatar}
            source={{
              uri: user.avatar.uri,
            }}></Image>
          <View style={styles.infoWrapper}>
            <View style={styles.namesWrapper}>
              <Text style={{fontSize: 16, fontFamily: 'Inter-SemiBold'}}>
                {user.firstName} {user.lastName}
              </Text>
            </View>
            <View style={styles.extraInfoWrapper}>
              <Chip icon="chevron-down" onPress={() => setVisible(true)}>
                {/* @ts-ignore */}
                {community ? community.name : 'Select a community'}
              </Chip>
            </View>
          </View>
        </View>

        <TextInput
          value={message}
          onChangeText={msg => setMessage(msg)}
          placeholderTextColor={'#adb5bd'}
          placeholder="What do you want to talk about?"
          multiline
          selectionColor={'#c8e7ff'}
          // onFocus
          maxLength={3000}
          textBreakStrategy={'highQuality'}
          autoCompleteType={'off'}
          style={styles.editor}
        />
        {uri ? (
          !imageLoading ? (
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => setUri(null)}
                activeOpacity={0.5}
                style={styles.touchableOpacity}>
                <List.Icon
                  color={'black'}
                  icon="close"
                  style={styles.listIcon}
                />
              </TouchableOpacity>
              <FastImage
                style={styles.postImage}
                source={{
                  // @ts-ignore
                  uri,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          ) : (
            <Text>{JSON.stringify(uri)}</Text>
          )
        ) : (
          <></>
        )}
      </ScrollView>

      <Appbar style={styles.bottomBar}>
        <Appbar.Action
          icon="image"
          onPress={() => setImageModalVisible(true)}
        />
        <Appbar.Action icon="poll" disabled />
        <Button
          mode={'contained'}
          color={'#D6E1FD'}
          disabled={loading}
          loading={loading}
          contentStyle={styles.postButtonContentStyles}
          style={styles.postButtonStyles}
          labelStyle={styles.postButtonLabelStyles}
          onPress={submitHandler}>
          {/* @ts-ignore */}
          {route.params.from === `single` ? 'Update' : `Post`}
        </Button>
      </Appbar>
      <ImageModal
        setLoading={setImageLoading}
        setUri={setUri}
        setVisible={setImageModalVisible}
        setImageData={setImageData}
        visible={imageModalVisible}
      />
    </View>
  );
}
