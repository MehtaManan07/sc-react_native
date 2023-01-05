import React, {useState, useRef, useEffect} from 'react';
import {View, Alert, KeyboardAvoidingView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, Headline} from 'react-native-paper';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavButton from '../../../components/Buttons/NavigationButton';
import {Theme} from '../../../constants/appTheme';
import styles from './styles';

export default function NameScreen() {
  const {navigate, goBack} = useNavigation();

  let textInput = useRef(null);
  const [focusInput, setFocusInput] = useState(true);
  const route = useRoute();
  let initialState = {
    firstName: '',
    lastName: '',
    // @ts-ignore
    phoneNum: route.params.phoneNum,
  };
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const {firstName, lastName} = values;
  const [firstErrorMessage, setFirstErrorMessage] = useState('');
  const [lastErrorMessage, setLastErrorMessage] = useState('');

  const submitHandler = () => {
    if (!firstName) {
      setFirstErrorMessage('First name is required');
    }
    if (!lastName) {
      setLastErrorMessage('Last name is required');
    }
    if (!(firstName && lastName)) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // @ts-ignore
      navigate('PersonalInfoScreen', {values});
    }, 700);
  };

  useEffect(() => {
    // @ts-ignore
    textInput.focus();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <Headline numberOfLines={2} style={styles.title}>
          Enter your Full Name
        </Headline>
        <View style={styles.input}>
          <TextInput
            // @ts-ignore
            ref={input => (textInput = input)}
            value={firstName}
            style={styles.inputStyle}
            selectionColor={Theme.colors.selection}
            placeholderTextColor={Theme.colors.placeholder}
            maxLength={15}
            caretHidden={true}
            placeholder="First Name"
            autoCapitalize="sentences"
            keyboardType="default"
            selectTextOnFocus={true}
            underlineColorAndroid="black"
            onFocus={e => {
              if (firstErrorMessage) {
                setFirstErrorMessage('');
              }
              setFocusInput(true);
            }}
            onBlur={e => setFocusInput(false)}
            returnKeyType="next"
            onChangeText={e => {
              if (firstErrorMessage) {
                setFirstErrorMessage('');
              }
              setValues({...values, firstName: e});
            }}
          />
          <Text style={styles.subTitle}>{firstErrorMessage}</Text>
          <TextInput
            value={lastName}
            style={styles.inputStyle}
            selectionColor={Theme.colors.selection}
            placeholderTextColor={Theme.colors.placeholder}
            maxLength={15}
            caretHidden={true}
            placeholder="Last Name"
            autoCapitalize="sentences"
            keyboardType="default"
            selectTextOnFocus={true}
            underlineColorAndroid="black"
            returnKeyType="go"
            onFocus={e => {
              if (lastErrorMessage) {
                setLastErrorMessage('');
              }
            }}
            onChangeText={e => {
              if (lastErrorMessage) {
                setLastErrorMessage('');
              }
              setValues({...values, lastName: e});
            }}
          />
          <Text style={styles.subTitle}>{lastErrorMessage}</Text>
        </View>
        <NavButton onPress={submitHandler} sending={loading} text="Save" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
