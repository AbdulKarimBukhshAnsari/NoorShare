import { View, Text } from "react-native";

const WhiteCard = ({ title, description, children }) => {
  return (
    <View
      className="w-full px-5 p-6 bg-white rounded-[15px] shadow-xl justify-center gap-y-3"
    >
      {/* Title */}
      <Text
        className="text-[#6D1C3A] text-3xl font-osregular tracking-[2.5px]"
      >
        {title}
      </Text>

      {/* Description */}
      <Text className="text-black text-base font-osregular text-justify">{description}</Text>
      <View>{children}</View>
    </View>
  );
};

export default WhiteCard;