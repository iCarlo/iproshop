import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsReducer'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartReducer';
import { reducer as notificationsReducer } from 'reapop'
import authReducer from './authReducer';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}


const combinedReducers = combineReducers({
  productsState: productsReducer,
  cartState: cartReducer,
  authState: authReducer,
  notifications: notificationsReducer(),
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const store = configureStore({
  reducer: {
    shop: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;