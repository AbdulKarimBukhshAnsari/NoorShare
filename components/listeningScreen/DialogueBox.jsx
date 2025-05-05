import { FlatList, View, TouchableOpacity, Text, Modal } from "react-native";

export default function DialogueBox({ data, onSelect }) {
  return (
    <>
      <View
        className="w-[70%] p-3 rounded-xl max-h-64"
        style={{ backgroundColor: "rgba(250,250,250,0.9)" }}
      >
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-3 rounded-md"
              activeOpacity={0.8}
              onPress={() => onSelect(item)}
            >
              <Text className="text-burgundy text-center">{item.name}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </View>
    </>
  );
}
