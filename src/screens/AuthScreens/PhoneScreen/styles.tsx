import {StyleSheet, Platform} from 'react-native';
import {Theme} from '../../../constants/appTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 800,
    paddingTop: 14,
    paddingHorizontal: 20,
    backgroundColor: Theme.colors.background,
  },

  title: {
    marginTop: 50,
    lineHeight: 36,
    color: '#000',
    fontSize: 28,
    textAlign: 'left',
    fontFamily: 'Gilroy-Bold',
    marginBottom: 100,
  },

  subTitle: {
    marginBottom: 20,
    color: '#000',
    fontSize: 10,
    textAlign: 'center',
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#DADADA',
    width: 240,
    marginTop: 50,
    alignSelf: 'center',
    paddingHorizontal: 23,
    marginBottom: 50,
  },

  inputStyle: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'black',
    marginBottom: -2,
    marginLeft: 2,
  },
});

export default styles;
