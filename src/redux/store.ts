import { configureStore } from '@reduxjs/toolkit';
// reducer
import cities from './slices/cities';

export default configureStore({
  reducer: {
    cities
  }
});