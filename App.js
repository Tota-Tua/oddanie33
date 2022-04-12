import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Entry from './components/Entry/Entry';
import Grid from './components/Grid/Grid';
import DayDetails from './components/DayDetails/DayDetails';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Entry" component={Entry} />
          <Stack.Screen name="Grid" component={Grid} />
          <Stack.Screen name="DayDetails" component={DayDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
