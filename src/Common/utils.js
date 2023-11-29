import {Alert, BackHandler, Platform, ToastAndroid} from 'react-native';
import * as RootNavigation from '../Router/RootNavigation';
export const LOG = (message, val) => {
  if (val) {
    console.log(message, val);
  } else {
    console.log(message);
  }
};

export const mainLog = (msg, val) => {
  if (msg && val) {
    console.group(msg);
    console.log(val);
    console.groupEnd();
  }
};

export const Toast = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  } else {
    Alert.alert(msg);
  }
};

export const isValidMail = value => {
  let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (emailReg.test(value.trim()) === true) {
    return true;
  } else {
    return false;
  }
};
