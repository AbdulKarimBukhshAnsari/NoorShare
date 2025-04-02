import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import surahRequest from '../../api/surah';
import { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

export default function ListItem({ item, index, type }) {
  const backgroundColor = index % 2 === 0 ? 'bg-babyPink' : 'bg-pinkLavender';
  
  const { setRecite ,  setLoadingAyah } = useGlobalContext();

  let arabicText, englishText, subtitle;

  const onPress = async (id) => {
    console.log('key pressed');

    if (type === 1) {
      setLoadingAyah(true); // Show loading overlay
      try {
        const { error, data } = await surahRequest(id);
        

        if (error) {
          Alert.alert('Error', data.message || 'An error occurred while fetching the Surah data.');
        } else {
          setRecite([type , data]);
          router.push('/index_page'); // Navigate when response is received
        }
      } catch (error) {

        Alert.alert('Error', 'Something went wrong.');
      } finally {
        setLoadingAyah(false);
      }
    }

    else if (type === 2) {
      setLoadingAyah(true); // Show loading overlay
      try {
        const { error, data } = await surahRequest(id);
        

        if (error) {
          Alert.alert('Error', data.message || 'An error occurred while fetching the Surah data.');
        } else {
          setRecite([type , data]);
          router.push('/index_page'); // Navigate when response is received
        }
      } catch (error) {

        Alert.alert('Error', 'Something went wrong.');
      } finally {
        setLoadingAyah(false);
      }
    }
    else{
      setLoadingAyah(true); // Show loading overlay
      try {
        const { error, data } = await surahRequest(id);
        

        if (error) {
          Alert.alert('Error', data.message || 'An error occurred while fetching the Surah data.');
        } else {
          setRecite(data);
          router.push('/index_page'); // Navigate when response is received
        }
      } catch (error) {

        Alert.alert('Error', 'Something went wrong.');
      } finally {
        setLoadingAyah(false);
      }
    }
  };

  // Surah
  if (type === 1) { 
    arabicText = item.arabic;
    englishText = item.name;
    subtitle = `${item.isMakki ? 'Makkah' : 'Madina'} | ${item.verses} Verses`;
  } 
  // Juz
  else if (type === 2) { 
    arabicText = item.arabic;
    englishText = `Juz ${item.id}`;
    subtitle = `${item.startSurah} ${item.reference}`;
  }
  // Hizb
  else if (type === 3) { 
    arabicText = item.arabicText;
    englishText = item.quarter ? `Hizb ${item.number} (${item.quarter})` : `Hizb ${item.number}`;
    subtitle = `${item.surahName} ${item.reference}`;
  }

  return (
    <View className="flex-1">
      <Pressable 
        className={`w-[95vw] h-[70px] flex-row items-center p-4 justify-between rounded-[10px] shadow-2xl ${backgroundColor}`} 
        onPress={() => onPress(item.id)}
      >
        <Text className="text-[15px] pl-2 font-ossemibold text-burgundy w-12">{item.id}</Text>

        <View className="flex-1">
          <Text className="text-[18px] font-osregular text-burgundy">{englishText}</Text>
          <Text className="text-[14px] font-ossemibold text-gray-600">{subtitle}</Text>
        </View>

        <Text className="text-[25px] font-indopak text-burgundy font-indoquran">{arabicText}</Text>
      </Pressable>

      {/* Loading Overlay */}
      
    </View>
  );
}
