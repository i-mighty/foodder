import UserReducer from './UserReducer'
import { combineReducers } from 'redux'
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import admin from './AdminReducer';

const reducer = combineReducers({
  user: UserReducer,
  admin: admin,
});
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);