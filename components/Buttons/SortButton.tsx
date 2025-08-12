import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";

const SortButton = () => {
  return (
    <TouchableOpacity style={styles.iconButton}>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: COLORS.DARK_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
});

export default SortButton;
