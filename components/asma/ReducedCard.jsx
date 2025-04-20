import { React, useState } from "react";
import { Text, Pressable } from "react-native";
import AsmaModal from "./ModalCard";

const ReducedCard = ({ item }) => {
  const backgroundColor =
    item.id % 4 === 0 || item.id % 4 === 1 ? "bg-pinkLavender" : "bg-babyPink";

  const [selectedName, setSelectedName] = useState(null);

  const handlePress = () => {
    setSelectedName(item);
  };

  const closeModal = () => {
    setSelectedName(null);
  };

  return (
    <>
      <Pressable
        className={`mt-8 rounded-xl p-4 items-center justify-between w-[45%] m-2 shadow-lg gap-y-4 ${backgroundColor}`}
        onPress={handlePress}
      >
        <Text className="text-base bg-[bgColor] p-4 font-bold text-center font-osregular text-burgundy">
          {item.id}
        </Text>
        <Text className="text-4xl text-burgundy font-indoquran pt-5">
          {item.name}
        </Text>
        <Text className="text-lg font-semibold font-ossemibold text-burgundy">
          {item.transliteration}
        </Text>
        <Text className="text-lg text-burgundy font-osregular text-center">
          {item.translation}
        </Text>
      </Pressable>

      <AsmaModal selectedName={selectedName} closeModal={closeModal} bgColor={backgroundColor} />
    </>
  );
};

export default ReducedCard;
