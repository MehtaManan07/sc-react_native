import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  iconGallery: {
    width: 50,
    height: 50,
    margin: 5,
  },
  iconCamera: {
    width: 55,
    height: 55,
    margin: 2,
    top: 3,
  },
});

export const ImageIcon = () => {
  return (
    <Image style={styles.iconGallery} source={require('./image-gallery.png')} />
  );
};

export const CameraIcon = () => {
  return (
    <Image style={styles.iconCamera} source={require('./photo-camera.png')} />
  );
};
