import React, {useEffect, useState} from 'react';
import {Icon, List, ListItem, Spinner, Text} from '@ui-kitten/components';
import {ImageBackground, StyleSheet, View} from 'react-native';
import images from '../../res/images/images';

const DBG = true;
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
      title={props => (
        <Text {...props} numberOfLines={3} ellipsizeMode="tail">
          {item.title}
        </Text>
      )}
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

  DBG && console.log('Drawing list');
  const [isFetching, setFetching] = useState(false);
  const [data, setData] = useState(JSON.stringify(params.data.daysInfo));
  useEffect(() => {
    DBG && console.log('Effect in list');
    let isMounted = true;
    setFetching(true);
    setTimeout(() => isMounted && setFetching(false), 1000);
    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <View style={styles.container}>
      <List
        style={styles.list}
        data={params.data.daysInfo}
        renderItem={renderItem}
      />
      {isFetching ? (
        <View style={styles.spinnerContainer}>
          <Spinner size="giant" status="success" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  spinnerContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 2,
    elevation: 2,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  list: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    elevation: 1,
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
