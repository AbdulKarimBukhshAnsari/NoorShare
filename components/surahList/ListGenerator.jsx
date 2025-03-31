import { View, FlatList } from 'react-native';
import ListItem from './ListItem';
import { useState, useEffect } from 'react';
import {surahs, juzs, hizbs} from "../../constants/quranData.js"; 

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
        removeClippedSubviews = {false}
        windowSize={20}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        renderItem={({ item, index }) => (
          <ListItem item={item} index={index} type={type}  />
        )}
        contentContainerStyle={{ paddingVertical: 10, gap: 15}}
      />
    </View>
  );
}