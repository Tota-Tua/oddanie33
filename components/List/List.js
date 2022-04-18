import React from 'react';
import {Button, List, ListItem, Text} from '@ui-kitten/components';
import {Image, StyleSheet} from 'react-native';
import images from '../../res/images/images';

// genertate list data
const DAYS_NO = 33;
const listData = new Array(DAYS_NO).fill().map((el, index) => {
  return {
    index: index,
    title: `Dzien ${index + 1} oddania`,
    description: 'Standardowa forma oddania',
  };
});

const imgStyle = {width: 100, height: 50, padding:0, margin:0};
export default () => {
  const renderItemAccessory = props => <Button size="tiny">NOT ACTIVE</Button>;
  const renderLeftPart = props => <Image resizeMode="contain" style={imgStyle} source={images.day} />;
  const renderItem = ({item, index}) => (
    <ListItem
      title={props => <Text {...props}>{item.title}</Text>}
      description={props => <Text {...props}>{item.description}</Text>}
      accessoryLeft={renderLeftPart}
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
