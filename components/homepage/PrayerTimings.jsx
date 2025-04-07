import { View } from "react-native";
import PrayerTime from "./PrayerTime";

const PrayerTimings = () => {
  const prayers = [
    { prayerName: "Fajr", iconSource: "Feather", iconName: "sunrise" },
    { prayerName: "Sunrise", iconSource: "Feather", iconName: "sunrise" },
    { prayerName: "Dhuhr", iconSource: "Feather", iconName: "sun" },
    { prayerName: "Asr", iconSource: "Feather", iconName: "sunset" },
    { prayerName: "Maghrib", iconSource: "Ionicons", iconName: "moon-sharp" },
    { prayerName: "Isha", iconSource: "Ionicons", iconName: "moon-sharp" },
  ];

  return (
    <View className="flex-row mt-5">
      {prayers.map((prayer, index) => (
        <PrayerTime 
          key={index} 
          prayerName={prayer.prayerName} 
          iconSource={prayer.iconSource} 
          iconName={prayer.iconName} 
        />
      ))}
    </View>
  );
};


export default PrayerTimings;