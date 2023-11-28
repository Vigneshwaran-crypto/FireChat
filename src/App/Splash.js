import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../Common/colors';
import LinearGradient from 'react-native-linear-gradient';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  textFontBold,
  textFontLight,
  textFontMedium,
  textFontRegular,
} from '../Common/styles';
import {Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window');
const Splash = () => {
  const animePack = new Animated.Value(0);
  const viewScale = new Animated.Value(0);
  const textOpa = new Animated.Value(0);

  const [showLoad, setShowLoad] = useState(false);

  useEffect(() => {
    Animated.timing(viewScale, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animePack, {
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
                    rotateY: animePack.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                  {scale: viewScale},
                ],
              },
            ]}>
            <MatIcon name={'fire'} color={colors.gold} size={150} />
          </Animated.View>

          <Animated.Text style={[styles.appNameText, {opacity: textOpa}]}>
            Fire Chat
          </Animated.Text>

          <View style={styles.progressView}>
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
    fontFamily: textFontRegular,
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
