import {  ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import StyleList from "../../components/bottomSheet/styleList";

export default function fontStyle({ set }) {
  return (
    <>
      <View className="px-5 py-2">
        <Text className=" mb-2 text-burgundy font-[Poppins-Medium]">
          Font Style Settings
        </Text>
        <View>
          <ScrollView style={{ maxHeight: 300 }}>
            <TouchableOpacity onPress={() => set("pthin")}>
              <StyleList name={"Poppins Thin"} font={"pthin"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => set("pextralight")}>
              <StyleList name={"Poppins Extra Light"} font={"pextralight"} />
            </TouchableOpacity  >
            <TouchableOpacity onPress={() => set("pregular")}>
              <StyleList name={"Poppins Regular"} font={"pregular"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => set("pmedium")}>
              <StyleList name={"Poppins Medium"} font={"pmedium"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => set("psemibold")}>
              <StyleList name={"Poppins SemiBold"} font={"psemibold"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => set("sorga")}>
              <StyleList name={"Sorga-Demo"} font={"sorga"} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
