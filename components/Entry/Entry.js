import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MainCarousel from '../MainCarousel/MainCarousel';
import styles, {colors} from '../Entry/Entry.styles';

/*
   Presence of StatusBar compoenent does not influence whether the status bar is visible or not, it sets its appearance
   I did not notice for SafeAreaView changed the way how app is rendered on my phone (Oppo Reno 3 Pro), anyway I leave it just in case
*/
const Entry = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(255, 0, 10, 0.3)'}
          barStyle={'light-content'}
        />
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{x: 1, y: 0}}
          endPoint={{x: 0, y: 1}}
          style={styles.gradient}
        />
        <MainCarousel navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Entry;
