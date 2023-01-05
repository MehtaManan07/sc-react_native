import {StyleSheet} from 'react-native';
import layout from '../../../constants/appLayout';
import {Theme} from '../../../constants/appTheme';

const {
  window: {height, width},
  isSmallDevice,
} = layout;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: Theme.colors.background,
    // borderRadius: 12,
    marginVertical: -5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '100%',
    justifyContent: 'center',
  },
  titleStyle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  avatar: {
    width: 50,
    alignSelf: 'center',
    borderRadius: 25,
    height: 50,
    marginRight: 10,
    // marginLeft: 10,
  },
});

export default styles;
