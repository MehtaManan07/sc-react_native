import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Menu} from 'react-native-paper';
import {SVGIcon} from '../SVGIcon';
import {useDispatch, useSelector} from 'react-redux';
import {PROFILE_LOADING} from '../../store/types';
import FastImage from 'react-native-fast-image';
import DeleteDialog from '../../components/DeleteDialog';
import {timee} from '../../constants/functions';

const PostHeader = ({styles, navigateToCommunity, post, single}) => {
  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [type, setType] = React.useState('report');
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const {user} = useSelector((state: any) => state.Auth);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const deletePress = () => {
    setType('delete');
    setVisible(false);
    setModalVisible(true);
  };
  const usernamePress = async () => {
    if (user._id === author._id) {
      /* @ts-ignore */
      navigate('Home', {screen: 'you'});
      return;
    }
    dispatch({type: PROFILE_LOADING});
    /* @ts-ignore */
    navigate('Profile', {
      screen: 'PeerProfileScreen',
      params: {id: author._id, username: author.username},
    });
  };
  const {community, author} = post;
  const t = timee(post.createdAt);
  return (
    <View style={styles.viewOuter}>
      <View style={styles.customListView}>
        <DeleteDialog
          text={type}
          setVisible={setModalVisible}
          visible={modalVisible}
          id={post._id}
        />
        <TouchableOpacity onPress={usernamePress}>
          <FastImage
            style={styles.avatar}
            source={{
              uri: author.avatar.uri,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <View style={styles.infoWrapper}>
          <View style={styles.namesWrapper}>
            <TouchableOpacity onPress={navigateToCommunity}>
              <Text style={styles.postHeader}>{community.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.extraInfoWrapper}>
            <Text style={styles.time}>
              {t === 'Just now'
                ? 'Just now'
                : `${Math.round(
                    parseFloat(t.substring(0, t.length - 1)),
                  )}${t.substring(t.length - 1, t.length)}`}
            </Text>
            {/* @ts-ignore */}
            <SVGIcon height={4} type="dot" width={4} />

            <Text style={styles.postedBy}>Posted by {''}</Text>
            <TouchableOpacity onPress={usernamePress}>
              <Text
                style={{
                  color: '#302D22',
                  fontFamily: 'Inter-SemiBold',
                  fontSize: 12,
                }}>
                @{author.username}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {!single && (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          contentStyle={styles.menuContainer}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.menu}>
              {/* @ts-ignore */}
              <SVGIcon height={18} type="kebab" width={18} />
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              setType('report');
              setVisible(false);
              setModalVisible(true);
              // showMessage({
              //   message: 'This post was successfully reported',
              //   type: 'default',
              //   backgroundColor: '#C7F0D0',
              //   color: '#05132A',
              // });
            }}
            title="Report"
          />
          {author._id === user._id && (
            <Menu.Item title="Delete" onPress={deletePress} />
          )}
        </Menu>
      )}
    </View>
  );
};

export default PostHeader;
