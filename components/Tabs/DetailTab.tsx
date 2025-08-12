import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';

interface DetailTabProps {
  description: string;
}

const DetailTab: React.FC<DetailTabProps> = ({ description }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionBody}>{description}</Text>
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
  sectionBody: {
    color: COLORS.DARK_GREY,
    lineHeight: 20,
  },
});

export default DetailTab; 