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
