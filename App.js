import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import MyNavigationContainer from './components/Navigation/bottomNavigation';

export default () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <MyNavigationContainer />
      </ApplicationProvider>
    </>
  );
};
