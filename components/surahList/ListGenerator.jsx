import { View, FlatList } from 'react-native';
import ListItem from './ListItem.jsx';
import { useState, useEffect } from 'react';
import {surahs, juzs, hizbs} from "../../constants/quranData.js"; 
<<<<<<< HEAD
import { router } from 'expo-router';
=======
import {azkar} from "../../constants/zikrData.js";
>>>>>>> 26352b6925bb5848ab42bcb7d74dc0bb64719e89

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


  const renderListItem = ({ item, index }) => (
    <ListItem item={item} index={index} type={type} />
  );
  

  return (
    <View className="flex-1 w-full mt-8 py-2">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
<<<<<<< HEAD
        renderItem={({ item, index }) => (
          <ListItem item={item} index={index} type={type} onPress={() => {
            console.log(item.id)
            router.push("/(ayah)/index_page")
          }} />
        )}
        contentContainerStyle={{ paddingVertical: 10, gap: 15}}
=======
        removeClippedSubviews = {false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        renderItem={renderListItem}
        contentContainerStyle={{gap: 15}}
        showsVerticalScrollIndicator= {false}
>>>>>>> 26352b6925bb5848ab42bcb7d74dc0bb64719e89
      />
    </View>
  );
}