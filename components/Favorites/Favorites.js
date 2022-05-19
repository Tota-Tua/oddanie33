import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from '@ui-kitten/components';
import List from '../List/List';
import store from '../../store/store';
import {remove, updateRetreatList} from '../../store/reducers/favorites';

function mapStateToProp(state) {
  const {favorites} = state;
  return {
    data: favorites,
  };
}

const TrashIcon = ({style, item}) => {
  const icon = useRef();
  const [selected, setSelected] = useState(false);
  const handleOnPress = params => {
    setSelected(oldVal => !oldVal);
    store.dispatch(remove(item));
    store.dispatch(updateRetreatList());
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
  return (
    <View style={styles.container}>
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
