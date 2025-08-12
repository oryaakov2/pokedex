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
  selectedPokemon: any;
  offset: number;
  hasMore: boolean;
}