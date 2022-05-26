import React from 'react';
import {SafeAreaView, View} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import MainCarousel from '../MainCarousel/MainCarousel';
import styles /*, {colors}*/ from '../Entry/Entry.styles';

const MenuIcon = props => <Icon {...props} name="menu-outline" />;

const MenuAction = (navigation, props) => (
  <TopNavigationAction
    icon={MenuIcon}
    onPressIn={() => {
      navigation.navigate('Settings');
    }}
  />
);

/*
   I did not notice for SafeAreaView changed the way how app is rendered on my phone (Oppo Reno 3 Pro), anyway I leave it just in case
*/
const Entry = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TopNavigation accessoryLeft={MenuAction.bind(undefined, navigation)} />
        {/* <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{x: 1, y: 0}}
          endPoint={{x: 0, y: 1}}
          style={styles.gradient}
        /> */}
        <MainCarousel navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Entry;
