import React from 'react';
import {FlatList, Text, View} from 'react-native';

import styles from './Grid.styles';

const Grid = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        numColumns={3}
        data={sectionListData}
        renderItem={({item}) => renderItem(item, navigation)}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

const renderItem = (item, navigation) => {
  return (
    <View style={styles.gridStyle}>
      <Text
        style={styles.gridText}
        onPress={() => navigation.navigate('DayDetails', {id: item.id})}>
        {item.title}
      </Text>
    </View>
  );
};

const renderHeader = () => {
  const header = (
    <View style={styles.listViewHeader}>
      <Text style={styles.listViewHeaderText}>Wybierz dzień rekolekcji</Text>
    </View>
  );

  return header;
};

// genertate list data
const sectionListData = [];
const DAYS_NO = 33;
for (let i = 1; i <= DAYS_NO; ++i) {
  sectionListData.push({
    id: `${i}`,
    title: `Dzień ${i}`,
  });
}

export default Grid;
