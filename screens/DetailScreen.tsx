import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import React, { useMemo, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { useGetPokemonByNameQuery, useGetPokemonSpeciesQuery, useGetTypeQuery } from "../store/api/pokemonApi";
import { TYPE_COLORS, COLORS } from "../constants/colors";
import { POKEMON_IMAGE_URL } from "../constants/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Tabs, { TabName } from "../components/Tabs/Tabs";
import { useSelector } from "react-redux";
import { selectSelectedPokemon } from "../store/slices/pokemonSlice";
import FormsTab from "../components/Tabs/FormsTab";
import DetailTab from "../components/Tabs/DetailTab";
import TypesTab from "../components/Tabs/TypesTab";
import StatsTab from "../components/Tabs/StatsTab";
import WeakTab from "../components/Tabs/WeakTab";
import Icon from "react-native-vector-icons/Feather";

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { pokemonId } = route.params;

  const [activeFormId, setActiveFormId] = useState<number>(pokemonId);
  const selectedPokemon = useSelector(selectSelectedPokemon);

  const { data: pokemon } = useGetPokemonByNameQuery(String(activeFormId));
  const { data: species } = useGetPokemonSpeciesQuery(activeFormId);

  const pokemonImage = useMemo(() => `${POKEMON_IMAGE_URL}/${activeFormId}.png`, [activeFormId]);

  const description = useMemo(() => {
    const entry = species?.flavor_text_entries?.find((e: any) => e?.language?.name === 'en');
    return entry?.flavor_text?.replace(/\f|\n/g, ' ') ?? '';
  }, [species]);

  const [activeTab, setActiveTab] = useState<TabName>("Forms");

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

  const typeNames: string[] = useMemo(() => (pokemon?.types || []).map((t: any) => t?.type?.name).filter(Boolean), [pokemon]);
  const stats: Array<{ label: string; value: number }> = useMemo(() => (
    (pokemon?.stats || []).map((s: any) => ({ label: s?.stat?.name, value: s?.base_stat }))
  ), [pokemon]);
  const mainTypeColor = useMemo(() => {
    const key = typeNames?.[0] as keyof typeof TYPE_COLORS | undefined;
    return (key && TYPE_COLORS[key]) || selectedPokemon?.backgroundColor || TYPE_COLORS.normal;
  }, [typeNames, selectedPokemon]);

  const typeA = typeNames[0];
  const typeB = typeNames[1];
  const { data: typeAData } = useGetTypeQuery(typeA || '', { skip: !typeA });
  const { data: typeBData } = useGetTypeQuery(typeB || '', { skip: !typeB });
  const weakTypes: string[] = useMemo(() => {
    const a = (typeAData?.damage_relations?.double_damage_from || []).map((t: any) => t.name);
    const b = (typeBData?.damage_relations?.double_damage_from || []).map((t: any) => t.name);
    const set = new Set<string>([...a, ...b]);
    return Array.from(set);
  }, [typeAData, typeBData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon style={styles.backArrow} name='arrow-left' />
          </TouchableOpacity>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>{selectedPokemon?.name}</Text>
            <Text style={styles.idText}>{activeFormId.toString().padStart(3, '0')}</Text>
          </View>
        </View>

        <View style={[styles.heroCard, { backgroundColor: mainTypeColor }]}>
          <Image source={{ uri: pokemonImage }} style={styles.heroImage} />
        </View>

        <Tabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'Forms' ? (
          <FormsTab
            formOptions={formOptions}
            activeFormId={activeFormId}
            onSelectForm={setActiveFormId}
            chipBgColor={selectedPokemon?.backgroundColor}
          />
        ) : <></>}

        {activeTab === 'Detail' ? (
          <DetailTab description={description} />
        ) : <></>}

        {activeTab === 'Types' ? (
          <TypesTab typeNames={typeNames} />
        ) : <></>}

        {activeTab === 'Stats' ? (
          <StatsTab stats={stats} barColor={mainTypeColor} />
        ) : <></>}

        {activeTab === 'Weak' ? (
          <WeakTab weakTypes={weakTypes} />
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
    marginVertical: 12
  },
  backButton: {
    position: 'absolute',
    padding: 8,
    marginRight: 8
  },
  backArrow: {
    fontSize: 30,
    color: COLORS.DARK_BLUE
  },
  headerTextWrap: {
    flexDirection: 'column',
    flex: 1, 
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: COLORS.DARK_BLUE
  },
  idText: {
    fontSize: 18,
    fontWeight: '600',
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
});

export default DetailScreen;
