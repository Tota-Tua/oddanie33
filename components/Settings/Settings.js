import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
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
    <Layout style={styles.container}>
      <TopNavigation
        accessoryLeft={BackAction.bind(undefined, navigation)}
        title="Ustawienia"
        alignment="center"
      />
      <Divider />
      <TouchableOpacity
        style={styles.item}
        activeOpacity={1.0}
        onPress={() => setNightMode(oldMode => !oldMode)}>
        <Text category="p1" appearance="hint">
          Włącz tryb nocny
        </Text>
        <Toggle
          checked={nightMode}
          onChange={() => setNightMode(oldMode => !oldMode)}
        />
      </TouchableOpacity>
      <Divider />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default Settings;
