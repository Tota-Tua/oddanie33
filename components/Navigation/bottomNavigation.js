import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {DrawerNavigator} from '../Drawer/Drawer';
import {RetreatNavigation, FavoritesNavigation} from './stackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeIcon = props => <Icon {...props} name="home" />;
const FavoriteIcon = props => <Icon {...props} name="heart" />;
const SettingsIcon = props => <Icon {...props} name="heart" />;

function handleOnSelect(routeName, navigation) {
  navigation.navigate(routeName);
}

const MyBottomNavigation = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => handleOnSelect(state.routeNames[index], navigation)}>
    <BottomNavigationTab title="MAIN" icon={HomeIcon} />
    <BottomNavigationTab title="FAVORITES" icon={FavoriteIcon} />
    <BottomNavigationTab title="SETTINGS" icon={SettingsIcon} />
  </BottomNavigation>
);

const MyNavigationContainer = () => (
  <NavigationContainer>
    <Navigator tabBar={props => <MyBottomNavigation {...props} />}>
      <Screen
        name="Retreat"
        component={RetreatNavigation}
        options={{headerShown: false}}
      />
      <Screen
        name="Favorites"
        component={FavoritesNavigation}
        options={{headerShown: false}}
      />
      <Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </Navigator>
  </NavigationContainer>
);

export default MyNavigationContainer;
