import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function CustomHeader() {
  return (
    <>
      <View className="p-4">
        <View className="flex-row justify-between ">
          <TouchableOpacity
            onPress={() => router.push("/")}>
            <Entypo name="home" size={24} color="#6A1A39" /> 
            {/* add if else to check if back button needed or not */}
          </TouchableOpacity>
          <Text className="color-burgundy text-3xl font-[Sorga-Demo]">NoorShare</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/sign-in");
            }}
          >
            <FontAwesome6 name="user-large" size={24} color="#6A1A39" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
