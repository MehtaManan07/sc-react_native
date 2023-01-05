import {StyleSheet, Dimensions} from 'react-native';
import {Theme} from '../../../constants/appTheme';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  outer: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.25,
    paddingHorizontal: 20,
    width,
    justifyContent: 'space-between',
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  animated: {paddingBottom: height * 0.25},
  outerAnimated: {
    width,
    justifyContent: 'center',
    height: '95%',
  },
  innerOneAnimated: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerTwoAnimated: {padding: 20},
  imageAnimated: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  textAnimated: {
    color: '#1E2022',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 28,
    paddingVertical: 10,
    fontFamily: 'Gilroy-Bold',
  },
  animatedLast: {
    width: 7,
    height: 7,
    borderRadius: 10,
    margin: 6,
    backgroundColor: '#414757',
  },
});

export default styles;
