import { SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import SectionBox from "../../components/app/SectionBox";
import Header from "../../components/app/Header";
import SearchBar from "../../components/app/SearchBar";
import ScrollMenu from "../../components/surahList/AnimatedMenu";
import supabase from "../../lib/supabase";

const SurahListPage = () => {
  const [azkarData, setAzkarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAzkarData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("azkar")
          .select("*");

        if (error) {
          console.error("Error fetching azkar:", error.message);
          return;
        }

        setAzkarData(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAzkarData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-white items-center">
        <Header version={3} />
        <SectionBox text="ZIKR CORNER"/>
        <SearchBar />
        <ScrollMenu 
          tabs={["ALL", "FAVORITE"]} 
          azkarData={azkarData}
          isLoading={isLoading}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SurahListPage;
