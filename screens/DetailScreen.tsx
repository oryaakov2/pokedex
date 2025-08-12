import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import React, { useMemo, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { useGetPokemonByNameQuery, useGetPokemonSpeciesQuery } from "../store/pokemonApi";
import { TYPE_COLORS, COLORS } from "../constants/colors";
import { POKEMON_IMAGE_URL } from "../constants/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Tabs, { TabName } from "../components/Tabs/Tabs";
import { useSelector } from "react-redux";
import { selectSelectedPokemon } from "../store/slices/pokemonSlice";

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { pokemonId } = route.params;

  const saved = useSelector(selectSelectedPokemon);

  const { data: pokemon } = useGetPokemonByNameQuery(String(pokemonId));
  const { data: species } = useGetPokemonSpeciesQuery(pokemonId);

  const pokemonImage = useMemo(() => `${POKEMON_IMAGE_URL}/${pokemonId}.png`, [pokemonId]);

  const description = useMemo(() => {
    const entry = species?.flavor_text_entries?.find((e: any) => e?.language?.name === 'en');
    return entry?.flavor_text?.replace(/\f|\n/g, ' ') ?? '';
  }, [species]);

  const [activeTab, setActiveTab] = useState<TabName>("Forms");

  const heroBg = saved?.backgroundColor || TYPE_COLORS['normal'];

  const formOptions = useMemo(() => {
    const varieties: Array<{ is_default: boolean; pokemon: { name: string; url: string } }> | undefined = species?.varieties;
    if (!varieties) return [] as Array<{ id: number; name: string; image: string; isDefault: boolean }>;
    return varieties.map((v) => {
      const parts = v.pokemon.url.split('/').filter(Boolean);
      const id = Number(parts[parts.length - 1]);
      return {
        id,
        name: v.pokemon.name,
        image: `${POKEMON_IMAGE_URL}/${id}.png`,
        isDefault: v.is_default,
      };
    });
  }, [species]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>{pokemon?.name || 'Pokemon'}</Text>
            <Text style={styles.idText}>{pokemonId}</Text>
          </View>
        </View>

        <View style={[styles.heroCard, { backgroundColor: heroBg }]}>        
          <Image source={{ uri: pokemonImage }} style={styles.heroImage} />
        </View>

        <Tabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'Forms' ? (
          <View style={styles.section}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.formsRow}>
              {formOptions.map((f) => (
                <TouchableOpacity key={f.id} style={[styles.formThumbWrap, f.id === pokemonId && styles.formThumbActive]}>
                  <Image source={{ uri: f.image }} style={styles.formThumb} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : <></>}

        {activeTab === 'Detail' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionBody}>{description}</Text>
          </View>
        ) : <></>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  content: {
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  backButton: {
    padding: 8,
    marginRight: 8
  },
  backText: {
    fontSize: 18,
    color: COLORS.DARK_BLUE
  },
  headerTextWrap: {
    flexDirection: 'column',
    flex: 1, alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.DARK_BLUE
  },
  idText: {
    fontSize: 12,
    color: COLORS.DARK_GREY
  },
  heroCard: {
    height: 400,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  heroImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.DARK_BLUE,
    marginBottom: 6,
  },
  sectionBody: {
    color: COLORS.DARK_GREY,
    lineHeight: 20,
  },
  formsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  formThumbWrap: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  formThumbActive: {
    backgroundColor: '#E2E8F0',
  },
  formThumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
});

export default DetailScreen;
