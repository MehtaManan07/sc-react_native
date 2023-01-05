import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import commentListStyling from './commentListStyling';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SendIcon from '@iconscout/react-native-unicons/icons/uil-message';

const NewCommentInput = ({loading, text, setText, onPress}) => {
  return (
    <KeyboardAvoidingView enabled>
      <View style={commentListStyling.textInputContainer}>
        <TextInput
          onChangeText={text => setText(text)}
          value={text}
          placeholderTextColor="#C3C5C8"
          style={commentListStyling.textInput}
          multiline={true}
          placeholder="Write a comment.."
        />
        <TouchableOpacity onPress={onPress}>
          {!loading ? (
            <SendIcon
              style={commentListStyling.icon}
              size="30"
              color="#4361ee"
            />
          ) : (
            <ActivityIndicator
              animating
              style={{flex: 1, right: 10}}
              color={Colors.blue300}
              size="small"
            />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewCommentInput;
