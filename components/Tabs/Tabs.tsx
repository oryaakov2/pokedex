import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";

export const TAB_NAMES = ["Forms", "Detail", "Types", "Stats", "Weak"] as const;
export type TabName = typeof TAB_NAMES[number];

interface TabsProps {
  activeTab: TabName;
  onChange: (tab: TabName) => void;
}

const Tabs = ({ activeTab, onChange }: TabsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabsRow}
    >
      {TAB_NAMES.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onChange(tab)}
          style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.tabActive]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingRight: 24,
    marginTop: 8,
    marginBottom: 12,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9'
  },
  tabButtonActive: {
    backgroundColor: '#E2E8F0'
  },
  tabText: {
    fontSize: 18,
    color: COLORS.DARK_GREY,
    fontWeight: '600'
  },
  tabActive: {
    color: COLORS.DARK_BLUE
  },
});

export default Tabs;
