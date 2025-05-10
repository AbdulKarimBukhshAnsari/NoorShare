import { View, Text, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function ZikrListItem({ item, index }) {
  const backgroundColor = index % 2 === 0 ? "bg-babyPink" : "bg-pinkLavender";

//   const { setRecite, setLoadingAyah } = useGlobalContext();
//   You had this for surah, idk whether to remove it so it's commented out

  const router = useRouter();

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  let arabicText, englishText, subtitle;

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const onPressZikr = async (id) => {
    // API LOGIC OR WHATEVER GOES HERE
    //router is just placeholder 
    router.push('/HomePage')
  };

  arabicText = item.arabic;
  englishText = item.name;
  subtitle = `${item.count} Times`;

  return (
    <View className="flex-1 items-center">
      <Pressable
        className={`w-[95%] h-20 px-4 flex-row items-center justify-between rounded-xl ${backgroundColor}`}
        onPress={() => onPressZikr(item.id)}
      >
        <View className="w-8 items-center">
          <Text className="text-sm font-ossemibold text-burgundy">
            {item.id}
          </Text>
        </View>

        <View className="flex-1 ml-4">
          <View className="flex-row items-center gap-1">
            <Text className="text-base font-osregular text-burgundy">
              {englishText}
            </Text>

            <Pressable onPress={() => toggleHeart()}>
              <Ionicons
                name={isHeartFilled ? "heart" : "heart-outline"}
                size={15}
                color="#6A1A39"
              />
            </Pressable>

            <Pressable onPress={() => router.push("/index_page")}>
              <MaterialIcons name="edit" size={15} color="#6A1A39" />
            </Pressable>
          </View>

          <Text className="text-sm font-osregular text-gray-600">
            {subtitle}
          </Text>
        </View>

        <View className="justify-center items-center">
          <Text className="text-3xl font-indopak text-burgundy font-indoquran pt-8">
            {arabicText}
          </Text>
        </View>

      </Pressable>
    </View>
  );
}
