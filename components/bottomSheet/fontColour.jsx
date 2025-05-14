import { TouchableOpacity } from "react-native";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function fontColour({ setColour }) {
  const colours = [
    // Rainbow Colors
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8B00FF",

    // Darker Pastel Colors
    "#e85f72",
    "#e8ad5f",
    "#FFFF8A",
    "#8AFF8A",
    "#8ACBFF",
    "#B08AFF",
    "#D88AFF",

    // Neutral Colors
    "#000000",
    "#FFFFFF",
    "#808080",

    "#D2691E", 
    "#8B0000", 
    "#2F4F4F", 
    "#6A5ACD", 
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setColour(item);
        // console.log(item)
      }}
      style={{
        width: 35,
        height: 35,
        borderRadius: 20,
        margin: 5,
        backgroundColor: item,
        borderColor: "#eee",
        borderWidth: 2,
      }}
    />
  );
  return (
    <>
      <View className="px-5 py-2">
        <Text className=" mb-2 text-burgundy font-[Poppins-Medium]">
          Font Colour Settings
        </Text>
      </View>

      {/* colours */}

      <View className="items-center ">
        <FlatList
          data={colours}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          numColumns={7}
          scrollEnabled={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            gap: 8,
            marginVertical: 4,
          }}
        />
      </View>
    </>
  );
}
