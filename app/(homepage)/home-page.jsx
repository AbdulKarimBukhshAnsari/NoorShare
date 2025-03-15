import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { surahs, juzs, hizbs} from '../../constants/quranData';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('surah');
  const [favorites, setFavorites] = useState([]);

  //will use Supabase for this but i gpted it for now
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (surahId) => {
    try {
      const newFavorites = favorites.includes(surahId)
        ? favorites.filter(id => id !== surahId)
        : [...favorites, surahId];
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  //pure gpt so far i have zero clue what this is

  const filteredSurahs = surahs.filter(surah =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJuzs = juzs.filter(juz =>
    juz.id.toString().includes(searchQuery) ||
    juz.startingAyat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHizbs = hizbs.filter(hizb =>
    hizb.surahName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hizb.reference.includes(searchQuery) ||
    hizb.arabicText.includes(searchQuery) ||
    `Hizb ${hizb.number} ${hizb.quarter ? `(${hizb.quarter})` : ''}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteSurahs = surahs.filter(surah => favorites.includes(surah.id));

  return (
     <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#760513" />
        </Pressable>
      </View>

      <View style={styles.favoritesSection}>
        <Text style={styles.favoritesTitle}>Favorites</Text>
        <View style={styles.favoritesContainer}>
          {favoriteSurahs.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {favoriteSurahs.map(surah => (
                <Pressable
                  key={surah.id}
                  style={styles.favoriteButton}
                  onPress={() => router.push('/reading')}
                >
                  <Text style={styles.favoriteButtonText}>{surah.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noFavoritesText}>No Favorites</Text>
          )}
        </View>
      </View>

      <View style={styles.tabsContainer}>
        {['surah', 'juz', 'hizb'].map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.tabButtonActive
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabButtonText,
              selectedTab === tab && styles.tabButtonTextActive
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.contentContainer}>
        {selectedTab === 'surah' && (
          <ScrollView style={styles.listContainer}>
            {filteredSurahs.map((surah) => (
              <Pressable
                key={surah.id}
                style={styles.listItem}
                onPress={() => router.push('/reading')}
              >
                <View style={styles.listItemLeft}>
                  <Text style={styles.itemNumber}>{surah.id}</Text>
                  <Text style={styles.itemName}>{surah.name}</Text>
                  {surah.isMakki ? (
                    <FontAwesome5 name="kaaba" size={15} color="#760513" />
                  ) : (
                    <MaterialIcons name="mosque" size={15} color="#760513" />
                  )}
                </View>
                <Pressable onPress={() => toggleFavorite(surah.id)}>
                  <Ionicons
                    name={favorites.includes(surah.id) ? 'star' : 'star-outline'}
                    size={24}
                    color="#760513"
                  />
                </Pressable>
              </Pressable>
            ))}
          </ScrollView>
        )}

        {selectedTab === 'juz' && (
          <ScrollView style={styles.listContainer}>
            {filteredJuzs.map((juz) => (
              <View key={juz.id} style={styles.listItem}>
                <View style={styles.LContent}>
                  <Text style={styles.Ltitle}>{`JUZ ${juz.id}`}</Text>
                  <Text style={styles.Lsubtitle}>{juz.startingAyat}</Text>
                </View>
                <Text style={[styles.arabicText]}>
                  {juz.arabic}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        {selectedTab === 'hizb' && (
          <ScrollView style={styles.listContainer}>
            {filteredHizbs.map((hizb) => (
              <View key={hizb.id} style={styles.listItem}>
                <View style={styles.LContent}>
                  <Text style={styles.Ltitle}>{`Hizb ${hizb.number} ${hizb.quarter ? `(${hizb.quarter})` : ''}`}</Text>
                  <Text style={styles.Lsubtitle}>{hizb.surahName} ({hizb.reference})</Text>
                </View>
                <Text style={[styles.arabicText]}>
                  {hizb.arabicText}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDD0',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft : 50,
    paddingRight : 45
  },
  searchInput: {
    flex: 2,
    height: 40,
    backgroundColor: '#FFFDD0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#760513',
  },
  searchButton: {
    padding: 8,
  },
  favoritesSection: {
    marginBottom: 24,
  },
  favoritesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#760513',
  },
  favoritesContainer: {
    minHeight: 10,
    paddingBlock: 10
  },
  favoriteButton: {
    backgroundColor: '#FFFDD0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#760513',
  },
  favoriteButtonText: {
    color: '#760513',
    fontSize: 14,
    padding: 8,
  },
  noFavoritesText: {
    color: '#666',
    fontStyle: 'italic',
    paddingStart: 150,
    paddingTop: 15
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 16,
  },
  tabButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFDD0',
    borderWidth: 1,
    borderColor: '#760513',
  },
  tabButtonActive: {
    backgroundColor: '#760513',
  },
  tabButtonText: {
    color: '#760513',
    fontSize: 16,
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#FFFDD0',
  },
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {//for all list items
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listItemLeft: {//the serial numbers to the left in the surah list (View)
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemNumber: {//surah serial numbers (Text)
    fontSize: 16,
    fontWeight: 'bold',
    color: '#760513',
    width: 30,
  },
  itemName: {//surah name
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  arabicText: {
    fontSize: 28,
    color: '#333',
    textAlign: 'right',
    fontFamily: 'Al-Mushaf-Quran'
  },
  LContent: {//title+subtitle
    flex: 1,
  },
  Ltitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#760513',
  },
  Lsubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
