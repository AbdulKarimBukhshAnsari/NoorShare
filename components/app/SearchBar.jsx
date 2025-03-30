import { View, TextInput, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {useState} from "react";

const SearchBar = ({ value, onChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View className="absolute top-[210px] w-[90vw] h-[50px] flex-row items-center bg-[#FDFAFA] p-4 rounded-[10px]">
      <FontAwesome name="search" size={20} color={"#9A9898"} />
      <TextInput
        className="h-[50px] ml-1 flex-1 justify-center text-burgundy text-[15px]"
        placeholder="Search"
        placeholderTextColor={"#9A9898"}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default SearchBar;
