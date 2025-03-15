
// THIS IS NOT PERFECT. It does navigation but the order is off no matter what I do and the icons don't appear.

import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Home, Book, User } from 'lucide-react-native';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'Home', icon: Home, route: '/home-page' },
    { name: 'Quran', icon: Book, route: '/asma-ul-husna' },
    { name: 'Asma-ul-Husna', icon: Book, route: '/reading' },
    { name: 'Profile', icon: User, route: '/profile' },
  ];

  return (
    <View style={styles.footer}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.name}
          style={styles.tab}
          onPress={() => router.push(tab.route)}
        >
          <tab.icon
            size={24}
            color="#FFFDD0"
            fill={pathname === tab.route ? '#FFFDD0' : 'none'}
          />
          <Text style={styles.tabText}>{tab.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#760513',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#8B0000',
    height: 120,
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  tabText: {
    color: '#FFFDD0',
    fontSize: 12,
    marginTop: 4,
  },
});
