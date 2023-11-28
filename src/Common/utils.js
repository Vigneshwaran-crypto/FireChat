import {Alert, Platform, ToastAndroid} from 'react-native';
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
