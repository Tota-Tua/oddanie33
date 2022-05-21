import React from 'react';
import {StyleSheet} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Drawer,
  DrawerItem,
  Layout,
  Text,
  IndexPath,
} from '@ui-kitten/components';

const {Navigator, Screen} = createDrawerNavigator();

const UsersScreen = () => (
  <Layout style={styles.basic}>
    <Text category="h1">USERS</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={styles.basic}>
    <Text category="h1">ORDERS</Text>
  </Layout>
);

const DrawerContent = props => (
  <DrawerContentScrollView {...props}>
    <Drawer
      selectedIndex={new IndexPath(props.state.index)}
      onSelect={index =>
        props.navigation.navigate(props.state.routeNames[index.row])
      }>
      <DrawerItem title="Users" />
      <DrawerItem title="Orders" />
    </Drawer>
  </DrawerContentScrollView>
);

export const DrawerNavigator = () => {
  return (
    <Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Screen name="Users" component={UsersScreen} />
      <Screen name="Orders" component={OrdersScreen} />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  basic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
