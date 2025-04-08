import { View, Text, ImageBackground, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import BgImage from "../../assets/images/PurpleCardBg.png";
import Tasbeeh from "../../assets/images/tasbeeh.png";
import AsmaIcon from "../../assets/images/names.png";
import { useRouter } from "expo-router";

const LongButton = ({ text, type }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push(
          type === 1 ? "/AllSurahs" : type === 2 ? "/ZikrList" : "/Asma"
        )
      }
    >
      <ImageBackground
        source={BgImage}
        className="w-[275px] h-[53px] flex-row items-center justify-center gap-4 self-center rounded-lg overflow-hidden"
        resizeMode="cover"
      >
        {/* Icon */}
        <View className="w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center">
          {type === 1 ? (
            <Entypo name="share" size={25} color="#6A1A39" />
          ) : type === 2 ? (
            <Image source={Tasbeeh} className="w-[24px] h-[24px]" />
          ) : type === 3 ? (
            <Image source={AsmaIcon} className="w-[24px] h-[24px]" />
          ) : null}
        </View>

        {/* Text */}
        <Text className="text-white text-xl font-osregular ml-3 tracking-wider">
          {text}
        </Text>
      </ImageBackground>
    </Pressable>
  );
};

export default LongButton;
