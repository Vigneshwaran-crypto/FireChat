import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FireAuth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../Common/colors';
import {LOG} from '../../Common/utils';

const Profile = () => {
  const navigation = useNavigation();
  const onLogoutPress = () => {
    FireAuth()
      .signOut()
      .then(res => {
        LOG('userSiginOut successfully :', res);

        navigation.reset({
          index: 0,
          routes: [{name: 'login'}],
        });
      })
      .catch(err => {
        LOG('signIn_error :', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <TouchableOpacity onPress={onLogoutPress} style={styles.logOutSyle}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOutSyle: {
    padding: 10,
    backgroundColor: colors.matteWine,
  },
});
export default Profile;
