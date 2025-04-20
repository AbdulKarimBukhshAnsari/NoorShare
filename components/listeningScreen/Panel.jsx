import { ImageBackground, Text, View } from "react-native";

export default function Panel({ name }) {
  return (
    <>
      <View className="items-center">
  <ImageBackground
    source={require("../../assets/images/listeningPanel.png")}
    className="w-[332px] h-[371px] mt-6 flex justify-center items-center"
  >
    <View className="w-full h-full justify-center items-center">
      <Text className="font-qquran text-burgundy text-[55px]">
      سورة {name}
      </Text>
    </View>
  </ImageBackground>
</View>


    </>
  );
}
