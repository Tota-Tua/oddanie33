import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  Modal,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import store from '../../store/store';
import {setDarkMode} from '../../store/reducers/settings';
import {removeAll} from '../../store/reducers/completed';

const BackIcon = props => <Icon {...props} name="arrow-back" />;
const BackAction = (navigation, props) => (
  <TopNavigationAction icon={BackIcon} onPressIn={() => navigation.goBack()} />
);
const Settings = ({navigation}) => {
  const darkMode = store.getState().settings.darkMode;
  const [nightMode, setNightMode] = useState(darkMode);
  const [isProgressModalVisibile, setProgressModalVisibility] =
    React.useState(false);
  const notMounted = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // avoid processing during the first render
    if (notMounted.current) {
      notMounted.current = false;
      return;
    }
    dispatch(setDarkMode(nightMode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nightMode]);

  const CardFooter = props => (
    <View {...props} style={[props.style, styles.buttons]}>
      <Button
        onPress={() => {
          setProgressModalVisibility(false);
          dispatch(removeAll());
        }}>
        Tak
      </Button>
      <Button onPress={() => setProgressModalVisibility(false)}>Nie</Button>
    </View>
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        accessoryLeft={BackAction.bind(undefined, navigation)}
        title="Ustawienia"
        alignment="center"
      />
      <Modal
        visible={isProgressModalVisibile}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setProgressModalVisibility(false)}>
        <Card disabled={true} footer={CardFooter}>
          <Text> Skasować postęp ? </Text>
        </Card>
      </Modal>
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
      <TouchableOpacity
        style={styles.item}
        activeOpacity={1.0}
        onPress={() => setProgressModalVisibility(true)}>
        <Text category="p1" appearance="hint">
          Usuń postęp
        </Text>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity
        style={[styles.item, styles.version]}
        activeOpacity={1.0}>
        <Text category="p2" appearance="hint">
          Wersja oprogramowania TESTOWA
        </Text>
      </TouchableOpacity>
      <Divider />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  version: {
    justifyContent: 'flex-end',
  },
});

export default Settings;
