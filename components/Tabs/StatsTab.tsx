import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';

interface StatItem { label: string; value: number }

interface StatsTabProps {
  stats: StatItem[];
  barColor: string;
}

const StatsTab: React.FC<StatsTabProps> = ({ stats, barColor }) => {
  return (
    <View style={styles.section}>
      <View style={styles.statsWrap}>
        {stats.map((s) => {
          const pct = Math.min(1, (s.value || 0) / 255);
          return (
            <View key={s.label} style={styles.statRow}>
              <Text style={styles.statLabel}>{s.label}</Text>
              <View style={styles.statBar}>
                <View style={[styles.statFill, { width: `${pct * 100}%`, backgroundColor: barColor }]} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
            </View>
          );
        })}
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
  statsWrap: { gap: 10 },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    width: 80,
    textTransform: 'capitalize',
    color: COLORS.DARK_GREY,
  },
  statBar: {
    flex: 1,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  statFill: {
    height: '100%',
    borderRadius: 8,
  },
  statValue: {
    width: 36,
    textAlign: 'right',
    color: COLORS.DARK_BLUE,
    fontWeight: '600',
  },
});

export default StatsTab; 