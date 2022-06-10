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
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Spinner from '../Spinner/Spinner';
import store from '../../store/store';
import {
  add as addCompleted,
  remove as removeCompleted,
} from '../../store/reducers/completed';
import {
  remove as removeFavorite,
  save as saveFavorite,
  updateRetreatList,
} from '../../store/reducers/favorites';
import {styles} from './DayDetails.styles';

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
  const [isDone, setIsDone] = useState(isCompleted(params.item.url));
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

  useEffect(() => setFetching(true), [params.item.url]);

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
      <ThisTopNavigation item={params.item} navigation={navigation} />
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

      <WebView
        style={styles.webView}
        originWhitelist={[]}
        source={{uri: params.item.url}}
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

const ThisTopNavigation = props => {
  const item = props.item;
  function isFavorite(currItem) {
    const favorites = store.getState().favorites;
    return favorites.items.some(
      refItem => JSON.stringify(refItem) === JSON.stringify(currItem),
    );
  }

  const BackIcon = myProps => <Icon {...myProps} name="arrow-back" />;
  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPressIn={() => props.navigation.goBack()}
    />
  );

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(isFavorite(item));
  const [isDispatchBlocked, setDispatchBlocked] = useState(true);
  const SettingsAction = () => {
    const HeartIcon = heartProps => {
      useEffect(() => {
        if (!isDispatchBlocked) {
          const action = selected ? saveFavorite : removeFavorite;
          dispatch(action(item));
          dispatch(updateRetreatList());
          setDispatchBlocked(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [selected]);

      return (
        <Icon
          {...heartProps}
          name="heart"
          {...(selected ? {fill: '#FF0000'} : {})}
        />
      );
    };

    return (
      <TopNavigationAction
        icon={HeartIcon}
        onPressIn={() => {
          setSelected(oldVal => {
            setDispatchBlocked(false);
            return !oldVal;
          });
        }}
      />
    );
  };

  return (
    <TopNavigation
      alignment="center"
      accessoryLeft={BackAction}
      accessoryRight={SettingsAction}
      title="Opis rekolekcji"
    />
  );
};

export default DayDetails;
