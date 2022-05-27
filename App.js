import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import MyNavigationContainer from './components/Navigation/BottomNavigation';
import store from './store/store';

const getModeStrRepresent = mode => (mode ? 'dark' : 'light');
const ApplicationProviderWrappper = () => {
  const mode = store.getState().settings.darkMode;
  const modeName = getModeStrRepresent(mode);

  useSelector(state => state.settings.darkMode);

  return (
    <ApplicationProvider {...eva} theme={eva[modeName]}>
      <MyNavigationContainer />
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
