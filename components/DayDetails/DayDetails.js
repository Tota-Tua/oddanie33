import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {
  CheckBox,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import Spinner from '../Spinner/Spinner';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import store from '../../store/store';
import {add, remove} from '../../store/reducers/completed';
import {useDispatch} from 'react-redux';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const BackAction = (navigation, props) => (
  <TopNavigationAction icon={BackIcon} onPressIn={() => navigation.goBack()} />
);

function isCompleted(url) {
  const completed = store.getState().completed;
  return completed.list.some(refItemURL => refItemURL === url);
}

const DELAY_BEFORE_USING_WEBVIEW = 1000;
const DayDetails = ({navigation, route: {params}}) => {
  // the intention is to prevent from navigation
  const injectedJSCode =
    '["nav", "footer", ".nav"].forEach(el => document.querySelector(el).remove());';

  const [isFetching, setFetching] = useState(false);
  const [isDone, setIsDone] = useState(isCompleted(params.url));
  const isMountedRef = useRef(false);
  const dispatch = useDispatch();
  useEffect(() => {
    //avoiding first execution
    if (isMountedRef.current) {
      const action = isDone ? add : remove;
      dispatch(action(params.url));
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

  useEffect(() => setFetching(true), [params.url]);

  return (
    <Layout style={styles.container}>
      <TopNavigation
        alignment="center"
        accessoryLeft={BackAction.bind(undefined, navigation)}
        title="Opis rekolekcji"
      />
      <TouchableOpacity
        style={styles.passedField}
        activeOpacity={1.0}
        onPress={() => setIsDone(prevVal => !prevVal)}>
        <Text>Zaznacz jako przerobione</Text>
        <CheckBox
          onChange={() => setIsDone(prevVal => !prevVal)}
          checked={isDone}
          status="primary"
        />
      </TouchableOpacity>
      <Divider />
      <WebView
        style={styles.webView}
        originWhitelist={[]}
        source={{uri: params.url}}
        injectedJavaScript={injectedJSCode}
        onLoadEnd={() =>
          setTimeout(() => {
            isMountedRef.current && setFetching(false);
          }, DELAY_BEFORE_USING_WEBVIEW)
        }
        allowsFullscreenVideo={true} // does not work yet correctly with rotation */
      />
      <Spinner visability={isFetching} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  passedField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  webView: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    elevation: 1,
  },
});

export default DayDetails;
