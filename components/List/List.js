import React from 'react';
import {Icon, List, ListItem, Text} from '@ui-kitten/components';
import {ImageBackground, StyleSheet, View} from 'react-native';
import images from '../../res/images/images';

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
        /*fill="#FF0000"*/
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

  const renderItem = ({item, index}) => (
    <ListItem
      title={props => <Text {...props} numberOfLines={3} ellipsizeMode='tail'>{item.title}</Text>}
      description={props => <Text {...props}>{item.description}</Text>}
      accessoryLeft={props => renderLeftPart(props, index + 1)}
      accessoryRight={renderItemAccessory}
      onPress={() => {
        navigation.navigate('DayDetails', {
          url: generateUrl(index + 1, item.urlPattern),
        });
      }}
    />
  );

  return (
    <List
      style={styles.container}
      data={params.data.daysInfo}
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
