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

const TestSurahScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const mockData = [
    {
      id: 1,
      arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      translation: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔",
    },
    {
      id: 2,
      arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
      translation:
        "سب تعریف اللہ تعالی کے لئے ہے جو تمام جہانوں کا پالنے والا ہے۔",
    },
    {
      id: 3,
      arabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      translation: "بہت مہربان، نہایت رحم کرنے والا۔",
    },
    {
      id: 4,
      arabic: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
      translation: "بدلے کے دن کا مالک ہے۔",
    },
    {
      id: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      translation: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد چاہتے ہیں۔",
    },
    {
      id: 6,
      arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
      translation: "ہمیں سیدھے راستے کی ہدایت فرما۔",
    },
    {
      id: 7,
      arabic:
        "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      translation:
        "ان لوگوں کے راستے کی جن پر تو نے انعام کیا، نہ ان کے راستے کی جن پر غضب ہوا اور نہ گمراہوں کے۔",
    },
  ];

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
        {mockData.map((ayah) => (
          <View
            key={ayah.id}
            className="bg-[#FFFDD0] p-4 my-2 shadow-md w-full"
          >
            <TouchableOpacity
              onPress={() => handleMenuPress(ayah.id)}
              className="self-end mb-2"
            >
              <Text className="text-2xl text-gray-600">...</Text>
            </TouchableOpacity>
            <Text className="text-lg text-gray-600">{ayah.id}</Text>
            <Text className="text-right text-2xl font-bold text-[#760F13]">
              {ayah.arabic}
            </Text>
            <Text className="text-right text-gray-500 mt-1 font-sans">
              {ayah.translation}
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
