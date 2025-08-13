import { useGetPokemonByNameQuery } from "../store/api/pokemonApi";

export const usePokemonType = (name: string) => {
  const { data } = useGetPokemonByNameQuery(name);
  return data?.types?.[0]?.type?.name || 'normal';
};
