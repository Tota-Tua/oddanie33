import {/*Dimensions, StatusBar,*/ StyleSheet} from 'react-native';

// const screenHeight = Dimensions.get('window').height;
// const statusBarHeight = StatusBar.currentHeight;
export default StyleSheet.create({
  safeArea: {
    flex: 1, // flexGrow: 1 - automatically resizes the compoenent to fit the whole screen
    flexDirection: 'column',
  },
  container: {
    flex: 1, // makes the view to be resized to the parent (in this case to the bottom edge)
    //height: screenHeight - statusBarHeight - 300, // 20 is experimental, probably the height of scrren name bar
  },
  logo: {
    //flex: 1/10,
    padding: 5,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export const colors = {
  light: {
    background1: '#6ab3eb',
    background2: '#d2d7e7',
  },
  dark: {
    background1: '#091C7A',
    background2: '#1A34B8',
  },
};
