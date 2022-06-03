import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import favoritesReducer from './reducers/favorites';
import settingsReducer from './reducers/settings';
import completedDaysReducer from './reducers/completed';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

//const rootReducer = [favoritesReducer, settingsReducer];
const rootReducer = combineReducers({
  favorites: favoritesReducer,
  settings: settingsReducer,
  completed: completedDaysReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
