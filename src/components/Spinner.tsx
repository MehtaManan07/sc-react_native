import React from 'react';
import {ActivityIndicator, Colors} from 'react-native-paper';

const Spinner = () => (
  <ActivityIndicator
    animating
    style={{flex: 1, justifyContent: 'center'}}
    color={Colors.blue300}
    size="small"
  />
);

export default Spinner;
