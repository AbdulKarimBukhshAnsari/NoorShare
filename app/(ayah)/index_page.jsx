import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import CustomHeader from "../../components/CustomHeader.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider.js";

const TestSurahScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const {recite} = useGlobalContext();
  const ayahs = recite.data.ayahs;
  const handleMenuPress = (ayahId) => {
    Alert.alert(
      "Menu",
      `Options for Ayah ${ayahId}`,
      [
        { text: "Bookmark", onPress: () => console.log("Bookmark pressed") },
        { text: "Share", onPress: () => console.log("Share pressed") },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    
    <View className="flex-1 bg-[#f8f5c4]">
      
      <CustomHeader title="Al Fatihah" />
      {/* Scrollable Content */}
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Header Section */}
        <View className="bg-[#8A1A1F] py-3 px-4 flex justify-center items-center">
          <Text className="text-[#FFFFFF] text-sm">Ruku: 1 | Juz: 1</Text>
        </View>

        <View className="bg-[#FFFDD0] p-6 rounded-lg shadow-md flex-row items-center justify-between">
          <Text className="text-gray-600 text-base">Makkah</Text>
          <Text className="text-gray-800 text-lg font-bold">The Opening</Text>
          <Text className="text-gray-600 text-base">Ayahs: 7</Text>
        </View>

        <View className="flex justify-center items-center mt-6">
          <Text
            style={{
              fontFamily: "Harmattan-Bold",
              color: "#760F13",
              fontSize: 20,
            }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </Text>
        </View>

        {/* Ayah List */}
        {ayahs.map((ayah) => (
  <View
    key={ayah.number}
    className="bg-[#FFFDD0] p-4 my-2 shadow-md w-full rounded-lg"
  >
    {/* Three Dots Menu Button */}
    <TouchableOpacity className="absolute top-2 right-4">
      <Text className="text-2xl text-gray-600">...</Text>
    </TouchableOpacity>

    {/* Ayah Number */}
    <Text className="text-lg text-gray-600">{ayah.numberInSurah}</Text>

    {/* Arabic Ayah Text */}
    <Text className="text-right text-3xl font-indoquran text-[#760F13] leading-relaxed tracking-wide">
      {ayah.text}
    </Text>
  </View>
))}

      </ScrollView>

      {/* Fixed Bottom Menu */}
      <View className="bg-[#760F13] p-3 flex-row justify-around items-center">
        <TouchableOpacity>
          <Text className="text-[#FFFDD0] text-lg">📚 </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-[#FFFDD0] text-lg">🔄 </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-[#FFFDD0] text-lg">▶️ </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-[#FFFDD0] text-lg">📅 </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TestSurahScreen;
