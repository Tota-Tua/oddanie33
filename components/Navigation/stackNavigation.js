import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Entry from '../Entry/Entry';
import List from '../List/List';
import DayDetails from '../DayDetails/DayDetails';

const {Navigator, Screen} = createNativeStackNavigator();

const RetreatNavigation = ({route, navigation}) => {
  return (
    <Navigator>
      <Screen name="Entry" component={Entry} options={{headerShown: false}} />
      <Screen
        name="List"
        options={{title: 'Wybierz dzień rekolekcji', presentation: 'modal'}}
        component={List}
      />
      <Screen
        name="DayDetails"
        options={{headerBackTitle: 'cancel', title: 'Opis dnia'}}
        component={DayDetails}
      />
    </Navigator>
  );
};

export default RetreatNavigation;
