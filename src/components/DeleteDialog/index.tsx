import React, {useState} from 'react';
import {Text} from 'react-native';
import {Portal, Dialog, Button} from 'react-native-paper';
import {styles} from './styles';
import layout from '../../constants/appLayout';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {deletePost} from '../../store/Actions/PostActions';
import axios from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const {
  window: {height, width},
} = layout;

const DeleteDialog = ({visible, setVisible, text, id, single = false}: any) => {
  const dispatch = useDispatch();
  const {goBack} = useNavigation();
  const [loading, setLoading] = useState(false);
  const toggleModal = () => {
    setVisible(!visible);
  };
  const submitHandler = async () => {
    setLoading(true);
    if (text === 'delete') {
      await dispatch(deletePost(id));
      setLoading(false);
      setVisible(false);
      if (single) {
        goBack();
      }
    } else {
      const token = await AsyncStorage.getItem('verseJWTtoken');
      axios
        .get(`/api/v1/posts/report/${id}`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(() => {
          showMessage({
            message: 'This post was successfully reported',
            type: 'default',
            backgroundColor: '#C7F0D0',
            color: '#05132A',
          });
          setLoading(false);
          setVisible(false);
          if (single) {
            goBack();
          }
        })
        .catch(err => {
          showMessage({
            message: `${err.response.data.error}`,
            type: 'default',
            backgroundColor: '#f5222d',
            color: '#fff',
          });
          setLoading(false);
          setVisible(false);
        });
    }
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleModal} style={styles.modal}>
        <Dialog.Title style={styles.title}>{`${text[0].toUpperCase()}${text.slice(1)}`} the Post</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.content}>
            Are you sure you want to {text} this post?
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.buttonView}>
          <Button
            onPress={toggleModal}
            compact={true}
            labelStyle={styles.labelStyle}
            style={{marginRight: width * 0.0127}}
            color="#000">
            Cancel
          </Button>
          <Button
            onPress={submitHandler}
            compact={true}
            disabled={loading}
            loading={loading}
            labelStyle={styles.labelStyle}
            style={{marginLeft: width * 0.0127}}
            color="#e43e64">
            {`${text[0].toUpperCase()}${text.slice(1)}`}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteDialog;
import {StyleSheet} from 'react-native';
import layout from '../../constants/appLayout';
import {Theme} from '../../constants/appTheme';

const {
  window: {height, width},
  isSmallDevice,
} = layout;

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#f6fff8',
    borderRadius: 14,
  },

  title: {
    color: '#000',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },

  content: {
    color: '#555A5D',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },

  labelStyle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    textTransform: 'capitalize',
  },

  buttonView: {
    marginRight: width * 0.03,
    marginTop: -10,
  },
});
