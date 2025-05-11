import { View, FlatList } from 'react-native';
import SurahListItem from './SurahListItem.jsx';
import ZikrListItem from './ZikrListItem.jsx';
import { useState, useEffect } from 'react';
import {surahs, juzs, hizbs} from "../../constants/quranData.js"; 
import {azkar} from "../../constants/zikrData.js";

export default function ListGenerator({ type }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let filteredData = [];
    if (type === 1) filteredData = surahs;
    else if (type === 2) filteredData = juzs;
    else if (type === 3) filteredData = hizbs;
    else if (type === 4) filteredData = azkar;

    setData(filteredData);
  }, [type]);

  const renderListItem = ({ item, index }) => {
    if (type === 4) {
      return <ZikrListItem item={item} index={index} />;
    } else {
      return <SurahListItem item={item} index={index} type={type} />;
    }
  };  

  return (
    <View className="flex-1 w-full mt-8 py-2">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        removeClippedSubviews={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        renderItem={renderListItem}
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
