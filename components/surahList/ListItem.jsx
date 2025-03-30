import { View, Text, Pressable } from 'react-native';

export default function ListItem({ item, index, type}) {
  const backgroundColor = index % 2 === 0 ? 'bg-babyPink' : 'bg-pinkLavender';

  let arabicText, englishText, subtitle;

  
  // handling callback for each type of the tabs 

  const onPress = async (id) => {
    if (type === 1) {
      try{
        const data = await fetch();


      }
      catch(error){

      }
    } else if (type === 2) {
      
    } else if (type === 3) {
    
    }
  }


  
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
      className={`w-[95vw] h-[70px] flex-row items-center p-4 justify-between rounded-[10px] shadow-2xl ${backgroundColor}`} 
      onPress={() => onPress(item.id)}
    >
        <Text className="text-[15px] pl-2 font-ossemibold text-burgundy w-12">{item.id}</Text>

        <View className="flex-1">
            <Text className="text-[18px] font-osregular text-burgundy">{englishText}</Text>
            <Text className="text-[14px] font-ossemibold text-gray-600">{subtitle}</Text>
        </View>

        <Text className="text-[25px] font-indopak text-burgundy font-indoquran">{arabicText}</Text>
    </Pressable>
  );
}