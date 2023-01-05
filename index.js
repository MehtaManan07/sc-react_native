/**
 * @format
 */
// ./src/constants/Reactotron
if (__DEV__) {
    import('./src/constants/Reactotron').then(() =>
      console.log('Reactotron Configured'),
    );
  }

import {AppRegistry} from 'react-native';
import Duh from './src/screens/ProfileScreens/FollowList/Navigator';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native'
LogBox.ignoreAllLogs(true)


AppRegistry.registerComponent(appName, () => App);
