import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {RetreatNavigation, FavoritesNavigation} from './stackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeIcon = props => <Icon {...props} name="home" />;
const FavoriteIcon = props => <Icon {...props} name="heart" />;

function handleOnSelect(routeName, navigation) {
  navigation.navigate(routeName);
}

const MyBottomNavigation = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => handleOnSelect(state.routeNames[index], navigation)}>
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={FavoriteIcon} />
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
    </Navigator>
  </NavigationContainer>
);

export default MyNavigationContainer;
