import { /*Dimensions, StatusBar,*/StyleSheet} from 'react-native';

// const screenHeight = Dimensions.get('window').height;
// const statusBarHeight = StatusBar.currentHeight;
export default StyleSheet.create({
  safeArea: {
    flex: 1, // flexGrow: 1 - automatically resizes the compoenent to fit the whole screen
    flexDirection: 'column',
    //margin: 10,
    backgroundColor: 'red',
  },
  container: {
    flex: 1, // makes the view to be resized to the parent (in this case to the bottom edge)
    //height: screenHeight - statusBarHeight - 300, // 20 is experimental, probably the height of scrren name bar
    borderColor: 'blue',
    borderRadius: 1,
    borderWidth: 1,
    backgroundColor: '#6ab3eb', //colors.background1
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export const colors = {
  background1: '#6ab3eb',
  background2: '#d2d7e7',
};
