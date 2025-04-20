import { SafeAreaView } from "react-native";
import Header from "../../components/app/Header";
import SectionBox from "../../components/app/SectionBox";
import CardGenerator from "../../components/asma/CardGenerator";

const AsmaPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <Header version={3} />
      <SectionBox text="ASMA-UL-HUSNA" />
      <CardGenerator />
    </SafeAreaView>
  );
};

export default AsmaPage;
