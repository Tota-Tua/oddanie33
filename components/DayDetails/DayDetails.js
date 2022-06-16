import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {CheckBox, Divider, Layout, Text} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
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

function isCompleted(url) {
  const completed = store.getState().completed;
  return completed.list.some(refItemURL => refItemURL === url);
}

const DELAY_BEFORE_USING_WEBVIEW = 1000;
const DEFAULT_TOP_NAVIGATION_HEIGHT = 56;
// to prevent from unwanted navigation
const injectedJSCode =
  '["nav", "footer", ".nav"].forEach(el => document.querySelector(el).remove());';
import NetworkInfoObj from '../../services/NetworkInfo';

const DayDetails = ({navigation, route: {params}}) => {
  const [isFetching, setFetching] = useState(false);
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

    return () => {
      Orientation.lockToPortrait();
      isMountedRef.current = false;
    };
  }, []);

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
        <WebView
          style={styles.webView}
          originWhitelist={[]}
          source={{
            uri: params.item.url,
          }}
          injectedJavaScript={injectedJSCode}
          onLoadStart={() => setFetching(true)}
          onLoadEnd={() =>
            setTimeout(() => {
              isMountedRef.current && setFetching(false);
            }, DELAY_BEFORE_USING_WEBVIEW)
          }
          allowsFullscreenVideo={true} // does not work yet correctly with rotation */
        />
      ) : (
        <ErrorPage navigation={navigation} />
      )}
      <Spinner visability={isFetching} style={{top: topNavigationOffset}} />
    </Layout>
  );
};

export default DayDetails;
