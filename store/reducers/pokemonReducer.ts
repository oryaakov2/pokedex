import type { PayloadAction } from '@reduxjs/toolkit';
import { PokemonApiListResponseLike, PokemonState } from './types';

export const pokemonReducers = {
  setOffset(state: PokemonState, action: PayloadAction<number>) {
    state.offset = action.payload;
  },
  replaceFromApi(state: PokemonState, action: PayloadAction<PokemonApiListResponseLike>) {
    state.items = action.payload.results;
    state.hasMore = Boolean(action.payload.next);
  },
  appendFromApi(state: PokemonState, action: PayloadAction<PokemonApiListResponseLike>) {
    const existingIds = new Set(state.items.map((p) => p.id));
    const newApiItems = action.payload.results.filter((r) => !existingIds.has(r.id));
    state.items = [...state.items, ...newApiItems];
    state.hasMore = Boolean(action.payload.next);
  },
  reset(state: PokemonState) {
    state.items = [];
    state.offset = 0;
    state.hasMore = true;
  },
  setSelectedPokemon(state: PokemonState, action: PayloadAction<any>) {
    state.selectedPokemon = action.payload;
  },
  clearSelectedPokemon(state: PokemonState) {
    state.selectedPokemon = null;
  },
};
