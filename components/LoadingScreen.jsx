import React, { useRef, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet, Animated, Image } from 'react-native';
import logo from '../assets/images/logo-small.png';

const LoadingScreen = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161622',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default LoadingScreen;
