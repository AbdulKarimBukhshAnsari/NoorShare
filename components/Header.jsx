import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';

export default function Header() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>NoorShare</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#760513',
    padding: 16,
    height: 80,
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFFDD0',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    paddingLeft: 6,
    paddingTop: 21,
  },
});