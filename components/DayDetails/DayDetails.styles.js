import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  passedField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  webView: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    elevation: 1,
  },
});
