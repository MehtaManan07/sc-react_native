import {Alert, Animated, KeyboardAvoidingView} from 'react-native';
import {Headline} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import NavButton from '../../../components/Buttons/NavigationButton';
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import {loginuser} from '../../../store/Actions/AuthActions';
import {getNames} from '../../../store/Actions/CommunityActions';
import {showMessage} from 'react-native-flash-message';

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 4;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: 1,
      // @ts-ignore
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const OneTimePasswordScreen = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.Auth);
  const route = useRoute();
  //declarations for input field
  const [value, setValue] = useState('');
  // @ts-ignore
  const [phone, setPhone] = useState(route?.params?.phoneNum);
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Navigation

  const {navigate} = useNavigation();
  const submitHandler = async (e: any) => {
    setLoading(true);
    // if (value === auth.otp) {
    // comment out this line to test
    if (value === '1111') {
      // @ts-ignore
      if (route.params.new) {
        setTimeout(() => {
          setLoading(false);
          // @ts-ignore
          navigate('NameScreen', {phoneNum: route.params?.phoneNum});
        }, 1000);
      } else {
        setTimeout(async () => {
          setLoading(false);
          await dispatch(loginuser({phoneNum: phone, isNew: false}, navigate));
          await dispatch(getNames());
        }, 1000);
      }
    } else {
      setLoading(false);
      setValue('');
      showMessage({
        message: 'Invalid Code! Please enter the correct OTP',
        type: 'danger',
        backgroundColor: 'rgb(255, 69, 58)',
        color: '#FFF',
      });
      return;
    }
  };
  useEffect(() => {}, []);

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <Headline numberOfLines={2} style={styles.title}>
          Verify OTP sent to {'\n'} +91 {`${phone.slice(3, 5)}`}XXXXXX
          {`${phone.slice(11, 13)}`}
        </Headline>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />

        <NavButton
          onPress={submitHandler}
          sending={loading}
          text={!loading ? 'Verify' : 'Verifying'}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OneTimePasswordScreen;
