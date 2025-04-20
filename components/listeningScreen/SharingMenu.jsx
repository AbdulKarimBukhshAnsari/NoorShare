import { Modal, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dropdown } from "react-native-element-dropdown";
import { surahs } from "../../constants/quranData.js";
import { useState } from "react";

export default function SharingMenu({setShow}) {
  const [surah, setSurah] = useState(surahs[0]);
  const [surahId, setSurahId] = useState(1);
  const [selectedSurahValue, setSelectedSurahValue] = useState(null);
  const [selectedVerseValue, setSelectedVerseValue] = useState(null);
  const [verse, setVerse] = useState(null);
  const [check, setCheck] = useState(false);
  const [arabic, setArabic] = useState(false);
  const [translation, setTranslation] = useState(false);

  const verseOpt = (selectedSurahId) => {
    const selectedSurah = surahs.find((surah) => surah.id === selectedSurahId);

    let verseOptions = [];
    if (selectedSurah) {
      for (let i = 1; i <= selectedSurah.verses; i++) {
        verseOptions.push({ label: i.toString(), value: i });
      }
    }
    return verseOptions;
  };
  const verseOptions = verseOpt(surahId);

  return (
    <>
      {/* view for alignment of elements inside modal */}
      <View className="p-3 rounded-xl w-96 bg-white"
      style = {check ? {height : "55%"} :  {height : "35%"}}>
        {/* elemenets needed inside modal */}
        <View className="flex-row justify-between items-center p-2">
          <Text className="text-burgundy text-2xl font-osbold">
            Insert Ayat
          </Text>
          <TouchableOpacity
          onPress={() => setShow(false)}>
          <Entypo name="cross" size={20} color="#6A1A39" />
          </TouchableOpacity>
        </View>

        <View className="px-2 ">
          <Text className="text-lg text-burgundy font-osregular">
            Select Surah and Verse
          </Text>
        </View>
        <View className="flex-row">
          <View className="m-2 p-2 w-52 bg-babyPink rounded-lg">
            <Dropdown
              className="h-12"
              placeholderStyle={{
                fontSize: 14,
                color: "#6A1A39",
                textAlign: "center",
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: "#6A1A39",
                textAlign: "center",
              }}
              inputSearchStyle={{ height: 35, fontSize: 14 }}
              data={surahs.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Surah"
              searchPlaceholder="Search..."
              value={selectedSurahValue}
              onChange={(item) => {
                setSelectedSurahValue(item.value);
                const selectedSurah = surahs.find((s) => s.id === item.value);
                setSurah(selectedSurah);
                setSurahId(selectedSurah.id);
                setSelectedVerseValue(null);
              }}
              testID="surahDropDown"
            />
          </View>
          <View className="m-2 p-2 w-[34%] bg-babyPink rounded-lg">
            <Dropdown
              className="h-12"
              placeholderStyle={{
                fontSize: 14,
                color: "#6A1A39",
                textAlign: "center",
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: "#6A1A39",
                textAlign: "center",
              }}
              inputSearchStyle={{ height: 35, fontSize: 14 }}
              data={verseOptions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Verse"
              searchPlaceholder="Search..."
              value={selectedVerseValue}
              onChange={(item) => {
                setSelectedVerseValue(item.value);
                setVerse(item.value);
              }}
              testID="verseDropDown"
            />
          </View>
        </View>
        <View className="px-2 mt-2">
          <Text className="text-lg text-burgundy font-osregular">
            Display Options{" "}
          </Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            className="m-2 p-2 w-[45%] rounded-lg items-center"
            style = {arabic ? {backgroundColor : "#6A1A39"} : {backgroundColor : "#E9C6CB"}}
            onPress={() => {
              setArabic(!arabic);
            }}
          >
            <Text className="font-osregular"
            style = {arabic ? {color : "#E9C6CB"} : {color :"#6A1A39" }}
            >Arabic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="m-2 p-2 w-[47%] rounded-lg items-center"
            style = {translation ? {backgroundColor : "#6A1A39"} : {backgroundColor : "#E9C6CB"}}
            onPress={() => {
              setTranslation(!translation);
            }}
          >
            <Text className="font-osregular"
            style = {translation ? {color : "#E9C6CB"} : {color :"#6A1A39" }}>Translation</Text>
          </TouchableOpacity>
        </View>

        <View>
      
          <TouchableOpacity
          className = "flex-row justify-center items-center mt-2 gap-1"
          onPress={() => {
            setCheck(!check);
          }}
          >
            <FontAwesome name={check ? "check-square" : "square-o"} size={24} color="#6A1A39" />
            <Text>Show Preview</Text>
          </TouchableOpacity>
            
          {check ? (
            <View className = "justify-center items-center m-2 p-2 bg-babyPink h-44 rounded-lg">
              <Text className = "text-xl text-burgundy">{arabic ? surah.arabic : null}</Text>
              <Text className = "text-xl text-burgundy">{translation ? surah.name : null}</Text>
            </View>
          ) : null}
        </View>

        <View>
          <TouchableOpacity className="m-2 p-2 w-[97%] bg-burgundy rounded-lg items-center">
            <Text className="font-osregular text-babyPink ">Insert</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
