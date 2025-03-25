import { View, Text } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const QuranIcons = ({ iconName, iconSource, text }) => {

    const IconComponent = iconSource === "Feather" ? Feather : AntDesign;

  return (
    <View className="items-center">
      {/*Container */}
      <View className="w-[40px] h-[40px] bg-burgundy rounded-[10px] flex items-center justify-center">
        <IconComponent name={iconName} size={24} color="white" />
      </View>
        
      {/* Text */}
      <Text className="text-burgundy text-[13px] font-osregular mt-2"> {text.toUpperCase()} </Text>
    </View>
  );
};

const QuranArray = () => {
  return (
    <View className="flex-row items-center justify-evenly w-full gap-[25px]">
      <QuranIcons iconName="book" iconSource="Feather" text="Read" />
      <QuranIcons iconName="sound" iconSource="AntDesign" text="Listen" />
      <QuranIcons iconName="search" iconSource="Feather" text="Choose" />
    </View>
  );
};

export default QuranArray;