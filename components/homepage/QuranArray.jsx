<<<<<<< HEAD
import { View, Text, TouchableOpacity } from "react-native";
=======
import { View, Text, Pressable } from "react-native";
>>>>>>> 26352b6925bb5848ab42bcb7d74dc0bb64719e89
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const QuranIcons = ({ iconName, iconSource, text }) => {
  const IconComponent = iconSource === "Feather" ? Feather : AntDesign;

  return (
    <View className="items-center">
      {/*Container */}
      <View className="w-[40px] h-[40px] bg-burgundy rounded-[10px] flex items-center justify-center">
        <IconComponent name={iconName} size={24} color="white" />
      </View>

      {/* Text */}
<<<<<<< HEAD
      <Text className="text-burgundy text-[13px] font-osregular mt-2">
        {" "}
        {text.toUpperCase()}{" "}
      </Text>
=======
      <Text className="text-burgundy text-base font-osregular mt-2"> {text.toUpperCase()} </Text>
>>>>>>> 26352b6925bb5848ab42bcb7d74dc0bb64719e89
    </View>
  );
};

const QuranArray = () => {
  return (
<<<<<<< HEAD
    <View className="flex-row items-center justify-evenly w-full gap-[25px]">
      <TouchableOpacity onPress={() => router.push("/(surahList)/AllSurahs")}>
        <QuranIcons iconName="book" iconSource="Feather" text="Read" />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => router.push("/(ayah)/tilawat_page")}>
        <QuranIcons iconName="sound" iconSource="AntDesign" text="Listen" />
      </TouchableOpacity>
      <QuranIcons iconName="search" iconSource="Feather" text="Choose" />
=======
    <View className="flex-row self-center items-center justify-between w-[50%]">
      <Pressable
        onPress={({}) => (
          router.push("/AllSurahs")
        )}
      >
        <QuranIcons iconName="book" iconSource="Feather" text="Read" /> 
      </Pressable>
      <Pressable
        onPress={({}) => (
          router.push("/AllSurahs")
        )}
      >
        <QuranIcons iconName="sound" iconSource="AntDesign" text="Listen" />
      </Pressable>
      
      {/* <QuranIcons iconName="search" iconSource="Feather" text="Choose" /> */}
>>>>>>> 26352b6925bb5848ab42bcb7d74dc0bb64719e89
    </View>
  );
};

export default QuranArray;
