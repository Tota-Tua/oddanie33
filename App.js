import React, {useEffect, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import MyNavigationContainer from './components/Navigation/BottomNavigation';
import store from './store/store';
import Orientation from 'react-native-orientation-locker';
import Loader from './components/Loader/Loader';
import NetworkInfoObj from './services/NetworkInfo'; // eslint-disable-line no-unused-vars

const getModeStrRepresent = mode => (mode ? 'dark' : 'light');
const ApplicationProviderWrappper = () => {
  const mode = store.getState().settings.darkMode;
  const modeName = getModeStrRepresent(mode);

  useSelector(state => state.settings.darkMode);
  const [isLoader, setIsLoader] = useState(true);
  useEffect(() => Orientation.lockToPortrait(), []);

  return (
    <ApplicationProvider {...eva} theme={eva[modeName]}>
      <MyNavigationContainer />
      {isLoader && <Loader onFinished={() => setIsLoader(false)} />}
    </ApplicationProvider>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProviderWrappper />
      </PersistGate>
    </Provider>
  );
};

const persistor = persistStore(store);
