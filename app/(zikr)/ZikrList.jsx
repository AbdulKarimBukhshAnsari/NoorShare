import { SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import SectionBox from "../../components/app/SectionBox";
import Header from "../../components/app/Header";
import SearchBar from "../../components/app/SearchBar";
import ScrollMenu from "../../components/surahList/AnimatedMenu";


const SurahListPage = () => {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-white items-center">
        <Header version={3} />
        <SectionBox text="ZIKR CORNER"/>
        <SearchBar />
        <ScrollMenu tabs={["ALL", "FAVORITE"]} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SurahListPage;
