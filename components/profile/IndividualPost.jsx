import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather, Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

export default function IndividualPost({ image, closeModal }) {

  return (
    <Modal
      transparent
      animationType="fade"
      visible={!!image}
      onRequestClose={closeModal}
    >
      <Pressable
        className="flex-1 bg-[#00080888] justify-center items-center"
        onPress={closeModal}
      >
        <View className="w-[80%] h-[50%] bg-[#FFF7F7] rounded-xl py-2 px-4 items-center justify-between">
          <View className="flex-row justify-between items-center w-full mb-2">
            <Text className="text-2xl rounded-lg py-3 font-bold text-center font-osregular text-burgundy">
              Post
            </Text>
            <Pressable onPress={closeModal}>
              <AntDesign name="close" size={24} color="#6A1A39" />
            </Pressable>
          </View>

          {/* Image */}
          <Image
            source={image.uri}
            className="w-full h-[55%] rounded-xl mb-4"
            resizeMode="cover"
          />

          <View className="mb-2 w-full justify-center flex-row">
            <Text className="text-xl text-burgundy font-ossemibold">
              {format(parseISO(image.createdAt), "dd-MM-yyyy")}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row mt-5 justify-between h-full w-full">
            <TouchableOpacity
              className="items-center justify-center bg-pinkLavender w-[30%] h-[11%] rounded-xl"
              onPress={() => console.log("Deleted")}
            >
              <Feather name="trash-2" size={24} color="#6A1A39" />
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center justify-center bg-pinkLavender w-[30%] h-[11%] rounded-xl"
              onPress={() => console.log("Downloaded")}
            >
              <Feather name="download" size={24} color="#6A1A39" />
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center justify-center bg-pinkLavender w-[30%] h-[11%] rounded-xl"
              onPress={() => console.log("Shared")}
            >
              <Entypo name="share" size={24} color="#6A1A39" />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
