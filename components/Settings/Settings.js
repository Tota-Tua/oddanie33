import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {removeAll as removeAllCompleted} from '../../store/reducers/completed';
import {removeAll as removeAllFavorites} from '../../store/reducers/favorites';
import {setInitialValues as setInitialSettings} from '../../store/reducers/settings';

const BackIcon = props => <Icon {...props} name="arrow-back" />;
const BackAction = (navigation, props) => (
  <TopNavigationAction icon={BackIcon} onPressIn={() => navigation.goBack()} />
);
const Settings = ({navigation}) => {
  const darkMode = store.getState().settings.darkMode;
  const [isProgressModalVisibile, setProgressModalVisibility] = useState(false);
  const [isNotReadyModalVisible, setNotReadyModalVisibility] = useState(false);
  const dispatch = useDispatch();
  useSelector(state => state.settings.darkMode);

  const CardFooter = props => (
    <View {...props} style={[props.style, styles.buttons]}>
      <Button
        onPress={() => {
          setProgressModalVisibility(false);
          dispatch(removeAllCompleted());
          dispatch(removeAllFavorites());
          dispatch(setInitialSettings());
        }}>
        Tak
      </Button>
      <Button onPress={() => setProgressModalVisibility(false)}>Nie</Button>
    </View>
  );

  return (
    <Layout style={styles.container}>
      <Modal
        visible={isNotReadyModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setNotReadyModalVisibility(false)}>
        <Card disabled={true}>
          <Text> Brak implementacji </Text>
        </Card>
      </Modal>
      <Layout>
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
          onPress={() => dispatch(setDarkMode(!darkMode))}>
          <Text category="p1" appearance="hint">
            Włącz tryb nocny
          </Text>
          <Toggle
            checked={darkMode}
            onChange={() => dispatch(setDarkMode(!darkMode))}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.item}
          activeOpacity={1.0}
          onPress={() => setProgressModalVisibility(true)}>
          <Text category="p1" appearance="hint">
            Wyczyść dane (ulubione, przemodlone, ustawienia)
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.item}
          activeOpacity={1.0}
          onPress={() => setNotReadyModalVisibility(true)}>
          <Text category="p1" appearance="hint">
            Kontakt
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.item}
          activeOpacity={1.0}
          onPress={() => setNotReadyModalVisibility(true)}>
          <Text category="p1" appearance="hint">
            Poleć znajomym
          </Text>
        </TouchableOpacity>
        <Divider />
      </Layout>
      <Layout>
        <Divider />
        <TouchableOpacity
          style={[styles.item, styles.version]}
          activeOpacity={1.0}>
          <Text category="p2" appearance="hint">
            Wersja oprogramowania: TESTOWA
          </Text>
        </TouchableOpacity>
        <Divider />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    justifyContent: 'center',
  },
});

export default Settings;
