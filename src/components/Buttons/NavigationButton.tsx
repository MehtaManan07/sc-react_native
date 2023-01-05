import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Theme} from '../../constants/appTheme';
import layout, {calc} from '../../constants/appLayout';

const {
  window: {height, width},
  isSmallDevice,
} = layout;

interface Props {
  onPress: any;
  text: any;
  sending?: any;
  icon?: any;
}

const NavButton = ({onPress, text, sending, icon}: Props) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon={icon}
        contentStyle={styles.navButtonContentStyles}
        disabled={sending}
        loading={sending}
        style={styles.navButtonStyles}
        labelStyle={styles.navButtonLabelStyles}
        color={Theme.colors.button}
        onPress={onPress}>
        {text}
      </Button>
    </View>
  );
};

export default NavButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    borderRadius: 30,
  },
  navButtonStyles: {
    borderRadius: 21,
    marginBottom: calc('height', 30),
    alignSelf: 'center',
    marginHorizontal: calc('width', 34),
  },
  navButtonLabelStyles: {
    color: Theme.colors.primary,
    textTransform: 'none',
    fontFamily: 'Inter-Bold',
    fontSize: calc('height', 18),
  },

  navButtonContentStyles: {
    height: calc('height', 60),
    minWidth: '90%',
    justifyContent: 'center',
  },
});
