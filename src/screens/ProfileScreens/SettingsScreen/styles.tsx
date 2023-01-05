import {StyleSheet, Platform} from 'react-native';
import {Theme} from '../../../constants/appTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  listGroup: {
    marginHorizontal: 10,
    marginTop: 20,
    flexDirection: 'column',
  },
  listItem: {
    backgroundColor: '#f5f3f4',
    borderRadius: 12,
    marginVertical: 5,
    height: 60,
    paddingTop: 15,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: 'black',
    fontSize: 16,
    top: -4,
    fontFamily: 'Inter-Bold',
  },
  footerText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: 30,
    right: 0,
    flex: 1,
  },
  footerTextStyles: {
    color: '#adb5bd',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
});

export default styles;
