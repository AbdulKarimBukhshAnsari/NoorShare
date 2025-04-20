import { View, TextInput, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const SearchBar = ({ value, onChange, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View
      className={`mt-7 px-5 w-[90%] h-14 flex-row items-center bg-[#FDFAFA] rounded-xl border ${
        isFocused ? "border-burgundy" : "border-transparent"
      }`}
    >
      <FontAwesome
        name="search"
        size={20}
        color={isFocused ? "#6A1A39" : "#9A9898"} 
      />
      
      <TextInput
        className="h-[50px] ml-3 flex-1 justify-center text-burgundy text-4"
        placeholder={isFocused ? "" : "Search"}
        placeholderTextColor={"#9A9898"}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default SearchBar;
