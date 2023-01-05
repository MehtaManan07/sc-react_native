import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Theme} from '../../constants/appTheme';

interface Props {
  submitHandler: any;
  text: any;
  loading?: any;
}

const ProfileButton = ({text, submitHandler, loading}: Props) => {
  return (
    <Button
      mode={'outlined'}
      color={'#141152'}
      loading={loading}
      disabled={loading}
      contentStyle={styles.editButtonContentStyles}
      style={styles.editButtonStyles}
      labelStyle={styles.editButtonLabelStyles}
      onPress={submitHandler}>
      {text}
    </Button>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  editButtonStyles: {
    borderRadius: 12,
    borderColor: Theme.colors.primary,
    borderWidth: 2,
  },

  editButtonLabelStyles: {
    color: Theme.colors.primary,
    textTransform: 'none',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },

  editButtonContentStyles: {
    height: 42,
    width: '100%',
  },
});
