import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

//Navigation systems
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';

//Screens Imports
import Splash from '../App/Splash';
import Home from '../Screen/HomeTab/Home';
import Chat from '../Screen/HomeTab/Chat';
import Profile from '../Screen/HomeTab/Profile';
import {colors} from '../Common/colors';

const {height, width} = Dimensions.get('window');

const Router = () => {
  const Stack = createNativeStackNavigator();
  // const tabHeight = useBottomTabBarHeight();

  const backGround = () => {
    return <View style={styles.tabBackground}></View>;
  };

  const HomeTab = () => {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.darkGrey,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: styles.tabBarStyle,
        }}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <View style={styles.tabIconContainer}>
                <View style={styles.roundView(focused)}>
                  <Feather name="home" size={20} color={color} />
                </View>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="chat"
          component={Chat}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <View style={styles.tabIconContainer}>
                <View style={styles.roundView(focused)}>
                  <Feather name="message-circle" size={20} color={color} />
                </View>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <View style={styles.tabIconContainer}>
                <View style={styles.roundView(focused)}>
                  <Feather name="user" size={20} color={color} />
                </View>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    //Navigation container contains all screen as Stack data structure
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="homeTab"
          component={HomeTab}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//custom style for BottomTabBar
const styles = StyleSheet.create({
  tabIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent,
  },
  tabBarStyle: {
    // borderWidth: 1,
    backgroundColor: colors.lightBlack,
    elevation: 0,
    zIndex: 0,
    borderTopWidth: 0,
    height: width * 0.14,
    borderStyle: 'dotted',
  },
  roundView: shade => ({
    height: width * 0.11,
    width: width * 0.11,
    borderRadius: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    zIndex: 1,
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    shadowOffset: {height: 1, width: 1},
    shadowColor: shade ? colors.gold : colors.vantaBlack,
  }),
  tabBackground: {
    flex: 1,
  },
});

export default Router;
