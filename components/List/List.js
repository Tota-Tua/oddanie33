import React, {useEffect, useRef, useState} from 'react';
import {Divider, List, ListItem, Text} from '@ui-kitten/components';
import {ImageBackground, StyleSheet, View} from 'react-native';
import images from '../../res/images/images';
import Spinner from '../Spinner/Spinner';
import store from '../../store/store';
import {useSelector} from 'react-redux';

const DELAY_BEFORE_USING_LIST = 1500; // becuase of the performance reasons, to avoid lack of responsivness
export default ({navigation, route: {params}, ...restProps}) => {
  // the list takes input data either from route.params and if it is empty then from data param
  const data = (params && params.data) || restProps.data;
  const renderRightPart = (props, item) => {
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

  function isCompleted(url) {
    const completed = store.getState().completed;
    return completed.list.some(refItemURL => refItemURL === url);
  }

  function addBgStyleIfCompleted(item) {
    if (isCompleted(item.url)) {
      return {backgroundColor: 'rgba(0, 0, 0, 0.1)'};
    }
  }
  const renderItem = ({item, index}) => (
    <ListItem
      style={addBgStyleIfCompleted(item)}
      title={props => (
        <Text {...props} numberOfLines={3} ellipsizeMode="tail">
          {item.title}
        </Text>
      )}
      description={props => <Text {...props}>{item.subtitle}</Text>}
      accessoryLeft={props => renderLeftPart(props, item.day)}
      accessoryRight={props => renderRightPart(props, item)}
      onPress={() => {
        restProps && restProps.onPress && restProps.onPress(item);
        navigation.navigate('DayDetails', {item});
      }}
    />
  );

  const [isFetching, setFetching] = useState(false);
  const [stringifyData] = useState(JSON.stringify(data));
  const isMountedRef = useRef(false);
  useSelector(state => state.completed.list);

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

  return (
    <>
      <List
        contentContainerStyle={styles.contentList}
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        ListEmptyComponent={renderEmptyList}
        ItemSeparatorComponent={Divider}
      />
      <Spinner visability={isFetching} style={restProps.spinnerViewStyle} />
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
