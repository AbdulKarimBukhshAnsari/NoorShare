import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import moment from "moment";
import Header from "../../components/app/Header";
import PrayerTimings from "../../components/homepage/PrayerTimings";
import WhiteCard from "../../components/homepage/WhiteCard";
import PurpleCard from "../../components/homepage/PurpleCard";
import QuranArray from "../../components/homepage/QuranArray";
import LongButton from "../../components/homepage/LongButton";
import BgImage from "../../assets/images/BgImage.png";
import {
  GetHijriDate,
  GetCurrentPrayerAndTimeLeft,
} from "../../components/homepage/HelperFunctions";
import SharingMenu from "../../components/listeningScreen/SharingMenu";

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [zikrData, setZikrData] = useState({
    azkar_id: "d2e6b8a1-3f4e-4e5d-b93e-1f91c9b7a6b3",
    count: 100,
    favourite: true,
    inserted_at: "2025-05-14T12:00:00.000000+00:00",
    name: "Subhan Allah",
    status: "not completed",
    user_id: "1195efaa-0053-4cb9-b37a-0393e0ab40a4",
  });
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  // to set a constantly updating clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Image
        source={BgImage}
        className="absolute w-full h-[52%] rounded-bl-2xl rounded-br-2xl"
      />

      <Header version={1} />

      <Text className="mt-10 text-white text-7xl font-oslight text-center pt-2">
        {moment(currentTime).format("h:mm A")}
      </Text>

      <View className="w-full px-5 mt-7">
        {/* Hijri Date & Current Prayer */}
        <View className="flex-row justify-between w-full">
          <GetHijriDate />
          <GetCurrentPrayerAndTimeLeft />
        </View>

        {/* Separator Line */}
        <View className="mt-3 w-full border-t border-white" />
      </View>

      {/* Prayer Timings */}
      <PrayerTimings />

      <ScrollView
        className="mt-12"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingBottom: 130,
        }}
      >
        <View className="gap-y-6">
          <WhiteCard
            title="QURAN"
            description="Read and listen to the Quran, choose any surah, and display a Fixed No. of ayahs at a time."
          >
            <QuranArray />
          </WhiteCard>

          <PurpleCard
            title="LAST READ"
            surahName="AL-BAQARAH"
            verseNumber={12}
            zikrData = {zikrData}
          />

          <WhiteCard
            title="SHARING CORNER"
            description="Create and share ayahs your way—edit text, choose backgrounds, customize fonts, add AI captions, and share anywhere."
          >
            <LongButton text="EDIT AND SHARE" type={1} openModal={openModal} />
            <SharingMenu visible={modalVisible} closeModal={closeModal} />
          </WhiteCard>

          <WhiteCard
            title="ZIKR CORNER"
            description="Do your tasbeehs and duas with ease using a preset collection."
          >
            <LongButton text="START TASBEEH" type={2} />
          </WhiteCard>

          <PurpleCard
            title="ZIKR COUNTER"
            centerText="سُبْحَانَ اللَّهِ"
            remaining={10}
            total={100}
            zikrData={zikrData}
          />

          <WhiteCard
            title="NAMES OF ALLAH"
            description="Learn Allah's beautiful names with their meanings, transliterations, and short descriptions."
          >
            <LongButton text="LEARN NOW" type={3} />
          </WhiteCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
