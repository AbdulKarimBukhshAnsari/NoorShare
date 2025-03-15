import { Tabs } from 'expo-router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { View, StyleSheet } from 'react-native';

export default function HomepageLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBar: () => <Footer />,
        }}
      >
        <Tabs.Screen name="Home" />
        <Tabs.Screen name="Reading" />
        <Tabs.Screen name="Asma-ul-Husna" />
        <Tabs.Screen name="Profile" />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDD0',
  },
});