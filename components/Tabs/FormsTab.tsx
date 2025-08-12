import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface FormOption {
  id: number;
  name: string;
  image: string;
  isDefault: boolean;
}

interface FormsTabProps {
  formOptions: FormOption[];
  activeFormId: number;
  onSelectForm: (id: number) => void;
  chipBgColor?: string;
}

const FormsTab: React.FC<FormsTabProps> = ({ formOptions, activeFormId, onSelectForm, chipBgColor }) => {
  return (
    <View style={styles.section}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.formsRow}>
        {formOptions.map((f) => (
          <TouchableOpacity
            key={f.id}
            onPress={() => onSelectForm(f.id)}
            style={[styles.formThumbWrap, f.id === activeFormId && styles.formThumbActive, { backgroundColor: chipBgColor, opacity: f.id === activeFormId ? 1 : 0.5 }]}
          >
            <Image source={{ uri: f.image }} style={styles.formThumb} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginTop: 12 },
  formsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  formThumbWrap: {
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  formThumbActive: {
    opacity: 1,
  },
  formThumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
});

export default FormsTab; 