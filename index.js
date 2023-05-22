/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDamDmBGH5Y8wm52TZXgQKFIzbCcjXIvKI',
  appId: '1:302327349528:android:765cf152c61113a3cfde6d',
  // 다른 Firebase 구성 속성들
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

AppRegistry.registerComponent(appName, () => App);
