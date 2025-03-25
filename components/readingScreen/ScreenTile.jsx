import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ScreenTile({ variant = "full", textData = {} , handlePress}) {

  return (
    <>
    <View className="w-full items-center justify-center my-4">
      <ImageBackground
        source={require("../../assets/images/bg.png")}
        className="w-[90%] h-28 rounded-2xl p-4 flex items-center justify-center overflow-hidden"
        resizeMode="cover"
      >
        {variant === "full" ? (
          <>
          <TouchableOpacity className="absolute top-2 right-4" onPress={handlePress} hitSlop={20}>
          <MaterialIcons
              name="tune"
              size={20}
              color="white"
            />
          </TouchableOpacity>
            
            <View className="flex items-center space-y-2">
              <Text className="text-2xl text-white font-[Poppins-SemiBold]">
                {textData.title}
              </Text>
              <Text className="text-white font-[Poppins-Light]">{textData.subtitle}</Text>
              <Text className="text-white text-sm pt-2 font-[Poppins-Light]">
                {textData.details}
              </Text>
            </View>
          </>
        ) : (
          <View className="flex items-center">
            <Text className="text-3xl text-white font-[Poppins-Bold]">
              {textData.title}
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
    </>
  );
}
