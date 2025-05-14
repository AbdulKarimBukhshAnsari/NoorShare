import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function fontSize({
  fontsizeArabic,
  fontsizeTranslation,
  increaseArabic,
  decreaseArabic,
  increaseTranslation,
  decreaseTranslation,
}) {
  return (
    <>
      <View className="px-5 py-2">
        <Text className=" mb-2 text-burgundy font-[Poppins-Medium]">
          Font Size Settings
        </Text>

        {/* Arabic font size */}
        <Text className="mt-2 text-gray-700 font-[Poppins-Light]">
          Arabic Font Size
        </Text>
        <View className="flex-row items-center justify-between mt-1 bg-gray-100 p-2 rounded-lg">
          <TouchableOpacity
            onPress={decreaseArabic}
            className="p-2 bg-pinkLavender rounded-full"
          >
            <AntDesign name="minus" size={24} color="#6A1A39" />
          </TouchableOpacity>
          <Text className="text-gray-800 text-lg">{fontsizeArabic}</Text>
          <TouchableOpacity
            onPress={increaseArabic}
            className="p-2 bg-pinkLavender rounded-full"
          >
            <AntDesign name="plus" size={24} color="#6A1A39" />
          </TouchableOpacity>
        </View>

        {/* Translation size */}
        <Text className="mt-2 text-gray-700 font-[Poppins-Light]">
          Translation Font Size
        </Text>
        <View className="flex-row items-center justify-between mt-1 bg-gray-100 p-2 rounded-lg">
          <TouchableOpacity
            onPress={decreaseTranslation}
            className="p-2 bg-pinkLavender rounded-full"
          >
            <AntDesign name="minus" size={24} color="#6A1A39" />
          </TouchableOpacity>
          <Text className="text-gray-800 text-lg">{fontsizeTranslation}</Text>
          <TouchableOpacity
            onPress={increaseTranslation}
            className="p-2 bg-pinkLavender rounded-full"
          >
            <AntDesign name="plus" size={24} color="#6A1A39" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
