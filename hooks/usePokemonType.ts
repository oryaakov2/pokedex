import { useGetPokemonByNameQuery } from "../store/pokemonApi";

export const usePokemonType = (name: string) => {
  const { data } = useGetPokemonByNameQuery(name);
  return data?.types?.[0]?.type?.name || 'normal';
};
