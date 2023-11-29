import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../Common/colors';
import LinearGradient from 'react-native-linear-gradient';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {textFontSemiBoldForm} from '../Common/styles';
import {Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Splash = () => {
  const navigation = useNavigation();

  const iconRotateAnime = new Animated.Value(0);
  const iconSizeAnime = new Animated.Value(0);
  const textOpa = new Animated.Value(0);
  const curAeroPos = new Animated.ValueXY({x: 0, y: 0});

  const [showLoad, setShowLoad] = useState(false);

  useEffect(() => {
    Animated.timing(iconSizeAnime, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(iconRotateAnime, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(textOpa, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.bounce,
        }).start(() => setShowLoad(true));
      });
    });
  }, []);

  useEffect(() => {
    if (showLoad) {
      setTimeout(() => {
        Animated.timing(curAeroPos, {
          toValue: {x: width, y: 0},
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          // navigation.navigate('login');

          navigation.reset({
            index: 0,
            routes: [{name: 'login'}],
          });
        });
      }, 2000);
    }
  }, [showLoad]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.darkBlue, colors.vantaBlack]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.9}}
        style={styles.gradBackGround}>
        <View style={styles.iconView}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [
                  {
                    rotateY: iconRotateAnime.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                  {scale: iconSizeAnime},
                ],
              },
            ]}>
            <MatIcon name={'fire'} color={colors.gold} size={150} />
          </Animated.View>

          <Animated.Text style={[styles.appNameText, {opacity: textOpa}]}>
            Fire Chat
          </Animated.Text>

          <View style={styles.progressView}>
            <Animated.View style={{transform: [{translateX: curAeroPos.x}]}}>
              <LottieView
                source={require('../../assets/lottieJson/paperRocket.json')}
                loop
                autoPlay
                duration={2000}
                style={[
                  styles.lottieAnimeStyle,
                  {display: showLoad ? 'flex' : 'none'},
                ]}
              />
            </Animated.View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradBackGround: {
    flex: 1,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  iconContainer: {
    // borderWidth: 1,
  },

  appNameText: {
    color: colors.royalBlue,
    fontFamily: textFontSemiBoldForm,
    fontSize: width * 0.05,
  },

  progressView: {
    position: 'absolute',
    bottom: 0,
  },

  lottieAnimeStyle: {
    height: width * 0.3,
    width: width * 0.5,
    borderWidth: 1,
    borderColor: colors.white,
  },
});

export default Splash;
