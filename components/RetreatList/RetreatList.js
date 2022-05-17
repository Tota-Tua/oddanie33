import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Icon} from '@ui-kitten/components';
import List from '../List/List';
import store from '../../store/store';
import {remove, save} from '../../store/reducers/favorites';

function isFavorite(item) {
  const favorites = store.getState().favorites;
  return favorites.some(
    refItem => JSON.stringify(refItem) === JSON.stringify(item),
  );
}

const HeartIcon = ({style, item}) => {
  //console.log('Rysuje serce');
  const icon = useRef();
  const [selected, setSelected] = useState(isFavorite(item));
  const handleOnPress = () => {
    setSelected(oldVal => {
      const action = oldVal ? remove : save;
      icon.current.startAnimation(() => store.dispatch(action(item)));
      return !oldVal;
    });
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Icon
        ref={icon}
        style={[style, styles.icon]}
        name="heart"
        animation="pulse"
        {...(selected ? {fill: '#FF0000'} : {})}
      />
    </TouchableOpacity>
  );
};

const RetreatList = params => {
  //console.log(`Rysuje RetreatList dla ${JSON.stringify(params)}`);
  useSelector(state => state.updateRetreatList);
  return (
    <View style={styles.container}>
      <List {...params} icon={HeartIcon} />
    </View>
  );
};

// class RetreatList extends React.Component {
//   //useSelector(state => state.updateRetreatList);
//   render() {
//     return (
//       <View style={styles.container}>
//         <List {...this.props} icon={HeartIcon} />
//       </View>
//     );
//   }
// };

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
