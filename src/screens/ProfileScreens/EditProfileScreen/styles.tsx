import {StyleSheet, Platform} from 'react-native';
import {Theme} from '../../../constants/appTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  bioText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Theme.colors.text,
    lineHeight: 20,
    textAlign: 'left',
  },
  viewOne: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  viewTwo: {
    marginVertical: 30,
    width: 100,
  },
  touchableOpacityOne: {
    position: 'absolute',
    zIndex: 1,
    bottom: -15,
    right: -15,
  },
  listIconOne: {
    borderRadius: 15,
    height: 30,
    width: 30,
    backgroundColor: '#bbb',
  },
  imageOne: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  content: {
    marginVertical: 3,
  },
  subHeading: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
  },
  editor: {
    fontSize: 14,
    textAlignVertical: 'top',
    right: 3,
    fontFamily: 'Inter-Medium',
    color: 'black',
    marginTop: 10,
    paddingBottom: 18,
  },
  scrollStyle: {
    paddingHorizontal: 20,
  },
});

export default styles;
