/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainStack from './screens/Navigation';

AppRegistry.registerComponent(appName, () => MainStack);
