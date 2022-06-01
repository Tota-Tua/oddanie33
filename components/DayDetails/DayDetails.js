import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import Spinner from '../Spinner/Spinner';
import {StyleSheet, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const BackAction = (navigation, props) => (
  <TopNavigationAction icon={BackIcon} onPressIn={() => navigation.goBack()} />
);

const DELAY_BEFORE_USING_WEBVIEW = 1000;
const DayDetails = ({navigation, route: {params}}) => {
  // the intention is to prevent from navigation
  const injectedJSCode =
    '["nav", "footer", ".nav"].forEach(el => document.querySelector(el).remove());';

  const [isFetching, setFetching] = useState(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    Orientation.unlockAllOrientations();
    isMountedRef.current = true;

    return () => {
      Orientation.lockToPortrait();
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setFetching(true);
  }, [params.url]);

  return (
    <View style={styles.container}>
      <TopNavigation
        alignment="center"
        accessoryLeft={BackAction.bind(undefined, navigation)}
        title="Opis rekolekcji"
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  webView: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    elevation: 1,
  },
});

export default DayDetails;
