import { FlatList, View } from "react-native";
import { names } from "../../constants/asmaData";
import ReducedCard from "./ReducedCard";

const CardGenerator = () => {
  return (
    <FlatList
      data={names}
      renderItem={({ item }) => <ReducedCard item={item} />}
      numColumns={2}
      removeClippedSubviews = {false}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        paddingHorizontal: 6,  
        paddingVertical: 5,
        paddingTop: 0,
      }}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: 'space-between', 

      }}
    />
  );
};

export default CardGenerator;
