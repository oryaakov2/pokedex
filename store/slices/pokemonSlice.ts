import { createSlice } from '@reduxjs/toolkit';
import { pokemonReducers } from '../reducers/pokemonReducer';
import type { RootState } from '../store';
import { PokemonState } from './types';

const initialState: PokemonState = {
  items: [],
  selectedPokemon: {},
  offset: 0,
  hasMore: true,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: pokemonReducers,
});

export const { setOffset, replaceFromApi, appendFromApi, reset } = pokemonSlice.actions;

export default pokemonSlice.reducer;

export const selectPokemonState = (state: RootState) => state.pokemon;
export const selectPokemonItems = (state: RootState) => state.pokemon.items;
export const selectPokemonOffset = (state: RootState) => state.pokemon.offset;
export const selectPokemonHasMore = (state: RootState) => state.pokemon.hasMore;
