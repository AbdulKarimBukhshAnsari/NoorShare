import { View, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import SectionBox from "../../components/app/SectionBox";
import Header from "../../components/app/Header";
import SearchBar from "../../components/app/SearchBar";
import ScrollMenu from "../../components/surahList/AnimatedMenu";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useState } from "react";


const SurahListPage = () => {
  const { loadingAyah } = useGlobalContext();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-white items-center">
        <Header version={3} />
        <SectionBox text="QURAN READING"/>
        <SearchBar />
        {/* Scroll Menu contains all the data like the above tab as well it will render also the surah list , para and the hizb list as well */}
        <ScrollMenu tabs={["SURAH", "JUZ", "HIZB", "SAVED"]} />
        {loadingAyah && (
          <View
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
          >
            <View className="w-[80%] h-[200px] bg-white rounded-2xl flex justify-center items-center shadow-2xl p-5">
              <ActivityIndicator size="large" color="#800020" />
              <Text className="text-[18px] font-ossemibold text-burgundy mt-4 text-center">
                Fetching divine verses✨
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SurahListPage;
