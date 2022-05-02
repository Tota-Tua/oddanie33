import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import Spinner from '../Spinner/Spinner';
import {StyleSheet, View} from 'react-native';

const DayDetails = ({route: {params}}) => {
  // the intention is to prevent from navigation
  const injectedJSCode =
    '["nav", "footer", ".nav"].forEach(el => document.querySelector(el).remove());';

  const [isFetching, setFetching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setFetching(true);
    setIsMounted(true);
    return () => isMounted && setIsMounted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.url]);

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webView}
        originWhitelist={[]}
        source={{uri: params.url}}
        injectedJavaScript={injectedJSCode}
        onLoadEnd={() => setTimeout(() => setFetching(false), 500)}
        /*allowsFullscreenVideo={true} // does not work yet correctly with rotation */
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
