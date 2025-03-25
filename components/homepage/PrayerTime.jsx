import { View, Text, Image } from "react-native";
import { PrayerTimes, Coordinates, CalculationMethod } from "adhan";
import { Feather, Ionicons } from "@expo/vector-icons";

const PrayerTime = ({ prayerName, iconSource, iconName }) => {
  
  const IconComponent = iconSource === "Feather" ? Feather : Ionicons;

  const coordinates = new Coordinates(24.8607, 67.0011);
  const params = CalculationMethod.MuslimWorldLeague();
  const date = new Date();
  const prayerTimes = new PrayerTimes(coordinates, date, params);

  const prayerTime = prayerTimes[prayerName.toLowerCase()];

  // shows as "6:22 AM"
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/ AM| PM/, "");
  };

  return (
    <View className="w-[65px] h-[25px] items-center gap-3">
      {/* Prayer Name */}
      <Text className="text-white text-[13px] font-osregular">{prayerName}</Text>
      {/* Icon */}
      <IconComponent name={iconName} size={24} color="white" opacity={0.8} />
      {/* Prayer Time */}
      <Text className="text-white text-[13px] font-osregular">{formatTime(prayerTime)}</Text>
    </View>
    );
};

export default PrayerTime;
