import { View, Text, ImageBackground, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import BgImage from "../../assets/images/PurpleCardBg.png";
import Tasbeeh from "../../assets/images/tasbeeh.png";
import AsmaIcon from "../../assets/images/names.png";
import { useRouter } from "expo-router";

const LongButton = ({ text, type, openModal }) => {
  const router = useRouter();

  const imageBackgroundProps = {
    source: BgImage,
    className:
      "w-[275px] h-[53px] flex-row items-center justify-center gap-4 self-center rounded-lg overflow-hidden",
    resizeMode: "cover",
  };

  const ImgBg = (props) => (
    <ImageBackground {...imageBackgroundProps} {...props} />
  );

  if (type === 1) {
    return (
      <Pressable onPress={openModal}>
        <ImgBg>
          {/* Icon */}
          <View className="w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center">
            <Entypo name="share" size={25} color="#6A1A39" />
          </View>

          {/* Text */}
          <Text className="text-white text-xl font-osregular ml-3 tracking-wider">
            {text}
          </Text>
        </ImgBg>
      </Pressable>
    );
  }

  if (type === 2) {
    return (
      <Pressable onPress={() => router.push("/ZikrList")}>
        <ImgBg>
          {/* Icon */}
          <View className="w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center">
            <Image source={Tasbeeh} className="w-[24px] h-[24px]" />
          </View>

          {/* Text */}
          <Text className="text-white text-xl font-osregular ml-3 tracking-wider">
            {text}
          </Text>
        </ImgBg>
      </Pressable>
    );
  }

  if (type === 3) {
    return (
      <Pressable onPress={() => router.push("/Asma")}>
        <ImgBg>
          {/* Icon */}
          <View className="w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center">
            <Image source={AsmaIcon} className="w-[24px] h-[24px]" />
          </View>

          {/* Text */}
          <Text className="text-white text-xl font-osregular ml-3 tracking-wider">
            {text}
          </Text>
        </ImgBg>
      </Pressable>
    );
  }

};

export default LongButton;
