import {StyleSheet} from 'react-native';
import layout, {calc} from '../../constants/appLayout';
import {Theme} from '../../constants/appTheme';
import {Dimensions} from 'react-native';

const {
  window: {height, width},
  isSmallDevice,
} = layout;

const screenWidth = Math.round(Dimensions.get('window').width);

export const styles = StyleSheet.create({
  container: {
    marginBottom: calc('height', 20),
    alignItems: 'center',
  },
  footnoteTextStyle: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: calc('height', 12),
  },
  background: {
    height: calc('height', 200),
    width: screenWidth - 32,
  },
});
