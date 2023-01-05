import {Dimensions, ToastAndroid} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

export const showAndroidToast = (
  message: any,
  position?: 'top' | 'bottom' | 'center',
) => {
  let pos = ToastAndroid.TOP;
  if (position === 'bottom') {
    pos = ToastAndroid.BOTTOM;
  } else if (position === 'center') {
    pos = ToastAndroid.CENTER;
  }
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    pos,
    25,
    70,
  );
};

export const calc = (prop: 'width' | 'height', value: number) => {
  const myHeight = 806;
  const myWidth = 392;
  const factor = prop === 'width' ? myWidth : myHeight;
  const multiply = prop === 'height' ? height : width;
  return (value * multiply) / factor;
};
