import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers/favorites';
import AsyncStorage from '@react-native-async-storage/async-storage';
import saveInitialDataInAsyncStorage from './index';
import {saveAll} from './reducers/favorites';

const store = configureStore({
  reducer: rootReducer,
});

saveInitialDataInAsyncStorage()
  .then(updateStateBasedOnAsyncStore)
  .catch(console.log);

async function updateStateBasedOnAsyncStore() {
  const jsonData = await AsyncStorage.getItem('favorites');
  const favorites = JSON.parse(jsonData);

  store.dispatch(saveAll(favorites));
  console.log('store: saveAll');
  //console.log(`Uwaga ${JSON.stringify(store.getState())}`);
}

export default store;
