import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { POKEMON_IMAGE_URL } from '../../constants/constants';
import { PokemonApiListResultItem } from '../reducers/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { results: { id: number; name: string; image: string }[]; next: string | null },
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
      transformResponse: (response: any) => {
        return {
          results: response.results.map((p: PokemonApiListResultItem) => {
            const id = Number(p.url.split('/').filter(Boolean).pop());
            return ({
              id,
              name: p.name,
              image: `${POKEMON_IMAGE_URL}/${id}.png`
            })
          }),
          next: response.next
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
    }),
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonSpecies: builder.query<any, number | string>({
      query: (idOrName) => `pokemon-species/${idOrName}`,
    }),
    getType: builder.query<any, string>({
      query: (name) => `type/${name}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
  useGetPokemonSpeciesQuery,
  useGetTypeQuery
} = pokemonApi;
