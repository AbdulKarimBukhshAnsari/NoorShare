//just placeholder... the page raafia made will go here

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Link } from 'expo-router';


export default function Reading() {
    return (
    <View style={styles.container}>
        <Text style={styles.text}>NOTHING HERE!</Text>
        <StatusBar style="auto" />
        <Link href="/home-page" style={styles.link}>Go Back</Link>
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
