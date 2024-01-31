import { combineReducers, configureStore } from '@reduxjs/toolkit';
import catReducer from '../store/catSlice';
import favouriteCatReducer from '../store/favouriteCatSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';

const persistconfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['favouriteCats'],
};

const rootReducer = combineReducers({
  cats: catReducer,
  favouriteCats: favouriteCatReducer,
});

const persistedreducer = persistReducer(persistconfig, rootReducer);

export const store = configureStore({
  reducer: persistedreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
