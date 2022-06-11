import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import List from '../List/List';
import store from '../../store/store';
import {remove, save} from '../../store/reducers/favorites';

function isFavorite(item) {
  const favorites = store.getState().favorites;
  return favorites.items.some(
    refItem => JSON.stringify(refItem) === JSON.stringify(item),
  );
}

const HeartIcon = ({style, item}) => {
  const icon = useRef();
  const isNotMounted = useRef(true);
  const [selected, setSelected] = useState(isFavorite(item));
  const dispatch = useDispatch();
  // update store once heart was clicked
  useEffect(() => {
    // avoid execution before it is not mounted
    if (isNotMounted.current) {
      isNotMounted.current = false;
      return;
    }
    const action = selected ? save : remove;
    dispatch(action(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleOnPress = () => setSelected(oldVal => !oldVal);
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Icon
        ref={icon}
        style={[style, styles.icon]}
        name="heart"
        animation={null}
        {...(selected ? {fill: '#FF0000'} : {})}
      />
    </TouchableOpacity>
  );
};

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const BackAction = (navigation, props) => (
  <TopNavigationAction icon={BackIcon} onPressIn={() => navigation.goBack()} />
);

const DEFAULT_TOP_NAVIGATION_HEIGHT = 56;
const RetreatList = params => {
  useSelector(state => state.favorites.updateRetreatList);
  const [topNavigationOffset, setTopNavigationOffset] = useState(
    DEFAULT_TOP_NAVIGATION_HEIGHT,
  );

  return (
    <View style={styles.container}>
      <TopNavigation
        onLayout={event =>
          setTopNavigationOffset(event.nativeEvent.layout.height)
        }
        alignment="center"
        accessoryLeft={BackAction.bind(undefined, params.navigation)}
        title="Wybierz dzień rekolekcji"
      />
      <List
        {...params}
        icon={HeartIcon}
        spinnerViewStyle={{top: topNavigationOffset}}
      />
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

export default RetreatList;
