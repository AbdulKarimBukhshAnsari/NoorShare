import { View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import supabase from "../../lib/supabase";

export default function ZikrListItem({ item, index, onFavoriteUpdate }) {
  const backgroundColor = index % 2 === 0 ? "bg-babyPink" : "bg-pinkLavender";
  const router = useRouter();
  const [isHeartFilled, setIsHeartFilled] = useState(item.favourite || false);
  const [updating, setUpdating] = useState(false);

  const toggleHeart = async () => {
    if (updating) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('azkar')
        .update({ favourite: !isHeartFilled })
        .eq('azkar_id', item.azkar_id);

      if (error) {
        throw error;
      }

      setIsHeartFilled(!isHeartFilled);
      // Call the callback after successful update
      await onFavoriteUpdate?.();
    } catch (error) {
      console.error('Error updating favorite status:', error.message);
      setIsHeartFilled(isHeartFilled);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (updating) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('azkar')
        .delete()
        .eq('azkar_id', item.azkar_id);

      if (error) {
        throw error;
      }

      // Call the callback after successful deletion
      await onFavoriteUpdate?.();
    } catch (error) {
      console.error('Error deleting zikr:', error.message);
    } finally {
      setUpdating(false);
    }
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

        {/* Middle: Text & Count */}
        <View className="flex-1 ml-4">
          <Text className="text-base font-osregular text-burgundy mb-1">
            {item.name}
          </Text>
          <Text className="text-sm font-osregular text-gray-600">
            {item.count} Times
          </Text>
        </View>

        {/* Right: Action Icons & Status */}
        <View className="flex-row items-center gap-3">
          <Pressable 
            onPress={toggleHeart}
            disabled={updating}
            className="p-1"
          >
            <Ionicons
              name={isHeartFilled ? "heart" : "heart-outline"}
              size={20}
              color="#6A1A39"
            />
          </Pressable>

          <Pressable 
            onPress={handleDelete}
            disabled={updating}
            className="p-1"
          >
            <MaterialIcons 
              name="delete-outline" 
              size={20} 
              color="#6A1A39" 
            />
          </Pressable>

          <View className="justify-center items-center pl-2">
            {isCompleted ? (
              <FontAwesome name="check-circle" size={20} color="#6A1A39" />
            ) : (
              <FontAwesome name="clock-o" size={20} color="#A0A0A0" />
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}
