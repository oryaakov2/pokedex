import type { PayloadAction } from '@reduxjs/toolkit';
import type { PokemonState, PokemonApiListResponseLike } from '../slices/pokemonSlice';
import { POKEMON_IMAGE_URL } from '../../constants/constants';

const mapApiItemsToListItems = (apiItems: { name: string; url: string }[]) => {
  return apiItems.map((item) => {
    const id = Number(item.url.split('/').filter(Boolean).pop());
    const image = `${POKEMON_IMAGE_URL}/${id}.png`;
    return { id, name: item.name, image };
  });
};

export const pokemonReducers = {
  setOffset(state: PokemonState, action: PayloadAction<number>) {
    state.offset = action.payload;
  },
  replaceFromApi(state: PokemonState, action: PayloadAction<PokemonApiListResponseLike>) {
    state.items = mapApiItemsToListItems(action.payload.results);
    state.hasMore = Boolean(action.payload.next);
  },
  appendFromApi(state: PokemonState, action: PayloadAction<PokemonApiListResponseLike>) {
    const existingNames = new Set(state.items.map((p) => p.name));
    const newApiItems = action.payload.results.filter((r) => !existingNames.has(r.name));
    const newItems = mapApiItemsToListItems(newApiItems);
    state.items.push(...newItems);
    state.hasMore = Boolean(action.payload.next);
  },
  reset(state: PokemonState) {
    state.items = [];
    state.offset = 0;
    state.hasMore = true;
  },
};
