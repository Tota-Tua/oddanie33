import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconRegistry,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import Entry from './components/Entry/Entry';
//import Grid from './components/Grid/Grid';
import List from './components/List/List';
import Favorites from './components/Favorites/Favorites';
import Profile from './components/Profile/Profile';
// import DayDetails from './components/DayDetails/DayDetails';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeIcon = props => <Icon {...props} name="home" />;
const FavoriteIcon = props => <Icon {...props} name="heart" />;
const ProfileIcon = props => <Icon {...props} name="person" />;

const MyBottomNavigation = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="MAIN" icon={HomeIcon} />
    <BottomNavigationTab title="FAVORITES" icon={FavoriteIcon} />
    <BottomNavigationTab title="PROFILE" icon={ProfileIcon} />
  </BottomNavigation>
);

const MyNavigationContainer = () => (
  <NavigationContainer>
    <Navigator tabBar={props => <MyBottomNavigation {...props} />}>
      <Screen name="Main" component={Entry} />
      <Screen name="Favorites" component={Favorites} />
      <Screen name="Profile" component={Profile} />
      <Screen name="List" component={List} />
    </Navigator>
  </NavigationContainer>
);

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
