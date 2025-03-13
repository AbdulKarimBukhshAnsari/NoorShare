import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from "expo-router";

const CustomHeader = ({ title }) => {
  return (
    <View className="flex-row items-center bg-[#760F13] py-5 px-3">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push('/(auth)/sign-in')}
        className="mr-3"
      >
        <Text className="text-white text-2xl">←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-white text-2xl font-bold">
    {"   " + title}
      </Text>
    </View>
  );
};

export default CustomHeader;