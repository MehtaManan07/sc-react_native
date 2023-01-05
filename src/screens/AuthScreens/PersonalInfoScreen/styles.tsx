import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '../../../constants/appTheme';
const {width, height} = Dimensions.get('screen');
const _width = width * 0.9;
const _height = _width * 0.5625;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 120,
  },
  card: {
    width: _width,
    height: _height,
    overflow: 'hidden',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
    justifyContent: 'center',
    elevation: 15,
  },
  ImageOne: {
    width: _width * 1.5,
    height: _height * 1.5,
    resizeMode: 'cover',
    position: 'absolute',
    alignSelf: 'center',
  },
  ImageTwo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 80,
    borderWidth: 2,
    borderColor: Theme.colors.text,
    backgroundColor: '#FFF',
  },
  ImageThree: {
    marginRight: 10,
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  viewOuterOne: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 0,
  },
  viewOuterTwo: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  viewInnerOne: {
    flex: 1,
    padding: 10,
  },
  viewInnerTwo: {
    flex: 1,
    alignSelf: 'center',
    padding: 10,
  },
  viewInnerInnerOne: {
    flex: 1,
    justifyContent: 'center',
  },
  textOne: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
  },
  textTwo: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
  },
  textThree: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'Gilroy-Bold',
    opacity: 0.6,
    marginTop: 20,
  },
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },

  options: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
