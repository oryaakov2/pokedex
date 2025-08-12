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

export interface SelectedPokemon {
  id: number;
  name: string;
  image: string;
  type?: string;
  backgroundColor?: string;
}

export interface PokemonState {
  items: PokemonListItem[];
  selectedPokemon: SelectedPokemon | null;
  offset: number;
  hasMore: boolean;
}