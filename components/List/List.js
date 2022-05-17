import React, {useEffect, useRef, useState} from 'react';
import {List, ListItem, Text} from '@ui-kitten/components';
import {ImageBackground, StyleSheet, View} from 'react-native';
import images from '../../res/images/images';
import Spinner from '../Spinner/Spinner';

const DELAY_BEFORE_USING_LIST = 1000;
export default ({navigation, route: {params}, ...restProps}) => {
  // the list takes input data either from route.params and if it is empty then from data param
  const data = (params && params.data) || restProps.data;
  const renderItemAccessory = (props, item) => {
    const updatedProps = Object.assign(
      {
        item,
      },
      props,
    );
    return restProps.icon
      ? React.createElement(restProps.icon, updatedProps)
      : null;
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
      description={props => <Text {...props}>{item.subtitle}</Text>}
      accessoryLeft={props => renderLeftPart(props, index + 1)}
      accessoryRight={props => renderItemAccessory(props, item)}
      onPress={() => {
        restProps && restProps.onPress && restProps.onPress(item);
        navigation.navigate('DayDetails', {url: item.url});
      }}
    />
  );

  const [isFetching, setFetching] = useState(false);
  const [stringifyData] = useState(JSON.stringify(data));
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    setFetching(true);
    setTimeout(
      () => isMountedRef.current && setFetching(false),
      DELAY_BEFORE_USING_LIST,
    );
  }, [stringifyData]);

  console.log(
    `Rysuje Liste,zamontowana: ${isMountedRef.current}, hash: ${JSON.stringify(
      hashCode(stringifyData),
    )}`,
  );
  return (
    <>
      <List
        contentContainerStyle={styles.contentList}
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        ListEmptyComponent={renderEmptyList}
      />
      <Spinner visability={isFetching} />
    </>
  );
};

function renderEmptyList() {
  return (
    <View style={styles.emptyListView}>
      <Text>Lista jest pusta </Text>
    </View>
  );
}

function hashCode(str) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    elevation: 1,
  },
  contentList: {
    flexGrow: 1,
  },
  emptyListView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
