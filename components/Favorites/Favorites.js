import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import List from '../List/List';
import {FavoritesModal} from './Modal';
import {remove, updateRetreatList} from '../../store/reducers/favorites';
import store from '../../store/store';

function mapStateToProp(state) {
  const {favorites} = state;
  return {
    data: favorites.items,
  };
}

const TrashIcon = ({style, item}) => {
  const icon = useRef();
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const handleOnPress = () => {
    setSelected(oldVal => !oldVal);
    dispatch(remove(item));
    dispatch(updateRetreatList());
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Icon
        ref={icon}
        style={[style, styles.icon]}
        name="trash-2-outline"
        animation={null}
        {...(selected ? {fill: '#FF0000'} : {})}
      />
    </TouchableOpacity>
  );
};

const Favorites = params => {
  const [isProgressModalVisibile, setProgressModalVisibility] = useState(false);

  const MasterTrashIcon = props => {
    function handleOnPress() {
      if (store.getState().favorites.items.length > 0) {
        setProgressModalVisibility(true);
      }
    }

    return (
      <Icon
        onPress={() => handleOnPress()}
        {...props}
        name="trash-2-outline"
        animation={true}
      />
    );
  };

  const MasterTrash = () => {
    return <TopNavigationAction icon={MasterTrashIcon} />;
  };

  return (
    <View style={styles.container}>
      <TopNavigation
        alignment="center"
        title="Ulubione"
        accessoryRight={MasterTrash}
      />
      <FavoritesModal
        visible={isProgressModalVisibile}
        setVisibility={setProgressModalVisibility}
        onBackdropPress={() => setProgressModalVisibility(false)}
      />
      <List {...params} icon={TrashIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default connect(mapStateToProp)(Favorites);
