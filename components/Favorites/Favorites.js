import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from '@ui-kitten/components';
import List from '../List/List';
import store from '../../store/store';
import {deleteFavorite} from '../../store/reducers/example';
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
    icon.current.startAnimation();
    store.dispatch(deleteFavorite(item));
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Icon
        ref={icon}
        style={[style, styles.icon]}
        name="trash-2-outline"
        animation="pulse"
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
