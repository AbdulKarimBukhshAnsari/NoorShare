import {View} from "react-native";
import SectionBox from "../../components/app/SectionBox";
import Header from "../../components/app/Header";
import SearchBar from "../../components/app/SearchBar";
import ScrollMenu from "../../components/surahList/AnimatedMenu";

const SurahListPage = () => {
    let item =  { id: 1, startSurah: "Al-Fātiḥah 1:1", arabic: "المٓ" }
    return(
        <View className="flex-1 bg-white items-center">
            <Header version={3}/>
            <SectionBox text="QURAN READING"/>
            <SearchBar/>
            <ScrollMenu tabs={["SURAH", "JUZ", "HIZB", "SAVED"]} />
        </View>
    )
};

export default SurahListPage;
