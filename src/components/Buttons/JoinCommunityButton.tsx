import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

const JoinCommunityButton = ({headerStyles, loading, text, onPress}) => {
  return (
    <View style={headerStyles.buttonContainer}>
      <Button
        mode={'contained'}
        color={'#C7F0D0'}
        contentStyle={headerStyles.followButtonContentStyles}
        style={headerStyles.followButtonStyles}
        disabled={loading}
        loading={loading}
        labelStyle={headerStyles.followButtonLabelStyles}
        onPress={onPress}>
        {text}
      </Button>
    </View>
  );
};

export default JoinCommunityButton;
