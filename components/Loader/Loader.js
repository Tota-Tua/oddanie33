import React, {useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import images from '../../res/images/images';

const DECAY_TIME = 1500;
const DELAY_TIME = 5000;
export default ({onFinished}) => {
  const fadeAnim = useRef(new Animated.Value(1.0)).current;

  useEffect(() => {
    setTimeout(
      () =>
        Animated.timing(fadeAnim, {
          toValue: 0.0,
          duration: DECAY_TIME,
          useNativeDriver: true,
        }).start(() => onFinished()),
      DELAY_TIME,
    );
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <View style={styles.stImage}>
        <Image
          resizeMode="contain"
          source={images.fundacjaTotaTua}
          style={styles.pictures}
        />
      </View>
      <View style={styles.ndImage}>
        <Image
          resizeMode="contain"
          source={images.oddanie33}
          style={styles.pictures}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 2,
    elevation: 2,
    backgroundColor: 'white',
  },
  stImage: {
    flex: 1.5,
    justifyContent: 'flex-end',
  },
  ndImage: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'flex-start',
  },
  pictures: {
    maxWidth: '80%',
  },
});
