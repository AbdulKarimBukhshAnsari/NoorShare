// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { Link } from 'expo-router';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text className = 'text-3xl'>Hello World!</Text>
//       <StatusBar style="auto" />
//       <Link href='/sign-in'>Auth</Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <StatusBar style="auto" />
      <Link href="/home-page" style={styles.link}>Homepage</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 18,
    color: 'blue',
    marginVertical: 10,
  },
});
