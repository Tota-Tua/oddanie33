import React, {useEffect, useRef, useState} from 'react';
import {Icon, List, ListItem, Text} from '@ui-kitten/components';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../res/images/images';
import Spinner from '../Spinner/Spinner';

const DELAY_BEFORE_USING_LIST = 1000;

const HeartIcon = ({style}) => {
  const icon = useRef();
  const [selected, setSelected] = useState(false);
  const handleOnPress = () => {
    setSelected(oldVal => !oldVal);
    icon.current.startAnimation();
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Icon
        ref={icon}
        style={[style, styles.iconStyle]}
        name="heart"
        animation="pulse"
        {...(selected ? {fill: '#FF0000'} : {})}
      />
    </TouchableOpacity>
  );
};

export default ({navigation, route: {params}, ...restProps}) => {
  // the list takes input data either from route.params and if it is empty then from data param
  const data = (params && params.data) || restProps.data;
  const renderItemAccessory = props => {
    return restProps.icon ? (
      React.createElement(restProps.icon, props)
    ) : (
      <HeartIcon {...props} />
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
      description={props => <Text {...props}>{item.subtitle}</Text>}
      accessoryLeft={props => renderLeftPart(props, index + 1)}
      accessoryRight={renderItemAccessory}
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

  return (
    <View style={styles.container}>
      <List style={styles.list} data={data} renderItem={renderItem} />
      <Spinner visability={isFetching} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey',
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
    width: 28,
    height: 28,
  },
});
