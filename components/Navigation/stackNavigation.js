import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Entry from '../Entry/Entry';
import RetreatList from '../RetreatList/RetreatList';
import DayDetails from '../DayDetails/DayDetails';
import Favorites from '../Favorites/Favorites';

const {Navigator, Screen} = createNativeStackNavigator();

export const RetreatNavigation = ({route, navigation}) => {
  return (
    <Navigator>
      <Screen name="Entry" component={Entry} options={{headerShown: false}} />
      <Screen
        name="RetreatList"
        options={{
          title: 'Wybierz dzień rekolekcji',
          headerShown: false,
        }}
        component={RetreatList}
      />
      <Screen
        name="DayDetails"
        options={{
          title: 'Opis dnia',
          headerShown: false,
        }}
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
        options={{
          title: 'Ulubione',
          headerShown: false,
        }}
      />
      <Screen
        name="DayDetails"
        options={{
          title: 'Opis dnia',
          headerShown: false,
        }}
        component={DayDetails}
      />
    </Navigator>
  );
};
