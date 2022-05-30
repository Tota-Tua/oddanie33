import React from 'react';
import {useSelector} from 'react-redux';
import {/*ImageBackground,*/ SafeAreaView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import MainCarousel from '../MainCarousel/MainCarousel';
import styles, {colors} from '../Entry/Entry.styles';
//import images from '../../res/images/images';
import store from '../../store/store';

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
  const mode = store.getState().settings.darkMode;
  useSelector(state => state.settings.darkMode);

  const theme = mode ? colors.dark : colors.light;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.background1, theme.background2]}
          startPoint={{x: 1, y: 0}}
          endPoint={{x: 0, y: 1}}
          style={styles.gradient}>
          <TopNavigation
            accessoryLeft={MenuAction.bind(undefined, navigation)}
          />
          <MainCarousel navigation={navigation} />
          {/* <View style={styles.logo}>
            <ImageBackground
              source={images.oddanie33}
              resizeMode="contain"
              style={{flex: 1,justifyContent: 'center'}}
            >
            </ImageBackground>
          </View> */}
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default Entry;
