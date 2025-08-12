import React, { memo, useMemo } from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, TYPE_COLORS } from "../../constants/colors";
import { usePokemonType } from "../../hooks/usePokemonType";
import { SCREEN_WIDTH } from "../../constants/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

interface CardProps {
  id: number;
  name: string;
  image: string;
}

const cardWidth = (SCREEN_WIDTH - 60) / 2;

const Card: React.FC<CardProps> = ({ id, name, image }) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const pokemonType = usePokemonType(name);

  const backgroundColor = useMemo(() => {
    return TYPE_COLORS[pokemonType as keyof typeof TYPE_COLORS] || TYPE_COLORS['normal']
  }, [pokemonType]);

  const renderPokemonNumber = useMemo(() => {
    return `${id.toString().padStart(3, '0')}`;
  }, [id]);

  const onPressHandler = () => {
    navigation.push('Details', { pokemonId: id });
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: backgroundColor }]}
      activeOpacity={0.8}
      onPress={onPressHandler}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.text}>{renderPokemonNumber}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 25,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    borderRadius: 16,
    opacity: 0.15,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: COLORS.DARK_GREY,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    color: COLORS.DARK_BLUE,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
});

export default memo(Card);
