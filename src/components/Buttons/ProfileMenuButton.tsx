import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MenuIcon from '@iconscout/react-native-unicons/icons/uil-ellipsis-h';
import {Theme} from '../../constants/appTheme';

interface Props {
  onPressHandler: any;
}

const ProfileMenuButton = ({onPressHandler}: Props) => {
  return (
    <TouchableOpacity style={styles.menuButtonStyles} onPress={onPressHandler}>
      <MenuIcon size="24" color="#848c8e" />
    </TouchableOpacity>
  );
};

export default ProfileMenuButton;

const styles = StyleSheet.create({
  menuButtonStyles: {
    marginLeft: 6,
    borderWidth: 2,
    borderRadius: 12,
    height: 46,
    borderColor: '#848c8e',
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
  },
});
