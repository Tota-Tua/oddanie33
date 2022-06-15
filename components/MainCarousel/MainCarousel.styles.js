import {StyleSheet} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#6ab3eb',
  background2: '#d2d7e7',
};

export default StyleSheet.create({
  exampleContainer: {
    flex: 1,
    borderRadius: 1,
    paddingBottom: 10,
  },
  exampleContainerDark: {
    backgroundColor: colors.black,
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    //paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingBottom: 8,
    paddingTop: 8,
    //paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 1,
    marginLeft: 8,
    marginRight: 8,
    //marginHorizontal: 8
  },
});
