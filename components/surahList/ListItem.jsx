import { View, Text, Pressable, Alert } from "react-native";
import surahRequest from "../../api/surah";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

export default function ListItem({ item, index, type }) {
  const backgroundColor = index % 2 === 0 ? "bg-babyPink" : "bg-pinkLavender";

  const { setRecite, setLoadingAyah } = useGlobalContext();

  let arabicText, englishText, subtitle;

  const onPress = async (id) => {
    console.log("key pressed");

    if (type === 1) {
      setLoadingAyah(true); // Show loading overlay
      try {
        const { error, data } = await surahRequest(id);

        if (error) {
          Alert.alert(
            "Error",
            data.message || "An error occurred while fetching the Surah data."
          );
        } else {
          setRecite([type, data]);
          router.push("/index_page"); // Navigate when response is received
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong.");
      } finally {
        setLoadingAyah(false);
      }
    } else if (type === 2) {
      setLoadingAyah(true); // Show loading overlay
      try {
        const { error, data } = await surahRequest(id);

        if (error) {
          Alert.alert(
            "Error",
            data.message || "An error occurred while fetching the Surah data."
          );
        } else {
          setRecite([type, data]);
          router.push("/index_page"); // Navigate when response is received
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong.");
      } finally {
        setLoadingAyah(false);
      }
    } else {
      setLoadingAyah(true); // Show loading overlay
      try {
        const { error, data } = await surahRequest(id);

        if (error) {
          Alert.alert(
            "Error",
            data.message || "An error occurred while fetching the Surah data."
          );
        } else {
          setRecite(data);
          router.push("/index_page"); // Navigate when response is received
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong.");
      } finally {
        setLoadingAyah(false);
      }
    }
  };
  
  // Surah
  if (type === 1) {
    arabicText = item.arabic;
    englishText = item.name;
    subtitle = `${item.isMakki ? "Makkah" : "Madina"} | ${item.verses} Verses`;
  }
  // Juz
  else if (type === 2) {
    arabicText = item.arabic;
    englishText = `Juz ${item.id}`;
    subtitle = `${item.startSurah} ${item.reference}`;
  }
  // Hizb
  else if (type === 3) {
    arabicText = item.arabicText;
    englishText = item.quarter
      ? `Hizb ${item.number} (${item.quarter})`
      : `Hizb ${item.number}`;
    subtitle = `${item.surahName} ${item.reference}`;
  }

  return (
    <View className="flex-1 items-center">
      <Pressable
        className={`w-[95%] h-20 px-4 flex-row items-center justify-between rounded-xl ${backgroundColor}`}
        onPress={() => onPress(item.id)}
      >
        <View className="w-8 items-center">
          <Text className="text-sm font-ossemibold text-burgundy">
            {item.id}
          </Text>
        </View>

        <View className="flex-1 ml-4">
          <Text className="text-xl font-osregular text-burgundy">
            {englishText}
          </Text>
          <Text className="text-sm font-osregular text-gray-600">
            {subtitle}
          </Text>
        </View>

        <View className="w-30 justify-center items-center">
          <Text className="text-4xl font-indopak text-burgundy font-indoquran pt-8">
            {arabicText}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
