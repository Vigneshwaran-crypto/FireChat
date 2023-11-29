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
import FireBase from '@react-native-firebase/app';
import FireStore from '@react-native-firebase/firestore';
import fireDb from '@react-native-firebase/database';

const {height, width} = Dimensions.get('window');

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backPressed,
    );

    return () => backHandler;
  }, []);

  const backPressed = () => {
    navigation.goBack();
    return true;
  };

  const onCreatePress = async () => {
    if (!name) {
      Toast('Please enter your username');
    } else if (number.length < 10) {
      Toast('Please enter correct mobile number');
    } else if (!isValidMail(mail)) {
      Toast('Please enter valid mail');
    } else if (!pass || pass.length < 6) {
      Toast('Password must be at least 6 character');
    } else {
      const registerUser = FireAuth().createUserWithEmailAndPassword(
        mail,
        pass,
      );

      registerUser
        .then(res => {
          //user created successfully

          const userInfo = res.user;
          LOG('created user :', userInfo);

          Toast('Account Created Successfully');
          navigation.goBack();
        })
        .catch(err => {
          LOG(typeof err.message);
          LOG('error occurred while user creation :', err);

          const errMsg = err.message;

          const justErr = errMsg.split(' ')[0];

          if (justErr === '[auth/email-already-in-use]') {
            Toast('This Email is already in use');
          } else {
            Toast('Please try again with correct credentials');
          }
        });
    }
  };

  const onCreateAccPress = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <MatIcon name={'fire'} color={colors.gold} size={width * 0.5} />
        <Text style={styles.loginText}>Register</Text>
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
              placeholder="Username"
              onChangeText={setName}
              value={name}
            />
          </View>

          <View style={styles.userInputView}>
            <AntDesign
              name="user"
              color={colors.darkGrey}
              size={20}
              style={styles.inputIcons}
            />
            <TextInput
              style={styles.userInput}
              placeholder="Mobile No"
              onChangeText={setNumber}
              value={number}
              keyboardType="decimal-pad"
            />
          </View>

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
        </View>
      </View>

      <View style={styles.bottomContents}>
        <TouchableOpacity onPress={onCreatePress}>
          <LinearGradient
            style={styles.logButtonGrad}
            colors={[colors.darkBlue, colors.royalBlue]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}>
            <Text style={styles.logButtontext}>Create</Text>
          </LinearGradient>
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
});
export default Register;
