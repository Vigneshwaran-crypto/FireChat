import {
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../Common/colors';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  textFontLightForm,
  textFontMediumForm,
  textFontRegularForm,
  textFontSemiBoldForm,
} from '../../../Common/styles';
import LinearGradient from 'react-native-linear-gradient';
import {LOG, Toast, isValidMail} from '../../../Common/utils';
import FireAuth from '@react-native-firebase/auth';

const {height, width} = Dimensions.get('window');

const LogIn = () => {
  const navigation = useNavigation();

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );

    return () => backHandler;
  }, []);

  const onLoginPress = () => {
    if (!isValidMail(mail)) {
      Toast('Please enter valid mail');
    } else if (!pass) {
      Toast('Please enter password');
    } else {
      FireAuth()
        .signInWithEmailAndPassword(mail, pass)
        .then(res => {
          LOG('user_SignIn_successfully :', res);
          navigation.navigate('homeTab');
        })
        .catch(err => {
          LOG('signIn_error :', err);
        });
    }
  };

  const onCreateAccPress = () => {
    navigation.navigate('register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <MatIcon name={'fire'} color={colors.gold} size={width * 0.5} />
        <Text style={styles.loginText}>Login</Text>
      </View>

      <View style={styles.inputsContainer}>
        <View style={styles.inputsParent}>
          <View style={styles.userInputView}>
            <AntDesign
              name="user"
              color={colors.darkGrey}
              size={20}
              style={styles.inputIcons}
            />
            <TextInput
              style={styles.userInput}
              placeholder="Email"
              onChangeText={setMail}
              value={mail}
            />
          </View>

          <View style={styles.userInputView}>
            <AntDesign
              name="lock1"
              color={colors.darkGrey}
              size={20}
              style={styles.inputIcons}
            />
            <TextInput
              style={styles.userInput}
              placeholder="Password"
              onChangeText={setPass}
              value={pass}
            />
          </View>

          <Text style={styles.forgotText}>Forgot Password</Text>
        </View>
      </View>

      <View style={styles.bottomContents}>
        <TouchableOpacity onPress={onLoginPress}>
          <LinearGradient
            style={styles.logButtonGrad}
            colors={[colors.darkBlue, colors.royalBlue]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}>
            <Text style={styles.logButtontext}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccButton}
          onPress={onCreateAccPress}>
          <Text style={styles.createAccText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.matteBlack,
  },
  iconView: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginText: {
    color: colors.royalBlue,
    fontFamily: textFontMediumForm,
    fontSize: 25,
    alignSelf: 'center',
  },
  inputsParent: {
    width: width * 0.7,
    alignSelf: 'center',
  },
  userInputView: {
    flexDirection: 'row',
    backgroundColor: colors.lightBlack,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  inputIcons: {
    marginHorizontal: 10,
  },
  userInput: {
    flex: 1,
    fontFamily: textFontRegularForm,
    color: colors.white,
  },
  forgotText: {
    color: colors.royalBlue,
    alignSelf: 'flex-end',
    fontFamily: textFontMediumForm,
  },
  bottomContents: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logButtonGrad: {
    width: width * 0.4,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  logButtontext: {
    color: colors.white,
    fontFamily: textFontRegularForm,
  },
  createAccButton: {
    marginTop: 20,
  },
  createAccText: {
    color: colors.matteWine,
    fontFamily: textFontSemiBoldForm,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
export default LogIn;
