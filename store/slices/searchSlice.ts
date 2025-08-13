import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { searchReducers } from '../reducers/searchReducer';
import { pokemonApi } from '../api/pokemonApi';
import { POKEMON_IMAGE_URL } from '../../constants/constants';

export interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: ''
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: searchReducers,
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchQuery = (state: RootState) => state.search.searchQuery;

export const selectIsSearching = createSelector(
  [selectSearchQuery],
  (searchQuery) => searchQuery.trim().length > 0
);

export const selectFilteredPokemon = createSelector(
  [(state: RootState) => state.pokemon.items, selectSearchQuery],
  (pokemonList, searchQuery) => {
    if (!searchQuery.trim()) return pokemonList;
    const query = searchQuery.trim().toLowerCase();
    const isNumeric = /^\d+$/.test(query);
    return pokemonList.filter(pokemon => {
      if (isNumeric) {
        return String(pokemon.id) === query
      }
      return pokemon.name.toLowerCase().includes(query);
    });
  }
);

export const selectApiSearchResult = createSelector(
  [(state: RootState) => state, selectSearchQuery],
  (state, searchQuery) => {
    if (!searchQuery.trim()) return null;
    const apiState = pokemonApi.endpoints.getPokemonByName.select(
      searchQuery.trim().toLowerCase()
    )(state);
    return apiState.data || null;
  }
);

export const selectSearchResults = createSelector(
  [
    selectFilteredPokemon,
    selectApiSearchResult,
    selectSearchQuery,
    (state: RootState) => state.pokemon.items
  ],
  (filteredLocal, apiResult, searchQuery, pokemonList) => {
    if (!searchQuery.trim()) return pokemonList;
    if (filteredLocal.length > 0) {
      return filteredLocal;
    }
    if (apiResult) {
      return [{
        id: apiResult.id,
        name: apiResult.name,
        image: `${POKEMON_IMAGE_URL}/${apiResult.id}.png`,
      }];
    }
    return [];
  }
);