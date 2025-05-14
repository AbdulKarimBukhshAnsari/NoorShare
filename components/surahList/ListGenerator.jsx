import { View, FlatList, Text, ActivityIndicator } from "react-native";
import SurahListItem from "./SurahListItem.jsx";
import ZikrListItem from "./ZikrListItem.jsx";
import { useState, useEffect } from "react";
import { surahs, juzs, hizbs } from "../../constants/quranData.js";

export default function ListGenerator({ type, azkarData, isLoading, onFavoriteUpdate }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let filteredData = [];

    if (type === 1) filteredData = surahs;
    else if (type === 2) filteredData = juzs;
    else if (type === 3) filteredData = hizbs;
    else if (type === 4) {
      setData(azkarData);
      return;
    }

    setData(filteredData);
  }, [type, azkarData]);

  const renderListItem = ({ item, index }) => {
    if (type === 4) {
      return <ZikrListItem 
        item={item} 
        index={index}
        onFavoriteUpdate={onFavoriteUpdate}
      />;
    } else {
      return <SurahListItem item={item} index={index} type={type} />;
    }
  };

  return (
    <View className="flex-1 w-full mt-8 py-2">
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#6A1A39" />
        </View>
      ) : data.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-8">
          <Text className="text-base text-burgundy">
            {type === 4 ? "No Zikr found" : "Create your first Zikr!"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) =>
            type === 4 ? item.azkar_id?.toString() : item.id.toString()
          }
          removeClippedSubviews={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          renderItem={renderListItem}
          contentContainerStyle={{ gap: 15, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
