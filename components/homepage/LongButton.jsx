import { View, Text, ImageBackground, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import BgImage from "../../assets/images/PurpleCardBg.png";

const LongButton = ({ text, iconName, imageSource }) => {
  return (
    <ImageBackground
      source={BgImage}
      className="w-[275px] h-[53px] flex-row items-center justify-center gap-4 self-center rounded-lg overflow-hidden"
      resizeMode="cover"
    >
      {/* Icon */}
      <View className="w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center">
        {imageSource ? (
          <Image source={imageSource} className="w-[24px] h-[24px]" />
        ) : (
          <Entypo name={iconName} size={25} color="#6A1A39" />
        )}
      </View>

      {/* Text */}
      <Text className="text-white text-xl font-osregular ml-3 tracking-wider">
        {text}
      </Text>
    </ImageBackground>
  );
};

export default LongButton;
