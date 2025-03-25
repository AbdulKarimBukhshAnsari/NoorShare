import { View, Text, Pressable } from 'react-native';

export default function ListItem({ item, index, type, onPress }) {
  const backgroundColor = index % 2 === 0 ? 'bg-babyPink' : 'bg-pinkLavender';

  let arabicText, englishText, subtitle;
  
  // Surah
  if (type === 1) { 
    arabicText = item.arabic;
    englishText = item.name;
    subtitle = `${item.isMakki ? 'Makkah' : 'Madina'} | ${item.verses} Verses`;
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
    if (item.quarter === "") {
        englishText = `Hizb ${item.number}`;
    }
    else{
        englishText = `Hizb ${item.number} (${item.quarter})`;
    }
    subtitle = `${item.surahName} ${item.reference}`;
  }

  return (
    <Pressable 
      className={`w-[377px] h-[70px] flex-row items-center p-4 justify-between rounded-[10px] shadow-2xl ${backgroundColor}`} 
      onPress={() => onPress(item.id)}
    >
        <Text className="text-[15px] pl-2 font-ossemibold text-burgundy w-12">{item.id}</Text>

        <View className="flex-1">
            <Text className="text-[18px] font-osregular text-burgundy">{englishText}</Text>
            <Text className="text-[14px] font-ossemibold text-gray-600">{subtitle}</Text>
        </View>

        <Text className="text-[30px] font-indopak text-burgundy">{arabicText}</Text>
    </Pressable>
  );
}