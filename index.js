/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['NativeBase:']);
AppRegistry.registerComponent(appName, () => App);
