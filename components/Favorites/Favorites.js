import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from '@ui-kitten/components';
import List from '../List/List';

function mapStateToProp(state) {
  const {favorites} = state;
  return {
    data: favorites,
  };
}

function onPressHandler(item) {
  console.log(`Hit w: ${JSON.stringify(item)}`);
}

const TrashIcon = ({style}) => {
  const icon = useRef();
  const [selected, setSelected] = useState(false);
  const handleOnPress = () => {
    setSelected(oldVal => !oldVal);
    icon.current.startAnimation();
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Icon
        ref={icon}
        style={[style, styles.iconStyle]}
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
      <List {...params} onPress={onPressHandler} icon={TrashIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProp)(Favorites);
