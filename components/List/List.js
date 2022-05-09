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

export default ({navigation, route: {params}}) => {
  const renderItemAccessory = props => {
    return <HeartIcon {...props} />;
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
        navigation.navigate('DayDetails', { url: item.url});
      }}
    />
  );

  const [isFetching, setFetching] = useState(false);
  const [data] = useState(JSON.stringify(params.data.daysInfo));
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
  }, [data]);

  return (
    <View style={styles.container}>
      <List
        style={styles.list}
        data={params.data.daysInfo}
        renderItem={renderItem}
      />
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
