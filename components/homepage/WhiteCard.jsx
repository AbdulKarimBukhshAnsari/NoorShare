import { View, Text } from "react-native";

const WhiteCard = ({ title, description, height, children }) => {
  return (
    <View
      className="w-[333px] bg-white rounded-[15px] p-4 shadow-2xl justify-center"
      style={{  height }}
    >
      {/* Title */}
      <Text
        className="text-[#6D1C3A] text-[25px] font-oslight tracking-[2.5px]"
        style={{
          textShadowColor: "#6D1C3A",
          textShadowOffset: { width: 0.5, height: 0.5 },
          textShadowRadius: 1,
        }}
      >
        {title}
      </Text>

      {/* Description */}
      <Text className="text-black text-[12px] font-osregular mt-2">{description}</Text>
      <View className="mt-6">{children}</View>
    </View>
  );
};

export default WhiteCard;