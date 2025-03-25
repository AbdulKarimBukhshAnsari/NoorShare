import { View, Text, Image, ScrollView } from "react-native";
import {useState, useEffect} from "react";
import moment from "moment";
import Header from "../../components/app/Header";
import PrayerTimings from "../../components/homepage/PrayerTimings";
import WhiteCard from "../../components/homepage/WhiteCard";
import PurpleCard from "../../components/homepage/PurpleCard";
import QuranArray from "../../components/homepage/QuranArray";
import LongButton from "../../components/homepage/LongButton";
import BgImage from "../../assets/images/BgImage.png";
import Tasbeeh from "../../assets/images/tasbeeh.png";
import AsmaIcon from "../../assets/images/names.png";
import { GetHijriDate, GetCurrentPrayerAndTimeLeft } from "../../components/homepage/HelperFunctions";

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // to set a constantly updating clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/* Scrollable Content */}
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Background Image - fixed position */}
        <Image source={BgImage} className="absolute w-[412px] h-[414px] top-0 left-0" />
        
        {/* Main Content Container */}
        <View className="flex-1 items-center pb-10">
          {/* Header */}
          <Header version={1} />

          {/* Current Time */}
          <Text className="text-white text-[45px] font-oslight absolute top-[115px] left-0 right-0 text-center">
            {moment(currentTime).format("h:mm A")}
          </Text>

          {/* Hijri Date & Current Prayer */}
          <View className="absolute top-[200px] left-[26px] flex-row justify-between w-[361px]">
            <GetHijriDate />
            <GetCurrentPrayerAndTimeLeft />
          </View>

          {/* Separator Line */}
          <View className="absolute top-[230px] left-[26px] w-[361px] border-t border-white" />

          {/* Prayer Timings */}
          <PrayerTimings />

          {/* Cards Section */}
          <View className="mt-[367px] px-[39px]">
            {/* Quran Card */}
            <WhiteCard 
              title="QURAN" 
              description="Read and listen to the Quran, choose any surah, and display A Fixed No. of ayahs at A time."  
              height={185} 
            >
              <QuranArray />
            </WhiteCard>

            {/* Last Read Card */}
            <View className="mt-[28px]">
              <PurpleCard title="LAST READ" surahName="AL-BAQARAH" verseNumber={12} />
            </View>

            {/* Sharing Corner */}
            <View className="mt-[28px]">
              <WhiteCard 
                title="SHARING CORNER" 
                description="Create and share ayahs your way—edit text, choose backgrounds, customize fonts, add AI captions, and share anywhere."  
                height={185} 
              >
                <LongButton text="EDIT AND SHARE" iconName="share" />
              </WhiteCard>
            </View>

            {/* Zikr Corner */}
            <View className="mt-[28px]">
              <WhiteCard 
                title="ZIKR CORNER" 
                description="Do your tasbeehs and duas with ease using a preset collection."  
                height={181} 
              >
                <LongButton text="START TASBEEH" imageSource={Tasbeeh} />
              </WhiteCard>
            </View>

            {/* Zikr Counter */}
            <View className="mt-[28px]">
              <PurpleCard title="ZIKR COUNTER" centerText="سُبْحَانَ اللَّهِ" remaining={10} total={100} />
            </View>

            {/* Names of Allah */}
            <View className="mt-[28px]">
              <WhiteCard 
                title="NAMES OF ALLAH" 
                description="Learn Allah's beautiful names with their meanings, transliterations, and short descriptions."  
                height={185} 
              >
                <LongButton text="LEARN NOW" imageSource={AsmaIcon} />
              </WhiteCard>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;