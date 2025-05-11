import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function ZikrListItem({ item, index }) {
  const backgroundColor = index % 2 === 0 ? "bg-babyPink" : "bg-pinkLavender";
  const router = useRouter();
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  
  const onPressZikr = async (id) => {

    router.push({
    pathname: "/(zikr)/ZikrCounter",
    params: { item: JSON.stringify(item) }
  });
  };

  const isCompleted = item.status === 'completed';

  return (
    <View className="flex-1 items-center">
      <Pressable
        className={`w-[95%] h-20 px-4 flex-row items-center justify-between rounded-xl ${backgroundColor}`}
        onPress={() => onPressZikr(item.azkar_id)}
      >
        {/* Left: Index Number */}
        <View className="w-8 items-center">
          <Text className="text-sm font-ossemibold text-burgundy">
            {index + 1}
          </Text>
        </View>

        {/* Middle: Text & Icons */}
        <View className="flex-1 ml-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-osregular text-burgundy">
              {item.name}
            </Text>

            <Pressable onPress={toggleHeart}>
              <Ionicons
                name={isHeartFilled ? "heart" : "heart-outline"}
                size={15}
                color="#6A1A39" // burgundy
              />
            </Pressable>

            <Pressable onPress={() => router.push("/index_page")}>
              <MaterialIcons name="edit" size={15} color="#6A1A39" />
            </Pressable>
          </View>

          <Text className="text-sm font-osregular text-gray-600">
            {item.count} Times
          </Text>
        </View>

        {/* Right: Status Icon */}
        <View className="justify-center items-center pr-2">
          {isCompleted ? (
            <FontAwesome name="check-circle" size={20} color="#6A1A39" /> // burgundy
          ) : (
            <FontAwesome name="clock-o" size={20} color="#A0A0A0" /> // gray
          )}
        </View>
      </Pressable>
    </View>
  );
}
