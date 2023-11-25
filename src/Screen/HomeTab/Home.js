import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  textFontBold,
  textFontLight,
  textFontMedium,
  textFontRegular,
  textFontSemiBold,
} from '../../Common/styles';
import {colors} from '../../Common/colors';

const Home = () => {
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
