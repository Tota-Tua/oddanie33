import React from 'react';
import WebView from 'react-native-webview';

const DayDetails = ({route: {params}}) => {
  // the intention is to prevent from navigation
  const injectedJSCode =
    '["nav", "footer"].forEach(el => document.querySelector(el).remove());';
  return (
    <WebView
      originWhitelist={[]}
      source={{uri: params.url}}
      injectedJavaScript={injectedJSCode}
      /*allowsFullscreenVideo={true} // does not work yet correctly with rotation */
    />
  );
};

export default DayDetails;
