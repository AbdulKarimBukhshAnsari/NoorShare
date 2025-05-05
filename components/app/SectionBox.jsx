import { View, Text, Image } from "react-native";
import BgImage from "../../assets/images/PurpleCardBg.png";

const SectionBox = ({ text }) => {
  return (
    <View
      className="mt-8 px-5 h-32 flex-row items-center justify-center relative"
    >
      <Image
        source={BgImage}
        className="absolute w-full h-full rounded-2xl overflow-hidden"
        resizeMode="cover"
      />

      <Text className="text-white text-[30px] font-osregular">{text}</Text>
    </View>
  );
};

export default SectionBox;
