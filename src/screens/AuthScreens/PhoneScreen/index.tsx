import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Text, Headline} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {Theme} from '../../../constants/appTheme';
import NavButton from '../../../components/Buttons/NavigationButton';
import {useDispatch, useSelector} from 'react-redux';
import {getPhoneNums, sendOTP} from '../../../store/Actions/AuthActions';
import {showAndroidToast} from '../../../constants/appLayout';

export default function PhoneScreen() {
  const {navigate} = useNavigation();
  const auth = useSelector((state: any) => state.Auth);
  const [phoneNum, setPhoneNum] = useState('');
  const dispatch = useDispatch();
  const submitHandler = async () => {
    try {
      var test =
        /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(
          phoneNum,
        );
      if (test) {
        // await dispatch(sendOTP(phoneNum)); // comment out this line to test
        const condition = auth.nums.includes(`+91${phoneNum}`);
        // @ts-ignore
        navigate('OneTimePasswordScreen', {
          phoneNum: `+91${phoneNum}`,
          new: !condition,
        });
      } else {
        setPhoneNum('');
        showAndroidToast('Please enter valid mobile number');
        return;
      }
    } catch (error) {
      console.log({e: error});
    }
  };

  const getPhones = async () => {
    try {
      await dispatch(getPhoneNums());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <Headline numberOfLines={2} style={styles.title}>
          Let's start with your {'\n'}phone number
        </Headline>
        <View style={[styles.input]}>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: 'grey',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Inter-Medium',
              }}>
              {'+91 -'}
            </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            placeholder="xxxxxxxxxx"
            // @ts-ignore
            placeholderTextColor={Theme.colors.placeholder}
            keyboardType="numeric"
            maxLength={10}
            secureTextEntry={false}
            value={phoneNum}
            onChangeText={phone => setPhoneNum(phone)}
          />
        </View>
        <Text style={styles.subTitle}>
          by clicking continue you are agreeing to the terms of use {'\n'}
          and acknowledging the privacy policy close
        </Text>
        <NavButton
          onPress={submitHandler}
          sending={auth.loading}
          text={!auth.loading ? 'Continue' : 'Sending OTP'}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
