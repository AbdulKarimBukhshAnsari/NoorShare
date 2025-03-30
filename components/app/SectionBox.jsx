import { View, Text, Image } from "react-native";
import BgImage from "../../assets/images/PurpleCardBg.png";
import { MaterialIcons } from "@expo/vector-icons";

const SectionBox = ({ text, icon }) => {
    return (
        <View className={`absolute top-28 w-[95vw] ${icon ? "h-32" : "h-28"} items-center justify-center 
        rounded-[20px] overflow-hidden`}>
            <Image source={BgImage} className="absolute w-full h-full" resizeMode="cover" />
            
            {icon && (
                <View className="absolute top-4 right-4">
                    <MaterialIcons name="tune" size={18} color="white" />
                </View>
            )}
            
            <Text className="text-white text-[30px] font-osregular">{text}</Text>
        </View>
    );
};

export default SectionBox;
