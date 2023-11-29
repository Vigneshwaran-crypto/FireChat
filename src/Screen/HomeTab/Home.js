import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  textFontBold,
  textFontLight,
  textFontMedium,
  textFontRegular,
  textFontSemiBold,
} from '../../Common/styles';
import {colors} from '../../Common/colors';
import {LOG} from '../../Common/utils';
import FireApp from '@react-native-firebase/app';
import FireAuth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const userDetails = FireApp.auth().currentUser;

  useEffect(() => {
    LOG('logged in user Detail in home :', userDetails);

    // FireAuth()
    //   .currentUser?.updateProfile({
    //     displayName: 'MOHITOMAN',

    //   })
    //   .then(res => {
    //     LOG('user Updated successfully :', res);
    //   })
    //   .catch(err => {
    //     LOG('error  occurred while updating user :', err);
    //   });

    console.log('updated user data :', FireAuth().currentUser);
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => backHandler;
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlack,
  },
});
export default Home;
