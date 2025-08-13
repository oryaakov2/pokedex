import type { PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '../slices/searchSlice';


export const searchReducers = {
  setSearchQuery(state: SearchState, action: PayloadAction<string>) {
    state.searchQuery = action.payload;
  },
  clearSearch(state: SearchState) {
    state.searchQuery = '';
  },
};