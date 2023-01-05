import {StyleSheet, Platform} from 'react-native';
import {Theme} from '../../../constants/appTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    marginTop: 12,
    marginHorizontal: 9,
    borderRadius: 10,
    alignItems: 'center',
    bottom: 6,
    padding: 10,
  },
});

export default styles;
