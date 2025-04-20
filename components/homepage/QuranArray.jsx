import { View, Text, Pressable } from "react-native";
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
      <Text className="text-burgundy text-base font-osregular mt-2"> {text.toUpperCase()} </Text>
    </View>
  );
};

const QuranArray = () => {
  return (
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
    </View>
  );
};

export default QuranArray;
