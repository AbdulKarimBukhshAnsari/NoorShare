import { View, FlatList, Text, TouchableOpacity, Switch} from "react-native";
import CustomHeader from "../../components/readingScreen/CustomHeader.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import AyahCard from "../../components/readingScreen/Ayahs.jsx";
import ScreenTile from "../../components/readingScreen/ScreenTile.jsx";
import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexPage() {
  const { recite } = useGlobalContext();
  // tracking things related to the ayah recording playing 
  const currentSound = useRef(null); // will store the reference of current playing sound this will help in stopping the audio
  
  
  const [isArabic, setIsArabic] = useState(true);
  const [isTranslation, setIsTranslation] = useState(true);
  const [arabicFontSize, setArabicFontSize] = useState(28);
  const [translationFontSize, setTranslationFontSize] = useState(14);
  
  // Font size functions
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
  
  const points = useMemo(() => ["49%"], []);
  
  
  const BottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = () => {
    BottomSheetRef.current?.expand();
    setIsOpen(true)}
  const closeBottomSheet = () => {
    BottomSheetRef.current?.close();
    setIsOpen(false)
  }

  // Memoized list data
  const ayahData = useMemo(() => {
    if (!recite[1]?.arabic1 || !recite[1]?.english) return [];
    return recite[1].arabic1.map((ayah, index) => ({
      id: index + 1,
      arabic: ayah, // Arabic text
      translation: recite[1].english[index],
    }));
  }, [recite[1]]);

  // Memoized renderItem function
  const renderItem = useCallback(
    ({ item }) => (
      <AyahCard
        ayah={item.arabic}
        translation={item.translation}
        id = {item.id}
        surahNumber = {recite[1].surahNo}
        isTranslation={isTranslation}
        arabic={isArabic}
        arabicHeight={arabicFontSize}
        translationHeight={translationFontSize}
        currentSound={currentSound}
      />
    ),
    [isTranslation, isArabic, arabicFontSize, translationFontSize]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <CustomHeader />
        <FlatList
          data={ayahData}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}-${item.arabic}`} // Unique key
          initialNumToRender={10} // Efficient first load
          maxToRenderPerBatch={10} // Controls batch rendering
          windowSize={5} // Adjusts how many items stay in memory
          removeClippedSubviews={true} // Improves memory usage
          ListHeaderComponent={
            <>
              <ScreenTile
                variant="full"
                textData={{
                  title: recite[1]?.surahName || "Surah Name",
                  subtitle: recite[1]?.surahNameTranslation || "Translation",
                  details: `${recite[1]?.revelationPlace || "Place"} | ${
                    recite[1]?.totalAyah || 0
                  } Verses`,
                }}
                handlePress={openBottomSheet}
              />
              <View className="flex justify-center items-center">
                <Text className="font-indoquran text-burgundy text-[30px]">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </Text>
              </View>
            </>
          }
        />

        {/* Bottom Sheet for settings */}
        <BottomSheet
          ref={BottomSheetRef}
          index={-1}
          snapPoints={points}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ backgroundColor: "#6A1A39" }}
          handleStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <BottomSheetView>
            <View className="px-5 py-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-[Poppins-SemiBold] text-burgundy">
                  Quick Tools
                </Text>
                <TouchableOpacity onPress={closeBottomSheet}>
                  <AntDesign name="close" size={24} color="#6A1A39" />
                </TouchableOpacity>
              </View>

              {/* Arabic & Translation Toggle */}
              <Text className="mt-4 text-burgundy font-[Poppins-Medium]">
                Content
              </Text>
              <View className="flex-row justify-between items-center mt-1">
                <Text className="text-gray-700 font-[Poppins-Light]">
                  Arabic
                </Text>
                <Switch
                  value={isArabic}
                  onValueChange={(value) => {
                    if (!value && !isTranslation) return; // Prevent both from being false
                    setIsArabic(value);
                  }}
                  trackColor={{ false: "#a19e9e", true: "#6A1A39" }}
                  thumbColor="#fff"
                />
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-700 font-[Poppins-Light]">
                  Translation
                </Text>
                <Switch
                  value={isTranslation}
                  onValueChange={(value) => {
                    if (!value && !isArabic) return; // Prevent both from being false
                    setIsTranslation(value);
                  }}
                  trackColor={{ false: "#a19e9e", true: "#6A1A39" }}
                  thumbColor="#fff"
                />
              </View>

              {/* Font Settings */}
              <Text className="mt-2 mb-2 text-burgundy font-[Poppins-Medium]">
                Font Settings
              </Text>

              {/* Arabic Font Size Control */}
              <Text className="mt-2 text-gray-700 font-[Poppins-Light]">
                Arabic Font Size
              </Text>
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
                  className="p-2 bg-pinkLavender rounded-full"
                >
                  <AntDesign name="plus" size={24} color="#6A1A39" />
                </TouchableOpacity>
              </View>

              {/* Translation Font Size Control */}
              <Text className="mt-2 text-gray-700 font-[Poppins-Light]">
                Translation Font Size
              </Text>
              <View className="flex-row items-center justify-between mt-1 bg-gray-100 p-2 rounded-lg">
                <TouchableOpacity
                  onPress={decreaseTranslationFont}
                  className="p-2 bg-pinkLavender rounded-full"
                >
                  <AntDesign name="minus" size={24} color="#6A1A39" />
                </TouchableOpacity>
                <Text className="text-gray-800 text-lg">
                  {translationFontSize}
                </Text>
                <TouchableOpacity
                  onPress={increaseTranslationFont}
                  className="p-2 bg-pinkLavender rounded-full"
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
