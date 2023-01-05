import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Subheading} from 'react-native-paper';

const ProfileInput = ({value, onChange, label}) => {
  return (
    <View style={styles.content}>
      <Subheading style={styles.subHeading}>{label}</Subheading>
      <TextInput
        style={styles.textInputContainer}
        selectionColor={'#c8e7ff'}
        placeholderTextColor={'#adb5bd'}
        maxLength={10}
        caretHidden={false}
        autoCapitalize="sentences"
        keyboardType="default"
        underlineColorAndroid="#BDBDBD"
        returnKeyType="next"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default ProfileInput;

const styles = StyleSheet.create({
  content: {
    marginVertical: 3,
  },
  subHeading: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
  },
  textInputContainer: {
    color: 'black',
    height: 50,
    right: 3,
    textAlign: 'left',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 10,
  },
});
