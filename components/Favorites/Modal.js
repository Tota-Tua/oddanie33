import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Card, Modal, Text} from '@ui-kitten/components';
import {removeAll as removeAllFavorites} from '../../store/reducers/favorites';

export const FavoritesModal = modalProps => {
  const dispatch = useDispatch();
  const CardFooter = props => (
    <View {...props} style={[props.style, styles.buttons]}>
      <Button
        onPress={() => {
          modalProps.setVisibility(false);
          dispatch(removeAllFavorites());
        }}>
        Tak
      </Button>
      <Button onPress={() => modalProps.setVisibility(false)}>Nie</Button>
    </View>
  );

  return (
    <Modal {...modalProps} backdropStyle={styles.backdrop}>
      <Card disabled={true} footer={CardFooter}>
        <Text> Skasować całą listę ? </Text>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
