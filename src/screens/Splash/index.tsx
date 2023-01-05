import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getMe} from '../../store/Actions/AuthActions';
const SplashImg = require('../../assets/images/splash.png');
import {Theme} from '../../constants/appTheme';

export default function SplashScreen() {
  const {height, width} = Dimensions.get('screen');
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const focused = useIsFocused();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.colors.background,
    },
    image: {
      width,
      height,
    },
  });

  const userCheck = async () => {
    const token = await AsyncStorage.getItem('verseJWTtoken');
    console.log({ token },'\n\n\n\n')
    if (token) {
      await dispatch(getMe(navigate, token));
      // @ts-ignore
      navigate('Home');
    } else {
      setTimeout(() => {
        // @ts-ignore
        navigate('Auth');
      }, 1500);
    }
  };
  useEffect(() => {
    if (focused) {
      userCheck();
    }
  }, [focused]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={SplashImg} resizeMode="cover" />
    </View>
  );
}
