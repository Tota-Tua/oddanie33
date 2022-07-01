import React, {useEffect, useRef, useState} from 'react';
import {CheckBox, Divider, Layout, Text} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Spinner from '../Spinner/Spinner';
import store from '../../store/store';
import {
  add as addCompleted,
  remove as removeCompleted,
} from '../../store/reducers/completed';
import {styles} from './DayDetails.styles';
import ThisTopNavigation from './TopNavigation';
import ErrorPage from './ErrorPage';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

function isCompleted(url) {
  const completed = store.getState().completed;
  return completed.list.some(refItemURL => refItemURL === url);
}

const DEFAULT_TOP_NAVIGATION_HEIGHT = 56;
// to prevent from unwanted navigation
import NetworkInfoObj from '../../services/NetworkInfo';
import { setDarkMode } from '../../store/reducers/settings';

const DayDetails = ({navigation, route: {params}}) => {
  const [isFetching, setFetching] = useState(true);
  const [fetchedData, setFetchedData] = useState();
  const [isDone, setIsDone] = useState(isCompleted(params.item.url));
  const [topNavigationOffset, setTopNavigationOffset] = useState(
    DEFAULT_TOP_NAVIGATION_HEIGHT,
  );
  const isMountedRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //avoiding first execution
    if (isMountedRef.current) {
      const action = isDone ? addCompleted : removeCompleted;
      dispatch(action(params.item.url));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone]);

  useEffect(() => {
    Orientation.unlockAllOrientations();
    isMountedRef.current = true;

    fetch(params.item.url)
    .then(response => response.json())
    .then(result => {
      // remove  mistakes
      let html = result.content
      .replace(/\r\n/g, "")
      .replace(/<p style="text-align:justify">&nbsp;<\/p>/g, "");

      setFetchedData(html);
      setFetching(false);
    })
    .catch(error => {
      setFetching(false);
    });

    return () => {
      Orientation.lockToPortrait();
      isMountedRef.current = false;
    };
  }, []);

  const { width } = useWindowDimensions();
  return (
    <Layout style={styles.container}>
      <ThisTopNavigation
        item={params.item}
        navigation={navigation}
        onLayout={event =>
          setTopNavigationOffset(event.nativeEvent.layout.height)
        }
      />
      <TouchableOpacity
        style={styles.passedField}
        activeOpacity={1.0}
        onPress={() => setIsDone(prevVal => !prevVal)}>
        <Text>Zaznacz jako przemodlone</Text>
        <CheckBox
          onChange={() => setIsDone(prevVal => !prevVal)}
          checked={isDone}
          status="primary"
        />
      </TouchableOpacity>
      <Divider />

      {NetworkInfoObj.isConnected ? (
        <ScrollView style={{ flex: 1,}}>
          {fetchedData ? (<View style={{marginHorizontal: 5}}><RenderHtml
              contentWidth={width}
              source={{html: fetchedData}}
            /></View>) : undefined}
        </ScrollView>
      ) : (
        <ErrorPage navigation={navigation} />
      )}
      <Spinner visability={isFetching} style={{top: topNavigationOffset}} />
    </Layout>
  );
};

export default DayDetails;
