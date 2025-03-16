import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { surahs, juzs, hizbs } from '../../constants/quranData';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('surah');
  const [favorites, setFavorites] = useState([]);

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

  const renderSurahItem = ({ item }) => (
    <Pressable
      className="flex-row items-center justify-between py-3 px-4 border-b border-gray-300"
      onPress={() => router.push('/reading')}
    >
      <View className="flex-row items-center gap-3">
        <Text className="text-base font-bold text-secondary w-8">{item.id}</Text>
        <Text className="text-base text-gray-800 mr-2">{item.name}</Text>
        {item.isMakki ? (
          <FontAwesome5 name="kaaba" size={15} color="#760513" />
        ) : (
          <MaterialIcons name="mosque" size={15} color="#760513" />
        )}
      </View>
      <Pressable onPress={() => toggleFavorite(item.id)}>
        <Ionicons
          name={favorites.includes(item.id) ? 'star' : 'star-outline'}
          size={24}
          color="#760513"
        />
      </Pressable>
    </Pressable>
  );

  const renderJuzItem = ({ item }) => (
    <View className="flex-row items-center justify-between py-3 px-4 border-b border-gray-300">
      <View className="flex-1">
        <Text className="text-base font-bold text-secondary">{`JUZ ${item.id}`}</Text>
        <Text className="text-sm text-gray-600 mt-1">{item.startingAyat}</Text>
      </View>
      <Text className="text-2xl text-gray-800 text-right font-aquran">
        {item.arabic}
      </Text>
    </View>
  );

  const renderHizbItem = ({ item }) => (
    <View className="flex-row items-center justify-between py-3 px-4 border-b border-gray-300">
      <View className="flex-1">
        <Text className="text-base font-bold text-secondary">{`Hizb ${item.number} ${item.quarter ? `(${item.quarter})` : ''}`}</Text>
        <Text className="text-sm text-gray-600 mt-1">{item.surahName} ({item.reference})</Text>
      </View>
      <Text className="text-2xl text-gray-800 text-right font-aquran">
        {item.arabicText}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary p-4">
      <View className="flex-row items-center mb-4 pl-12 pr-11">
        <TextInput
          className="flex-1 h-10 bg-primary rounded-lg px-4 mr-2 border border-secondary"
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable className="p-2">
          <Ionicons name="search" size={24} color="#760513" />
        </Pressable>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-secondary mb-2">Favorites</Text>
        <View className="min-h-10 py-2">
          {favoriteSurahs.length > 0 ? (
            <FlatList
              horizontal
              data={favoriteSurahs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  className="bg-primary rounded-full px-4 py-2 mr-2 border border-secondary"
                  onPress={() => router.push('/reading')}
                >
                  <Text className="text-secondary text-sm">{item.name}</Text>
                </Pressable>
              )}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text className="text-gray-500 italic pl-36 pt-4">No Favorites</Text>
          )}
        </View>
      </View>

      <View className="flex-row justify-center mb-4 gap-4">
        {['surah', 'juz', 'hizb'].map((tab) => (
          <Pressable
            key={tab}
            className={`px-6 py-2 rounded-full border border-secondary ${
              selectedTab === tab ? 'bg-secondary' : 'bg-primary'
            }`}
            onPress={() => setSelectedTab(tab)}
          >
            <Text className={`text-base font-medium ${
              selectedTab === tab ? 'text-primary' : 'text-secondary'
            }`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-1">
        {selectedTab === 'surah' && (
          <FlatList
            data={filteredSurahs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSurahItem}
          />
        )}

        {selectedTab === 'juz' && (
          <FlatList
            data={filteredJuzs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderJuzItem}
          />
        )}

        {selectedTab === 'hizb' && (
          <FlatList
            data={filteredHizbs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderHizbItem}
          />
        )}
      </View>
    </View>
  );
}