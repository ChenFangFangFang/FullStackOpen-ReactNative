import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  statItem: {
    flexDirection: 'column',
    alignItems: 'center',  
  },
  statNumber: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 4,
  }
});

const formatNumber = (num) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num;
};

const ItemStat = ({ label, value, testID }) => {
  return (
    <View style={styles.statItem}>
      <Text testID={testID} style={styles.statNumber}>{formatNumber(value)}</Text>
      <Text>{label}</Text>
    </View>
  );
};

export default ItemStat;