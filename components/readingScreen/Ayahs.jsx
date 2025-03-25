import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { EvilIcons, Ionicons, Feather } from "@expo/vector-icons";

export default function AyahCard({
  ayah,
  translation,
  arabic,
  arabicHeight,
  translationHeight,
}) {
  return (
    <View className="bg-white p-4 ">
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
      {arabic === true  ? (
        <Text className="text-right font-[Al-Mushaf-Quran]  text-burgundy mt-2 " style = {{fontSize: arabicHeight}}>
          {ayah.arabic}
        </Text>
      ) : (
        <Text></Text>
      )}

      {translation === true ? (
        <Text className="text-left text-black mt-4 font-[Poppins-Light] ml-2" style = {{fontSize: translationHeight}}>
          {ayah.translation}
        </Text>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
