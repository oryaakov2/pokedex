import { FC, useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import Card from "./Card";
import { COLORS } from "../../constants/colors";

interface CardListProps {
  data: Array<{
    id: number;
    name: string;
    image: string;
  }>;
  onEndReached?: () => void;
  isFetchingMore?: boolean;
}

const CardList: FC<CardListProps> = ({ data, onEndReached, isFetchingMore }) => {

  const renderItem = useMemo(() => ({ item }: {
    item: { id: number; name: string; image: string }
  }) => {
    return <Card {...item} />
  }, [data.length]);

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.row}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={() => <Text style={styles.noResultsText}>No results found</Text>}
      ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color={COLORS.DARK_PURPLE} /> : null}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  noResultsText: {
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 20
  },
});

export default CardList;
