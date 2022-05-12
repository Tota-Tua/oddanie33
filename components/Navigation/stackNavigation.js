import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Entry from '../Entry/Entry';
import List from '../List/List';
import DayDetails from '../DayDetails/DayDetails';
import Favorites from '../Favorites/Favorites';

const {Navigator, Screen} = createNativeStackNavigator();

export const RetreatNavigation = ({route, navigation}) => {
  return (
    <Navigator>
      <Screen name="Entry" component={Entry} options={{headerShown: false}} />
      <Screen
        name="List"
        options={{title: 'Wybierz dzień rekolekcji'}}
        component={List}
      />
      <Screen
        name="DayDetails"
        options={{title: 'Opis dnia'}}
        component={DayDetails}
      />
    </Navigator>
  );
};

export const FavoritesNavigation = ({route, navigation}) => {
  return (
    <Navigator>
      <Screen
        name="EntryFavorites"
        component={Favorites}
        options={{title: 'Ulubione'}}
      />
      <Screen
        name="DayDetails"
        options={{title: 'Opis dnia'}}
        component={DayDetails}
      />
    </Navigator>
  );
};
