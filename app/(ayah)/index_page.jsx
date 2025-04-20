import { View, FlatList, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import CustomHeader from "../../components/readingScreen/CustomHeader.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import AyahCard from "../../components/readingScreen/Ayahs.jsx";
import ScreenTile from "../../components/readingScreen/ScreenTile.jsx";
import { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index_page() {
  const mockData = [
    {
      id: 1,
      arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      translation:
        "In the name of Allah, the Most Gracious, the Most Merciful.",
    },
    {
      id: 2,
      arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
      translation: "All praise is due to Allah, the Lord of all the worlds.",
    },
    {
      id: 3,
      arabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      translation: "The Most Gracious, the Most Merciful.",
    },
    {
      id: 4,
      arabic: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
      translation: "Master of the Day of Judgment.",
    },
    {
      id: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      translation: "You alone we worship, and You alone we ask for help.",
    },
    {
      id: 6,
      arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
      translation: "Guide us on the Straight Path.",
    },
    {
      id: 7,
      arabic:
        "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      translation:
        "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger, nor of those who are astray.",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const BottomSheetRef = useRef(null);
  const openBottomSheet = () => {
    BottomSheetRef.current.expand();
    setIsOpen(true);
  };

  const closeBottomSheet = () => {
    BottomSheetRef.current.close();
    setIsOpen(false)
  };
  const points = useMemo(() => ["49%"], []);

  const [isArabic, setIsArabic] = useState(true);
  const [isTranslation, setIsTranslation] = useState(true);
  const [arabicFontSize, setArabicFontSize] = useState(28);
  const [translationFontSize, setTranslationFontSize] = useState(14);

  useEffect(() => {
    const loadSize = async () => {
      const arabicSize = await AsyncStorage.getItem("arabicSize")
      const translationSize = await AsyncStorage.getItem("translationSize")
      if(arabicSize) {
        setArabicFontSize(JSON.parse(arabicSize))
      }
      if(translationSize){
        setTranslationFontSize(JSON.parse(translationSize))
      }
    }
    loadSize();
  }, [])

  const increaseArabicFont = async () =>
    setArabicFontSize((size) => {
      const newSize = Math.min(size + 1, 40)
      AsyncStorage.setItem("arabicSize", JSON.stringify(newSize))
      return newSize
    });
  const decreaseArabicFont = async () =>
    setArabicFontSize((size) =>{ 
      const newSize = Math.max(size - 1, 10)
      AsyncStorage.setItem("arabicSize", JSON.stringify(newSize))
      return newSize
    });

  const increaseTranslationFont = async() =>
    setTranslationFontSize((size) => {
      const newSize = Math.min(size + 1, 30)
      AsyncStorage.setItem("translationSize", JSON.stringify(newSize))
      return newSize
    });
  const decreaseTranslationFont = async() =>
    setTranslationFontSize((size) => {
      const newSize = Math.max(size - 1, 10)
      AsyncStorage.setItem("translationSize", JSON.stringify(newSize))
      return newSize
    });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 ">
        <CustomHeader/>
        <FlatList
          data={mockData}
          ListHeaderComponent={
            <>
              <ScreenTile
                variant="full"
                textData={{
                  title: "Surah Fatihah",
                  subtitle: "The Opening",
                  details: "Makkah | 7 Verses",
                }}
                handlePress={openBottomSheet}
              ></ScreenTile>
              <View className="flex justify-center items-center">
                <Text className="font-[Al-Mushaf-Quran] text-burgundy text-[30px]">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </Text>
              </View>
            </>
          }
          renderItem={({ item }) => {
            return (
              <AyahCard
                ayah={item}
                key={item.id}
                translation={isTranslation}
                arabic={isArabic}
                arabicHeight={arabicFontSize}
                translationHeight={translationFontSize}
              />
            );
          }}
        ></FlatList>
        <BottomSheet
          ref={BottomSheetRef}
          index={-1}
          snapPoints={points}
          enablePanDownToClose={true}
          handleIndicatorStyle={{
            backgroundColor: "#6A1A39",
          }}
          handleStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <BottomSheetView>
            <View className="px-5 py-2">
              {/* Header */}
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-[Poppins-SemiBold] text-burgundy text-800">
                  Quick Tools
                </Text>
                <TouchableOpacity onPress={closeBottomSheet}>
                  <AntDesign name="close" size={24} color="#6A1A39" />
                </TouchableOpacity>
              </View>

              {/* Content Section */}
              <Text className="mt-4 text-burgundy font-[Poppins-Medium] ">Content</Text>
              <View className="flex-row justify-between items-center mt-1">
                <Text className="text-gray-700 font-[Poppins-Light]">Arabic</Text>
                <Switch
                  value={isArabic}
                  onValueChange={() => setIsArabic((prev) => !prev)}
                  trackColor={{ false: "#a19e9e", true: "#6A1A39" }}
                  thumbColor={isArabic ? "#fff" : "#fff"}
                />
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-700 font-[Poppins-Light]">Translation</Text>
                <Switch
                  value={isTranslation}
                  onValueChange={() => setIsTranslation((prev) => !prev)}
                  trackColor={{ false: "#a19e9e", true: "#6A1A39" }}
                  thumbColor={isArabic ? "#fff" : "#fff"}
                />
              </View>

              {/* Font Settings */}
              <Text className="mt-2 mb-2 text-burgundy text-700 font-[Poppins-Medium]">
                Font Settings
              </Text>

              {/* Arabic Font Size Control */}
              <Text className="mt-2 text-gray-700 font-[Poppins-Light]">Arabic Font Size</Text>
              <View className="flex-row items-center justify-between mt-1 bg-gray-100 p-2 rounded-lg">
                <TouchableOpacity
                  onPress={decreaseArabicFont}
                  className="p-2 bg-pinkLavender rounded-full"
                >
                  <AntDesign name="minus" size={24} color="#6A1A39" />
                </TouchableOpacity>
                <Text className="text-gray-800 text-lg">{arabicFontSize}</Text>
                <TouchableOpacity
                  onPress={increaseArabicFont}
                  className="p-2 bg-pinkLavender  rounded-full"
                >
                  <AntDesign name="plus" size={24} color="#6A1A39" />
                </TouchableOpacity>
              </View>

              {/* Translation Font Size Control */}
              <Text className="mt-2 text-gray-700 font-[Poppins-Light]">Translation Font Size</Text>
              <View className="flex-row items-center justify-between mt-1 bg-gray-100 p-2 rounded-lg">
                <TouchableOpacity
                  onPress={decreaseTranslationFont}
                  className="p-2 bg-pinkLavender  rounded-full"
                >
                  <AntDesign name="minus" size={24} color="#6A1A39" />
                </TouchableOpacity>
                <Text className="text-gray-800 text-lg">
                  {translationFontSize}
                </Text>
                <TouchableOpacity
                  onPress={increaseTranslationFont}
                  className="p-2 bg-pinkLavender  rounded-full"
                >
                  <AntDesign name="plus" size={24} color="#6A1A39" />
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}
