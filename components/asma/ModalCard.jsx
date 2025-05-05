import React from "react";
import { Modal, Pressable, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AsmaModal = ({ selectedName, closeModal, bgColor }) => {
  if (!selectedName) {
    return null;
  }

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={closeModal}
    >
      <Pressable
        className="flex-1 bg-[#00080888] justify-center items-center"
        onPress={closeModal}
      >
        <View className="w-[70%] h-[45%] bg-[#FFF7F7] rounded-xl p-6 items-center justify-between">
          {/* Display selectedName properties */}
          <View className="flex-row justify-between items-center w-full">
            <Text className={`text-lg ${bgColor} rounded-lg p-3 font-bold text-center font-osregular text-burgundy`}>
              {selectedName.id}
            </Text>
            <Pressable onPress={closeModal}>
              <AntDesign name="close" size={24} color="#6A1A39" />
            </Pressable>
          </View>

          <Text className="text-5xl text-burgundy font-indoquran pt-10">
            {selectedName.name}
          </Text>
          <Text className="text-2xl font-semibold font-ossemibold text-burgundy">
            {selectedName.transliteration}
          </Text>
          <Text className="text-2xl text-burgundy font-ossemibold text-center">
            {selectedName.translation}
          </Text>
          <Text className="text-lg text-burgundy font-osregular text-center">
            {selectedName.description}
          </Text>
        </View>
      </Pressable>
    </Modal>
  );
};

export default AsmaModal;
