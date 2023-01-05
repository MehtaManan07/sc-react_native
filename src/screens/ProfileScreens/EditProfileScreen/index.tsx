import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {useIsFocused} from '@react-navigation/core';
import EditProfileForm from '../../../components/Profile/EditProfileForm';
import Spinner from '../../../components/Spinner';
import { getUsernames } from '../../../store/Actions/AuthActions';

export default function EditProfileScreen() {
  const isFocused = useIsFocused();
  const auth = useSelector((state: any) => state.Auth);
  const {user, usernames} = auth;
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    avatar: '',
    cloudinary_id: null
  });
  const dispatch = useDispatch()
  const setUser = async () => {
    setValues({
      ...values,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar.uri,
      cloudinary_id: user.avatar.cloudinary_id
    });
    await dispatch(getUsernames(user.username))
  };

  useEffect(() => {
    if (isFocused) {
      setUser();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      {!user ? (
        <Spinner />
      ) : (
        <EditProfileForm
          setValues={setValues}
          styles={styles}
          values={values}
          usernames={usernames}
        />
      )}
    </SafeAreaView>
  );
}
