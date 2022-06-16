import React, {useEffect, useState} from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import store from '../../store/store';
import {
  remove as removeFavorite,
  save as saveFavorite,
  updateRetreatList,
} from '../../store/reducers/favorites';

const ThisTopNavigation = props => {
  const item = props.item;
  function isFavorite(currItem) {
    const favorites = store.getState().favorites;
    return favorites.items.some(
      refItem => JSON.stringify(refItem) === JSON.stringify(currItem),
    );
  }

  const BackIcon = myProps => <Icon {...myProps} name="arrow-back" />;
  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPressIn={() => props.navigation.goBack()}
    />
  );

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(isFavorite(item));
  const [isDispatchBlocked, setDispatchBlocked] = useState(true);
  const SettingsAction = () => {
    const HeartIcon = heartProps => {
      useEffect(() => {
        if (!isDispatchBlocked) {
          const action = selected ? saveFavorite : removeFavorite;
          dispatch(action(item));
          dispatch(updateRetreatList());
          setDispatchBlocked(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [selected]);

      return (
        <Icon
          {...heartProps}
          name="heart"
          {...(selected ? {fill: '#FF0000'} : {})}
        />
      );
    };

    return (
      <TopNavigationAction
        icon={HeartIcon}
        onPressIn={() => {
          setSelected(oldVal => {
            setDispatchBlocked(false);
            return !oldVal;
          });
        }}
      />
    );
  };

  return (
    <TopNavigation
      alignment="center"
      accessoryLeft={BackAction}
      accessoryRight={SettingsAction}
      title="Opis rekolekcji"
      onLayout={props.onLayout}
    />
  );
};

export default ThisTopNavigation;
