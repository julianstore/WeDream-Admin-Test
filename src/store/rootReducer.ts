import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import categoryReducer from './slices/categorySlice';
import dreamReducer from './slices/dreamSlice';

import { connectRouter } from 'connected-react-router';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    category: categoryReducer,
    dream: dreamReducer
  });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
