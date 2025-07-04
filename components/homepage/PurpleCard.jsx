import { View, Text, Pressable, ImageBackground } from "react-native";
import BgImage from "../../assets/images/PurpleCardBg.png";
import { useRouter } from "expo-router";

const PurpleCard = ({
  title,
  surahName, // title of last read
  verseNumber, // subtitle of last read
  centerText, // for zikr card
  remaining,
  total,
  zikrData
}) => {
  const showStats = remaining !== undefined && total !== undefined;
  const router = useRouter();
  return (
    <View className="h-[13%] w-full">
      <ImageBackground
        source={BgImage}
        resizeMode="cover"
        className="flex-1 rounded-2xl overflow-hidden px-5 py-3"
      >
        {/* Top Row */}
        <View className="flex-row justify-between items-start">
          <Text className="text-white text-lg font-osregular">{title}</Text>
          {showStats && (
            <Text className="text-white text-sm font-osregular">
              Remaining: {remaining}
            </Text>
          )}
        </View>

        {/* Center Content */}
        <View className="flex-1 justify-center items-center">
          {surahName && verseNumber ? (
            <>
              <Text className="text-white text-2xl font-oslight">
                {surahName}
              </Text>
              <Text className="text-white text-base font-osregular">
                Verse {verseNumber}
              </Text>
            </>
          ) : (
            <Text className="text-white text-4xl font-indoquran pt-8">
              {centerText}
            </Text>
          )}
        </View>

        {/* Bottom Row */}
        <View
          className={`flex-row items-center ${
            showStats ? "justify-between" : "justify-end"
          }`}
        >
          {showStats && (
            <Text className="text-white text-sm font-osregular">
              Total: {total}
            </Text>
          )}
          <Pressable
            className="bg-white px-4 py-1.5 rounded-lg"
            onPress={() =>
              router.push({
                pathname: showStats ? "/(zikr)/ZikrCounter" : "/(surahList)/AllSurahs",
                params: { item: JSON.stringify(zikrData) },
              })
            }
          >
            <Text className="text-burgundy text-sm font-ossemibold">
              CONTINUE →
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PurpleCard;
