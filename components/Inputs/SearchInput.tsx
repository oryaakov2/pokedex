import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "../../constants/colors";

const SearchInput = () => {

  

  return (
    <TextInput
      style={styles.input}
      keyboardType="default"
      placeholder="Name or number"
      onChangeText={(text) => console.log(text)}
    />
  );

};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.LIGHT_GREY,
    padding: 17,
    borderRadius: 15,
    width: '85%',
  },
});

export default SearchInput;
