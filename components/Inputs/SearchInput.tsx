import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "../../constants/colors";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setSearchQuery } from "../../store/slices/searchSlice";

const SearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeText = useCallback((text: string) => {
    dispatch(setSearchQuery(text));
  }, [dispatch]);

  return (
    <TextInput
      style={styles.input}
      keyboardType="default"
      placeholder="Name or number"
      onChangeText={handleChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.LIGHT_GREY,
    padding: 17,
    borderRadius: 15,
    width: '80%',
  },
});

export default memo(SearchInput);