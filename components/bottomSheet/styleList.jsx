import { Text, View } from "react-native";

export default function styleList({ name, font }) {
  return (
    <>
      <View className="flex-row justify-between items-center px-4 py-2 ">
          <Text> {name} </Text>
          <Text className={`font-${font}`}> A </Text>
      </View>
    </>
  );
}
