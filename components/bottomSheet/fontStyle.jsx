import {  ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import StyleList from "../../components/bottomSheet/styleList";

export default function fontStyle({ setEng, setArabic }) {
  return (
    <>
      <View className="px-5 py-2">
        <Text className=" mb-2 text-burgundy  text-lg font-[Poppins-Medium]">
          Font Style Settings
        </Text>
        {/* translation fonts */}
        <View>
          <Text className=" mb-2 text-burgundy text-base font-[Poppins-Medium]">Translation Fonts</Text>
          <ScrollView style={{ maxHeight: 300 }}>
            <TouchableOpacity onPress={() => setEng("pextralight")}>
              <StyleList name={"Poppins Extra Light"} font={"pextralight"} />
            </TouchableOpacity  >
            <TouchableOpacity onPress={() => setEng("pregular")}>
              <StyleList name={"Poppins Regular"} font={"pregular"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEng("pmedium")}>
              <StyleList name={"Poppins Medium"} font={"pmedium"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEng("psemibold")}>
              <StyleList name={"Poppins SemiBold"} font={"psemibold"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEng("sorga")}>
              <StyleList name={"Sorga-Demo"} font={"sorga"} />
            </TouchableOpacity>
          </ScrollView>
        </View>
    {/* arabic fonts */}
        <View>
          <Text className=" mt-3 text-burgundy text-base font-[Poppins-Medium]">Arabic Fonts</Text>
          <ScrollView style={{ maxHeight: 300 }}>
            <TouchableOpacity onPress={() => setArabic("aquran")}>
              <StyleList name={"Al-Mushaf-Quran"} font={"aquran"} />
            </TouchableOpacity  >
            <TouchableOpacity onPress={() => setArabic("qquran")}>
              <StyleList name={"Al-Qalam-Quran"} font={"qquran"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setArabic("indoquran")}>
              <StyleList name={"Indopak-Nastaleeq"} font={"indoquran"} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
