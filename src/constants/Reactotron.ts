// import Reactotron from 'reactotron-react-native';
// import {reactotronRedux} from 'reactotron-redux';
// const reactotron = Reactotron
//   // .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
//   .configure({name: 'VerseApp'}) // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .use(reactotronRedux())
//   .connect();

// export default reactotron;

import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
let reactotron;
// Check if it's development mode
// const duh = url.parse(NativeModules.)
// Geting device hostname
reactotron = Reactotron.configure({
  name: 'name',
  // host: hostname,
  port: 9090,
}) // Initial configuration
  .useReactNative({}) // Appling React-Native plugin
  .use(reactotronRedux()) // Appling Redux plugin
  .connect(); // Connect to local client
// console.tron = Reactotron.log;
// Extend console with tron for being able to debug to Reactotron

export default reactotron;
