import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { results: { name: string; url: string }[]; count: number; next: string | null; previous: string | null },
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
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

export const { useGetPokemonListQuery, useGetPokemonByNameQuery, useGetPokemonSpeciesQuery, useGetTypeQuery } = pokemonApi;
