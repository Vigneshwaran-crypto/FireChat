import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Router from '../Router/Router';
import {colors} from '../Common/colors';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.thinBlack} />
      <Router />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
