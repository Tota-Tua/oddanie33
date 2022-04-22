import React from 'react';
import {Icon, List, ListItem, Text} from '@ui-kitten/components';
import {ImageBackground, StyleSheet, View} from 'react-native';
import images from '../../res/images/images';

function generateListData({title, subtitle}) {
  const DAYS_NO = 33;
  return new Array(DAYS_NO).fill().map((el, index) => {
    return {
      index: index + 1,
      title: title,
      description: subtitle,
    };
  });
}

function generateUrl(index, urlPattern) {
  return urlPattern.replace('${number}', index);
}

export default ({navigation, route: {params}}) => {
  const renderItemAccessory = props => {
    return (
      // TODO
      // implement adding to favorites
      //<TouchableOpacity>
      <Icon
        style={[props.style, styles.iconStyle]}
        name="heart"
        fill="#FF0000"
      />
      //</TouchableOpacity>
    );
  };

  const renderLeftPart = (props, dayNo) => {
    return (
      <View style={styles.bgContainer}>
        <ImageBackground
          source={images.day}
          resizeMode="contain"
          style={styles.bgImage}>
          <Text style={styles.imgText}>{`Dzień ${dayNo}`}</Text>
        </ImageBackground>
      </View>
    );
  };

  const sendData = params.id;
  const renderItem = ({item}) => (
    <ListItem
      title={props => <Text {...props}>{item.title}</Text>}
      description={props => <Text {...props}>{item.description}</Text>}
      accessoryLeft={props => renderLeftPart(props, item.index)}
      accessoryRight={renderItemAccessory}
      onPress={() => {
        navigation.navigate('DayDetails', {
          url: generateUrl(item.index, sendData.urlPattern),
        });
      }}
    />
  );

  return (
    <List
      style={styles.container}
      data={generateListData(sendData)}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgContainer: {
    height: 60,
    width: 100,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  imgText: {
    textAlign: 'center',
    color: 'white',
  },
  iconStyle: {
    animation: 'zoom',
  },
});
