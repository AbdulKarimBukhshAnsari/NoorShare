import { View, Text, TouchableOpacity, Image } from "react-native";
import BgImage from "../../assets/images/PurpleCardBg.png";

const PurpleCard = ({ 
    title, 
    surahName, // title of last read
    verseNumber, //subtitle of last read
    centerText, //for zikr card
    remaining, 
    total 
    }) => {

        const showStats = remaining !== undefined && total !== undefined;

        return (
            <View className="w-[333px] h-[101px] rounded-[10px] p-[9px] relative">
                <Image source={BgImage} className="absolute w-[333px] h-[101px] top-0 left-0" />
                {/* Title (Top Left) */}
                <Text className="text-white text-xl font-osregular"> {title} </Text>

                {/* Remaining and Total (for zikr) */}
                {showStats && (
                    <>
                    <Text className="absolute top-[13px] right-[13px] text-white text-[13px] font-osregular">
                        Remaining: {remaining}
                    </Text>
                    <Text className="absolute bottom-[13px] left-[13px] text-white text-[13px] font-osregular">
                        Total: {total}
                    </Text>
                    </>
                )}

                {/* Center Text */}
                <View className="items-center justify-center self-center">
                    {surahName && verseNumber ? (
                    <>
                        <Text className="text-white text-[20px] font-oslight">{surahName}</Text>
                        <Text className="text-white text-[13px] font-osregular">Verse {verseNumber}</Text>
                    </>
                    ) : (
                    <Text className="text-white text-[20px] font-indopak pt-2">{centerText}</Text>
                    )}
                </View>

                {/* Continue Button */}
                <TouchableOpacity className="absolute bottom-[13px] right-[13px] w-[84px] h-[25px] bg-white rounded-[20px] flex items-center justify-center">
                    <Text className="text-[#6A1A39] text-[11px] font-ossemibold">CONTINUE →</Text>
                </TouchableOpacity>
            </View>
        );
};

export default PurpleCard;
