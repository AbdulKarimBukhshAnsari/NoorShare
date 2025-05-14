import React, { memo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { EvilIcons, Ionicons, Feather } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { router } from "expo-router";
function AyahCard({
  ayah,
  translation,
  isTranslation,
  id,
  arabic,
  arabicHeight,
  translationHeight,
  surahNumber,
  currentSound,
}) {
  const [isPlaying, setIsPlaying] = useState(false); // Track playback status

  const surahNo = String(surahNumber).padStart(3, "0");
  const ayahNumber = String(id).padStart(3, "0");
  const urlAudio = `https://everyayah.com/data/Alafasy_128kbps/${surahNo}${ayahNumber}.mp3`;

  const postCreation = () => {
      console.log('Before Post Creation')
    router.replace({
      pathname: "/Editor",
      params: {
        Arabic: ayah,
        Translation: translation,
      },
    });
    console.log('after Post Creation')
  };

  // Function to play audio
  const playAudio = async () => {
    try {
      // Stop and unload the previous audio if it's playing
      if (currentSound.current) {
        await currentSound.current.stopAsync(); // Stop playback
        await currentSound.current.unloadAsync(); // Free memory

        currentSound.current = null; // Reset reference
      }

      setIsPlaying(true);

      // Load and play new audio
      const { sound } = await Audio.Sound.createAsync(
        { uri: urlAudio },
        { shouldPlay: true } // Automatically starts playing
      );

      currentSound.current = sound; // Store reference to current sound

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          sound.unloadAsync(); // Free memory when audio finishes
          currentSound.current = null; // Reset reference
        }
      });
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  return (
    <View className="bg-white p-4">
      <View className="flex-row justify-end items-center bg-pinkLavender p-2 rounded-[10px]">
        <View className="flex-1 ml-2">
          <Text className="text-burgundy">{id}</Text>
        </View>
        <TouchableOpacity className="mx-2" onPress={postCreation}>
          <EvilIcons name="share-google" size={20} color="#6A1A39" />
        </TouchableOpacity>

        {/* Play Audio Button */}
        <TouchableOpacity className="mx-2" onPress={playAudio}>
          <Feather name="volume-2" size={20} color={"#6A1A39"} />
        </TouchableOpacity>

        <TouchableOpacity className="mx-2">
          <Feather name="book" size={20} color="#6A1A39" />
        </TouchableOpacity>

        <TouchableOpacity className="mx-2">
          <Ionicons name="heart" size={20} color="#6A1A39" />
        </TouchableOpacity>
      </View>

      {arabic && (
        <Text
          className="text-right font-indoquran text-burgundy mt-2"
          style={{ fontSize: arabicHeight }}
        >
          {ayah}
        </Text>
      )}

      {isTranslation && (
        <Text
          className="text-left text-black mt-4 font-[Poppins-Light] ml-2"
          style={{ fontSize: translationHeight }}
        >
          {translation}
        </Text>
      )}
    </View>
  );
}

// Prevent unnecessary re-renders
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.ayah === nextProps.ayah &&
    prevProps.translation === nextProps.translation &&
    prevProps.isTranslation === nextProps.isTranslation &&
    prevProps.arabic === nextProps.arabic &&
    prevProps.arabicHeight === nextProps.arabicHeight &&
    prevProps.translationHeight === nextProps.translationHeight
  );
};

export default memo(AyahCard, areEqual);
