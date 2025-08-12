import { useEffect, useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { COLORS } from "../constants/colors";
import SearchInput from "../components/Inputs/SearchInput";
import SortButton from "../components/Buttons/SortButton";
import CardList from "../components/Card/CardList";
import { useGetPokemonListQuery } from "../store/pokemonApi";
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
import { AppDispatch } from "../store/store";

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const offset = useSelector(selectPokemonOffset);
  const hasMore = useSelector(selectPokemonHasMore);
  const pokemonList = useSelector(selectPokemonItems);

  const { data, error, isLoading, isFetching } = useGetPokemonListQuery({ offset, limit: PAGE_SIZE });

  useEffect(() => {
    if (!data?.results) return;

    if (offset === 0) {
      dispatch(replaceFromApi({ results: data.results, next: data.next }));
    } else {
      dispatch(appendFromApi({ results: data.results, next: data.next }));
    }
  }, [data, offset, dispatch]);

  const handleEndReached = useCallback(() => {
    if (!isFetching && hasMore) {
      dispatch(setOffset(offset + PAGE_SIZE));
    }
  }, [dispatch, isFetching, hasMore, offset]);

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
        {isLoading && offset === 0 && (
          <ActivityIndicator size="large" color={COLORS.DARK_PURPLE} style={{ marginTop: 40 }} />
        )}
        {error && offset === 0 && (
          <Text style={{ color: 'red', marginTop: 40 }}>Failed to load Pokémon. Please try again.</Text>
        )}
      </View>
      <CardList
        data={pokemonList}
        onEndReached={handleEndReached}
        isFetchingMore={isFetching && offset > 0}
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
    gap: 10,
  },
});

export default HomeScreen;
