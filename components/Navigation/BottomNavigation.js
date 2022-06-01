import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {RetreatNavigation, FavoritesNavigation} from './StackNavigation';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeIcon = props => <Icon {...props} name="home" />;
const FavoriteIcon = props => <Icon {...props} name="heart" />;

function handleOnSelect(index, routeName, navigation) {
  navigation.dispatch(
    CommonActions.reset({
      index: index,
      routes: [{name: 'Retreat'}, {name: 'Favorites'}],
    }),
  );
  //navigation.navigate(routeName);
}

const MyBottomNavigation = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index =>
      handleOnSelect(index, state.routeNames[index], navigation)
    }>
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
