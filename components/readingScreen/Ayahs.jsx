import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { EvilIcons, Ionicons, Feather } from "@expo/vector-icons";

function AyahCard({
  ayah,
  translation,
  isTranslation,
  arabic,
  arabicHeight,
  translationHeight,
}) {
  return (
    <View className="bg-white p-4">
      <View className="flex-row justify-end items-center bg-pinkLavender p-2 rounded-[10px]">
        <View className="flex-1 ml-2">
          <Text className="text-burgundy">{ayah.id}</Text>
        </View>
        <TouchableOpacity className="mx-2">
          <EvilIcons name="share-google" size={20} color="#6A1A39" />
        </TouchableOpacity>

        <TouchableOpacity className="mx-2">
          <Feather name="volume-2" size={20} color="#6A1A39" />
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

// Custom areEqual function to prevent unnecessary re-renders
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
