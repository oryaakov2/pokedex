import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPE_COLORS } from '../../constants/colors';

interface WeakTabProps {
  weakTypes: string[];
}

const WeakTab: React.FC<WeakTabProps> = ({ weakTypes }) => {
  return (
    <View style={styles.section}>
      <View style={styles.typesRow}>
        {weakTypes.map((t) => (
          <View key={t} style={[styles.typeChip, { backgroundColor: TYPE_COLORS[t as keyof typeof TYPE_COLORS] || COLORS.MEDIUM_GREY }]}>
            <Text style={styles.typeChipText}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginTop: 12 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.DARK_BLUE,
    marginBottom: 6,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  typeChipText: {
    color: COLORS.DARK_BLUE,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});

export default WeakTab; 