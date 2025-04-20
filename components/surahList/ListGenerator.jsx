import { View, FlatList } from 'react-native';
import ListItem from './ListItem';
import { useState, useEffect } from 'react';
import {surahs, juzs, hizbs} from "../../constants/quranData.js"; 
import { router } from 'expo-router';

export default function ListGenerator({ type }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let filteredData = [];
    
    if (type === 1) filteredData = surahs;
    else if (type === 2) filteredData = juzs;
    else if (type === 3) filteredData = hizbs;

    setData(filteredData);
  }, [type]);

  return (
    <View className="flex-1 mt-[320px]">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem item={item} index={index} type={type} onPress={() => {
            console.log(item.id)
            router.push("/(ayah)/index_page")
          }} />
        )}
        contentContainerStyle={{ paddingVertical: 10, gap: 15}}
      />
    </View>
  );
}