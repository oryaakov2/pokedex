import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { memo } from "react";

const SortButton = () => {
  return (
    <TouchableOpacity style={styles.iconButton}>
      <Icon name="tune-variant" size={20} color={COLORS.WHITE} />
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

export default memo(SortButton);
