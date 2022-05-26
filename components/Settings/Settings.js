import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Icon,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import store from '../../store/store';
import {setDarkMode} from '../../store/reducers/settings';

const BackIcon = props => <Icon {...props} name="arrow-back" />;
const BackAction = (navigation, props) => (
  <TopNavigationAction icon={BackIcon} onPressIn={() => navigation.goBack()} />
);

const Settings = ({navigation}) => {
  const darkMode = store.getState().settings.darkMode;
  const [nightMode, setNightMode] = useState(darkMode);
  const notMounted = useRef(true);

  useEffect(() => {
    // avoid processing during the first render
    if (notMounted.current) {
      notMounted.current = false;
      return;
    }
    store.dispatch(setDarkMode(nightMode));
  }, [nightMode]);

  return (
    <View style={styles.container}>
      <TopNavigation
        accessoryLeft={BackAction.bind(undefined, navigation)}
        title="Ustawienia"
        alignment="center"
      />
      <Toggle
        checked={nightMode}
        onChange={() => setNightMode(oldMode => !oldMode)}
      >
        {props => <Text {...props}>Włącz tryb nocny</Text>}
      </Toggle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
});

export default Settings;
