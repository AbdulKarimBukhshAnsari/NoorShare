import {View} from "react-native";
import SectionBox from "../../components/app/SectionBox";
import Header from "../../components/app/Header";
import SearchBar from "../../components/app/SearchBar";
import ScrollMenu from "../../components/surahList/AnimatedMenu";

const SurahListPage = () => {
    return(
        <View className="flex-1 bg-white items-center">
            <Header version={3}/>
            <SectionBox text="QURAN READING"/>
            <SearchBar/>
            {/* Scroll Menu contains all the data like the above tab as well it will render also the surah list , para and the hizb list as well */}
            <ScrollMenu tabs={["SURAH", "JUZ", "HIZB", "SAVED"]} />
        </View>
    )
};

export default SurahListPage;
