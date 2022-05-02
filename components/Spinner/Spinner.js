import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spinner} from '@ui-kitten/components';

export default ({visability}) => {
  if (visability === undefined) {
    visability = true;
  }
  return (
    visability && (
      <View style={styles.spinnerContainer}>
        <Spinner size="giant" status="success" />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 2,
    elevation: 2,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
});
