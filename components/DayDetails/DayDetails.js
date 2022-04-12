import React from 'react';
import WebView from 'react-native-webview';

const DayDetails = ({route}) => {
  const uri = `https://oddanie33.pl/dzien-${route.params.id}/tekst-skrocony`;
  return <WebView originWhitelist={['*']} source={{uri}} />;
};

export default DayDetails;
