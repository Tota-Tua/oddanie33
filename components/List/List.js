import React from 'react';
import {Button, Icon, List, ListItem} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

// genertate list data
const DAYS_NO = 33;
const listData = new Array(DAYS_NO).fill().map((el, index) => {
  return {
    index: index,
    title: `Dzien ${index + 1} oddania`,
    description: 'Standardowa forma oddania',
  };
});

export default () => {
  const renderItemAccessory = props => <Button size="tiny">GO</Button>;

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.description}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <List style={styles.container} data={listData} renderItem={renderItem} />
  );
};

const styles = StyleSheet.create({
  container: {},
});
