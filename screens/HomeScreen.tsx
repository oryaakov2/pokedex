import { useEffect, useCallback, useMemo } from "react";
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { COLORS } from "../constants/colors";
import SearchInput from "../components/Inputs/SearchInput";
import SortButton from "../components/Buttons/SortButton";
import CardList from "../components/Card/CardList";
import { useGetPokemonByNameQuery, useGetPokemonListQuery } from "../store/api/pokemonApi";
import { PAGE_SIZE } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  appendFromApi,
  replaceFromApi,
  setOffset,
  selectPokemonItems,
  selectPokemonOffset,
  selectPokemonHasMore
} from "../store/slices/pokemonSlice";
import {
  selectSearchResults,
  selectIsSearching,
  selectSearchQuery
} from "../store/slices/searchSlice";
import { AppDispatch } from "../store/store";
import { useDebounce } from "../hooks/useDebounce";

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const offset = useSelector(selectPokemonOffset);
  const hasMore = useSelector(selectPokemonHasMore);
  const pokemonList = useSelector(selectPokemonItems);
  const searchResults = useSelector(selectSearchResults);
  const isSearching = useSelector(selectIsSearching);
  const searchQuery = useSelector(selectSearchQuery);

  const debouncedSearchQuery = useDebounce(searchQuery);

  const shouldSearchAPI = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return false;
    
    const query = debouncedSearchQuery.trim().toLowerCase();
    const isNumeric = /^\d+$/.test(query);
    
    if (isNumeric) return true;
    
    const localMatch = pokemonList.some(pokemon => 
      pokemon.name.toLowerCase().includes(query)
    );
    
    return !localMatch;
  }, [debouncedSearchQuery, pokemonList]);

  useGetPokemonByNameQuery(
    debouncedSearchQuery.trim().toLowerCase(),
    { 
      skip: !shouldSearchAPI || !debouncedSearchQuery.trim()
    }
  );

  const { data, error, isLoading, isFetching } = useGetPokemonListQuery({ 
    offset, 
    limit: PAGE_SIZE 
  });

  useEffect(() => {
    if (!data?.results) return;

    if (offset === 0) {
      dispatch(replaceFromApi({ results: data.results, next: data.next }));
    } else {
      dispatch(appendFromApi({ results: data.results, next: data.next }));
    }
  }, [data, offset, dispatch]);

  const handleEndReached = useCallback(() => {
    if (!isFetching && hasMore && !isSearching) {
      dispatch(setOffset(offset + PAGE_SIZE));
    }
  }, [dispatch, isFetching, hasMore, offset, isSearching]);

  const showLoading = isLoading && offset === 0 && !isSearching;
  const showError = error && offset === 0 && !isSearching;
  const showNoResults = isSearching && searchResults.length === 0 && searchQuery.trim();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Pokédex</Text>
          <Text style={styles.subtitle}>
            Search for a Pokémon by name or using its National Pokédex number.
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <SearchInput />
          <SortButton />
        </View>
        {showLoading && (
          <ActivityIndicator size="large" color={COLORS.DARK_PURPLE} style={{ marginTop: 40 }} />
        )}
        {showError && (
          <Text style={{ color: 'red', marginTop: 40 }}>
            Failed to load Pokémon. Please try again.
          </Text>
        )}
        {showNoResults && (
          <Text style={{ color: COLORS.DARK_GREY, marginTop: 40, textAlign: 'center' }}>
            No Pokémon found for "{searchQuery}"
          </Text>
        )}
      </View>
      <CardList
        data={isSearching ? searchResults : pokemonList}
        onEndReached={handleEndReached}
        isFetchingMore={isFetching && offset > 0 && !isSearching}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'column',
    gap: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.DARK_BLUE,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.DARK_GREY,
    lineHeight: 20,
    marginBottom: 20,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
