import { createSlice } from '@reduxjs/toolkit';
import { pokemonReducers } from '../reducers/pokemonReducer';
import type { RootState } from '../store';

export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
}

export interface PokemonApiListResultItem {
  name: string;
  url: string;
}

export interface PokemonApiListResponseLike {
  results: PokemonApiListResultItem[];
  next: string | null;
}

export interface PokemonState {
  items: PokemonListItem[];
  offset: number;
  hasMore: boolean;
}

const initialState: PokemonState = {
  items: [],
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
