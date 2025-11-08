import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import feedsReducer from './slices/feed-slice';
import userReducer from './slices/user-slice';
import constructorReducer from './slices/constructor-slice';

export const RootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  user: userReducer,
  constructor: constructorReducer
});
