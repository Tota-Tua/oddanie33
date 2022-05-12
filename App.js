import React from 'react';
import {Provider} from 'react-redux';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import MyNavigationContainer from './components/Navigation/bottomNavigation';
import store from './store/store';

export default () => {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <MyNavigationContainer />
      </ApplicationProvider>
    </Provider>
  );
};
