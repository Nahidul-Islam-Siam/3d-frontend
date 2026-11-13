import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import userPreferencesReducer from './userPreferencesSlice';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  ui: uiReducer,
  userPreferences: userPreferencesReducer,
});

export default rootReducer;

